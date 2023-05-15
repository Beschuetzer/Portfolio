import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { CarouselItem } from './CarouselItem'
import { CarouselProps } from './Carousel';
import { CAROUSEL_ITEM_SPACING_DEFAULT, CAROUSEL_SPACING_UNIT, CLASSNAME__CAROUSEL_ITEM, CLASSNAME__GRABBING, CLASSNAME__ITEM_VIEWER_TOOLBAR, CURRENT_ITEM_INDEX_INITIAL, TRANSLATION_AMOUNT_INITIAL } from '../constants';
import { CarouselArrowButton } from './CarouselArrowButton';
import { CarouselDots } from './CarouselDots';
import { useCarouselContext } from '../context';
import { ArrowButtonDirection } from '../types';
import { getNumberOfItemsThatCanFit, getContainerWidth, getClassname, getNumberOfPages, onArrowButtonClick } from '../utils';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { StylingCase, useOnSwipe } from '../hooks/useOnSwipe';

type CarouselContentProps = {
    carouselContainerRef: React.MutableRefObject<HTMLElement | undefined>;
} & Omit<CarouselProps, 'style' | 'onItemChange'>

export const CarouselContent = ({
    carouselContainerRef,
    items,
    options,
}: CarouselContentProps) => {
    //#region Init
    const { currentItemIndex, numberOfPages, setNumberOfPages, currentItem, isFullscreenMode, setIsFullscreenMode, currentPage, setCurrentPage } = useCarouselContext();
    const hasCalculatedNumberOfDotsRef = useRef(false);
    const hasCalculatedItemSpacingRef = useRef(false);
    const resizeWindowDebounceRef = useRef<any>();
    const translationAmountDifferenceRef = useRef(0);
    const [hasForcedRender, setHasForcedRender] = useState(false); //used to force layout calculation initially
    const [interItemSpacing, setInterItemSpacing] = useState(`${options?.thumbnail?.itemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}${CAROUSEL_SPACING_UNIT}`);
    const [translationAmount, setTranslationAmount] = useState(TRANSLATION_AMOUNT_INITIAL);
    const itemsContainerOuterRef = useRef<HTMLDivElement>(null);
    const itemsContainerInnerRef = useRef<HTMLDivElement>(null);
    const previousCurrentItemIndexRef = useRef(CURRENT_ITEM_INDEX_INITIAL);
    const {
        optionsLogic,
        stylingLogic,
    } = useBusinessLogic({});
    useOnSwipe({
        element: itemsContainerInnerRef.current as HTMLElement,
        isDisabled: optionsLogic.isNavigationSwipingDisabled,
        maxClickThreshold: optionsLogic.navigationMaxClickThreshold,
        swipeHandlers: {
            left: {
                callback: () => {
                    if (optionsLogic.isWrappingDisabled && currentPage === 0) {
                        return;
                    };
                    onArrowButtonClick(
                        ArrowButtonDirection.previous,
                        currentPage,
                        numberOfPages,
                        setCurrentPage,
                    )
                },
            },
            right: {
                callback: () => {
                    if (optionsLogic.isWrappingDisabled && currentPage === (numberOfPages - 1)) {
                        return;
                    };
                    onArrowButtonClick(
                        ArrowButtonDirection.next,
                        currentPage,
                        numberOfPages,
                        setCurrentPage,
                    )
                },
            },
            onMoveWhenGrabbing(xDiff, yDiff) {
                setTranslationAmount((current) => {
                    const offset = xDiff;
                    if (optionsLogic.isWrappingDisabled && current <= 0 && offset >= 0) return current;
                    if (optionsLogic.isWrappingDisabled && currentPage === (numberOfPages - 1) && offset <= 0) return current;
                    return current - offset;
                });
            },
        },
        handleStyleChanges: (styleCase: StylingCase, element: HTMLElement) => {
            if (!element || numberOfPages <= 1) return;
            if (styleCase === 'start') {
                document.body.classList.add(CLASSNAME__GRABBING);
                element.classList.add(CLASSNAME__GRABBING)
            } else {
                document.body.classList.remove(CLASSNAME__GRABBING);
                element.classList.remove(CLASSNAME__GRABBING)
            }
        }
    })
    //#endregion

    //#region Functions/Handlers
    const getInterItemSpacing = useCallback(() => {
        //if there is itemSpacing is defined, the dynamic behavior is disabled
        if (options?.thumbnail?.itemSpacing) return `${options?.thumbnail?.itemSpacing}${CAROUSEL_SPACING_UNIT}`;
        const { numberOfWholeItemsThatCanFit, containerWidth, itemSize } = getNumberOfItemsThatCanFit(
            carouselContainerRef.current as HTMLElement, stylingLogic, optionsLogic
        );
        const numberOfGaps = numberOfWholeItemsThatCanFit - 1;
        const remainingSpace = containerWidth - (numberOfWholeItemsThatCanFit * itemSize);
        const newInterItemSpacing = (remainingSpace / numberOfGaps);
        return `${newInterItemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}${CAROUSEL_SPACING_UNIT}`;
    }, [options?.thumbnail, carouselContainerRef, stylingLogic, optionsLogic]);

    const setNumberOfDotsToDisplay = useCallback(() => {
        const newNumberOfPages = getNumberOfPages(
            carouselContainerRef.current as HTMLElement, items.length, stylingLogic, optionsLogic
        );
        setNumberOfPages && setNumberOfPages(newNumberOfPages);
        if (currentPage >= newNumberOfPages) {
            setCurrentPage(newNumberOfPages - 1);
        }
    }, [carouselContainerRef, items.length, stylingLogic, optionsLogic, setNumberOfPages, currentPage, setCurrentPage])
    //#endregion

    //#region Side Fx
    //have to reset hasCalculatedItemSpacingRef if the dependencies for the getInterItemSpacing callback change
    useEffect(() => {
        hasCalculatedItemSpacingRef.current = false;
    }, [options?.thumbnail, carouselContainerRef, hasCalculatedItemSpacingRef])

    useEffect(() => {
        if (!hasForcedRender) return setHasForcedRender(true);
        else if (hasCalculatedItemSpacingRef.current) return;
        hasCalculatedItemSpacingRef.current = true;
        setInterItemSpacing(getInterItemSpacing());
    }, [hasForcedRender, setHasForcedRender, setInterItemSpacing, getInterItemSpacing, hasCalculatedItemSpacingRef])

    useEffect(() => {
        if (hasCalculatedNumberOfDotsRef.current) return;
        setNumberOfDotsToDisplay();
        hasCalculatedNumberOfDotsRef.current = true;
    }, [hasCalculatedNumberOfDotsRef, setNumberOfDotsToDisplay])

    useEffect(() => {
        function handleResize() {
            clearTimeout(resizeWindowDebounceRef.current);
            resizeWindowDebounceRef.current = setTimeout(() => {
                setNumberOfDotsToDisplay();
                setInterItemSpacing(getInterItemSpacing());
            }, 100)
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [setNumberOfDotsToDisplay, setInterItemSpacing, getInterItemSpacing])

    //Tracking the itemViewer item and moving the corresponding carousel to match the page the item is on
    useEffect(() => {
        if (
            (!isFullscreenMode && optionsLogic.isDefaultItemDisplayLocation) ||
            (options?.navigation?.autoChangePage === false) ||
            items?.length <= 0
        ) {
            return;
        }
        if (previousCurrentItemIndexRef.current === currentItemIndex) {
            return
        }

        const { numberOfWholeItemsThatCanFit } = getNumberOfItemsThatCanFit(
            carouselContainerRef.current as HTMLElement, stylingLogic, optionsLogic
        );
        const currentNthItem = currentItemIndex + 1;
        const isNextItemClick = getIsNextItemClick();
        const lastItemInViewIndex = currentPage * numberOfWholeItemsThatCanFit + numberOfWholeItemsThatCanFit;
        const firstItemInViewIndex = currentPage * numberOfWholeItemsThatCanFit + 1;
        // console.log({ currentNthItem, lastItemInViewIndex, isNextItemClick, currentPage, numberOfWholeItemsThatCanFit, previousCurrentItemIndexRef: previousCurrentItemIndexRef.current, itemsLEngth: items.length});
        if (isNextItemClick) {
            if (currentNthItem === 1 && previousCurrentItemIndexRef.current === items.length - 1) {
                setCurrentPage(0);
            }
            else if (currentNthItem > lastItemInViewIndex) {
                setCurrentPage(currentPage + 1);
            }
        } else {
            if (currentNthItem >= items.length) {
                setCurrentPage(numberOfPages - 1);
            }
            else if (currentNthItem < firstItemInViewIndex) {
                setCurrentPage(currentPage - 1);
            }
        }
        previousCurrentItemIndexRef.current = currentItemIndex;

        function getIsNextItemClick() {
            if (previousCurrentItemIndexRef.current === 0 && currentNthItem === items.length) return false;
            else if (previousCurrentItemIndexRef.current === items.length - 1 && currentItemIndex === 0) return true;
            return previousCurrentItemIndexRef.current < currentItemIndex;
        }
    }, [
        carouselContainerRef,
        currentPage,
        items,
        optionsLogic,
        stylingLogic,
        numberOfPages,
        options?.navigation?.autoChangePage,
        currentItemIndex,
        previousCurrentItemIndexRef,
        isFullscreenMode,
        setCurrentPage,
    ])

    //need to track the previous item index whenever an item is opened
    //needed for the above useEffect to work correctly
    useEffect(() => {
        previousCurrentItemIndexRef.current = currentItemIndex;
    }, [items, currentItemIndex])

    //resetting state when exiting full screen via esc key
    useEffect(() => {
        function handleFullscreenChange() {
            //@ts-ignore
            const wasFullscreen = !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement;
            if (wasFullscreen) {
                setIsFullscreenMode(false);
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        // window.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        }
    }, [setIsFullscreenMode])

    //updating translation amount
    useEffect(() => {
        function getDifferenceBetweenContainerAndLastItem() {
            const containerRight = itemsContainerInnerRef.current?.parentElement?.getBoundingClientRect()?.right || 0;
            const items = (itemsContainerInnerRef.current?.querySelectorAll(`.${CLASSNAME__CAROUSEL_ITEM}`) || []) as HTMLElement[];

            let currentItemLeft = 0, previousItemLeft = 0;
            for (let item of items) {
                previousItemLeft = currentItemLeft;
                currentItemLeft = item?.getBoundingClientRect()?.left;

                //in the unlikely case they are exactly equal
                if (currentItemLeft === containerRight) return 0;
                if (currentItemLeft > containerRight && previousItemLeft <= containerRight) {
                    return Math.abs(containerRight - previousItemLeft);
                }
            }
            return 0;
        }

        function getTranslationAmount() {
            const itemSpacingGiven = options?.thumbnail?.itemSpacing;
            const containerWidth = getContainerWidth(carouselContainerRef.current as HTMLElement, stylingLogic);
            const defaultAmount = parseFloat(interItemSpacing.replace(CAROUSEL_SPACING_UNIT, '')) + containerWidth;

            if (itemSpacingGiven !== undefined && itemSpacingGiven >= 0) {
                if (!translationAmountDifferenceRef.current) {
                    translationAmountDifferenceRef.current = defaultAmount - getDifferenceBetweenContainerAndLastItem() - itemSpacingGiven;
                }
            } else {
                translationAmountDifferenceRef.current = defaultAmount;
            }

            return currentPage * translationAmountDifferenceRef.current;
        }

        setTranslationAmount(getTranslationAmount());
    }, [
        currentPage,
        interItemSpacing,
        options?.thumbnail?.itemSpacing,
        carouselContainerRef,
        stylingLogic,
        optionsLogic,
        itemsContainerInnerRef,
        items,
        numberOfPages
    ])
    //#endregion

    //#region JSX
    const ItemToRender = optionsLogic.itemToRender;
    const interItemSpacingStyle = {
        columnGap: interItemSpacing,
    } as CSSProperties
    const translationStyle = {
        transform: `translateX(${translationAmount < 0 ? '' : '-'}${Math.abs(translationAmount)}${CAROUSEL_SPACING_UNIT})`,
    } as CSSProperties
    const containerStyle = {
        ...interItemSpacingStyle,
        ...translationStyle,
    }

    return (
        <>
            {optionsLogic.isItemDisplayLocationAbove ? (
                <ItemToRender {...currentItem} />
            ) : null}
            <div ref={itemsContainerOuterRef} style={stylingLogic.carouselItemsContainerStyle}>
                <div ref={itemsContainerInnerRef} style={containerStyle} className={getClassname({ elementName: "items" })}>
                    {
                        items.map((item, index) => <CarouselItem key={index} index={index} {...item} />)
                    }
                </div>
            </div>
            {numberOfPages > 1 ? (
                <div style={stylingLogic.navigationStyle} className={getClassname({ elementName: "navigation" })}>
                    <CarouselArrowButton
                        options={options}
                        currentPage={currentPage}
                        numberOfDots={numberOfPages}
                        direction={ArrowButtonDirection.previous}
                        onClick={() => onArrowButtonClick(
                            ArrowButtonDirection.previous,
                            currentPage,
                            numberOfPages,
                            setCurrentPage,
                        )} />
                    <CarouselDots
                        items={items || []}
                        numberOfDots={numberOfPages}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        options={options}
                    />
                    <CarouselArrowButton
                        options={options}
                        currentPage={currentPage}
                        numberOfDots={numberOfPages}
                        direction={ArrowButtonDirection.next}
                        onClick={() => onArrowButtonClick(
                            ArrowButtonDirection.next,
                            currentPage,
                            numberOfPages,
                            setCurrentPage,
                        )} />
                </div>
            ) : null}
            {optionsLogic.isItemDisplayLocationBelow ? (
                <ItemToRender {...currentItem} />
            ) : null}
        </>
    )
    //#endregion
}