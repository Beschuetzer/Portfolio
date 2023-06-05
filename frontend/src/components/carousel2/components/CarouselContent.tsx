import { useCallback, useEffect, useRef, useState } from 'react'
import { CarouselItem } from './CarouselItem'
import { CarouselProps } from './Carousel';
import { CAROUSEL_ITEM_SPACING_DEFAULT, CLASSNAME__GRABBING, CURRENT_ITEM_INDEX_INITIAL, GET_CURRENT_VALUE_DEFAULT, TRANSLATION_AMOUNT_INITIAL } from '../constants';
import { CarouselArrowButton } from './CarouselArrowButton';
import { CarouselDots } from './CarouselDots';
import { CarouselContextInputProps, useCarouselContext } from '../context';
import { ArrowButtonDirection } from '../types';
import { getNumberOfItemsThatCanFit, getClassname, getNumberOfPages, onArrowButtonClick, getCurrentValue } from '../utils';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { StylingCase, useOnSwipe } from '../hooks/useOnSwipe';
import { CarouselItemToRender } from './CarouselItemToRender';

type CarouselContentProps = {} & Omit<CarouselProps, 'style' | 'onItemChange'> & Pick<CarouselContextInputProps, 'carouselContainerRef'>;

const WINDOW_RESIZE_DEBOUNCE_INTERVAL = 100;
export const CarouselContent = ({
    carouselContainerRef,
    items,
    options,
}: CarouselContentProps) => {
    //#region Init
    const { currentItemIndex, numberOfPages, setNumberOfPages, isFullscreenMode, setIsFullscreenMode, currentPage, setCurrentPage } = useCarouselContext();
    const hasCalculatedNumberOfDotsRef = useRef(false);
    const hasCalculatedItemSpacingRef = useRef(false);
    const resizeWindowDebounceRef = useRef<any>();
    const translationAmountDifferenceRef = useRef(0);
    const [hasForcedRender, setHasForcedRender] = useState(false); //used to force layout calculation initially
    const [interItemSpacing, setInterItemSpacing] = useState(getCurrentValue(options?.thumbnail?.itemSpacing, CAROUSEL_ITEM_SPACING_DEFAULT));
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
        if (options?.thumbnail?.itemSpacing !== undefined) {
            const currentItemSpacing = getCurrentValue(options.thumbnail.itemSpacing, GET_CURRENT_VALUE_DEFAULT);
            if (currentItemSpacing >= GET_CURRENT_VALUE_DEFAULT) return currentItemSpacing;
        }
        const { numberOfWholeItemsThatCanFit, containerWidth, itemSize } = getNumberOfItemsThatCanFit(
            items.length, carouselContainerRef.current as HTMLElement, stylingLogic, optionsLogic
        );
        const numberOfGaps = numberOfWholeItemsThatCanFit - 1;
        const remainingSpace = containerWidth - (numberOfWholeItemsThatCanFit * itemSize);
        //numberOfGaps logic needed to prevent crashing at smaller viewport, since divide by <= 0 
        const newInterItemSpacing = (remainingSpace / (numberOfGaps <= 0 ? 1 : numberOfGaps));
        return newInterItemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT;
    }, [options?.thumbnail?.itemSpacing, items.length, carouselContainerRef, stylingLogic, optionsLogic]);

    const doTranslationAmountCommon = useCallback(() => {
        const interItemSpacingToUse = optionsLogic.getItemSpacing(interItemSpacing);
        const isDefaultCase = options?.thumbnail?.itemSpacing === undefined && optionsLogic.itemPositioning === undefined;
        const { numberOfWholeItemsThatCanFit, containerWidth, itemSize } = getNumberOfItemsThatCanFit(
            items.length, carouselContainerRef.current as HTMLElement, stylingLogic, optionsLogic
        );
        const defaultAmount = interItemSpacingToUse + containerWidth;

        if (isDefaultCase) {
            translationAmountDifferenceRef.current = containerWidth + interItemSpacing;
        } else if (interItemSpacingToUse !== undefined && interItemSpacingToUse >= 0) {
            if (interItemSpacingToUse === 0) {
                translationAmountDifferenceRef.current = numberOfWholeItemsThatCanFit * itemSize;
            }
            else if (!translationAmountDifferenceRef.current) {
                translationAmountDifferenceRef.current = numberOfWholeItemsThatCanFit * itemSize + (numberOfWholeItemsThatCanFit) * interItemSpacingToUse
            }
        } else if (numberOfWholeItemsThatCanFit <= 1) {
            translationAmountDifferenceRef.current = containerWidth;
        } else {
            translationAmountDifferenceRef.current = defaultAmount;
        }

        return  { numberOfWholeItemsThatCanFit, containerWidth, itemSize };
    }, [
        carouselContainerRef,
        interItemSpacing,
        items.length,
        options?.thumbnail?.itemSpacing,
        optionsLogic,
        stylingLogic
    ])

    const getTranslationAmountByCurrentPage = useCallback(() => {
        doTranslationAmountCommon();
        return currentPage * translationAmountDifferenceRef.current;
    }, [currentPage, doTranslationAmountCommon]);

    const getTranslationAmountByCurrentItemIndex = useCallback(() => {
        const { numberOfWholeItemsThatCanFit } = doTranslationAmountCommon();
        const newCurrentPage = Math.floor((currentItemIndex) / numberOfWholeItemsThatCanFit)
        setCurrentPage(newCurrentPage);
        return newCurrentPage * translationAmountDifferenceRef.current;
    }, [currentItemIndex, setCurrentPage, doTranslationAmountCommon]);

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
                translationAmountDifferenceRef.current = 0;
                setNumberOfDotsToDisplay();
                setInterItemSpacing(getInterItemSpacing());
            }, WINDOW_RESIZE_DEBOUNCE_INTERVAL)
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [setNumberOfDotsToDisplay, setInterItemSpacing, getInterItemSpacing, getTranslationAmountByCurrentPage, setCurrentPage])

    //Tracking the itemViewer item and moving the corresponding carousel to match the page the item is on
    useEffect(() => {
        if (
            (!isFullscreenMode && optionsLogic.isDefaultItemDisplayLocation) ||
            items?.length <= 0 ||
            (getCurrentValue(options?.navigation?.autoChangePage, undefined) === false)
        ) {
            return;
        }
        if (previousCurrentItemIndexRef.current === currentItemIndex) {
            return
        }

        const { numberOfWholeItemsThatCanFit } = getNumberOfItemsThatCanFit(
            items.length, carouselContainerRef.current as HTMLElement, stylingLogic, optionsLogic
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
        console.log("setting");

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
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        }
    }, [setIsFullscreenMode])

    //updating translation amount
    useEffect(() => {
        setTranslationAmount(getTranslationAmountByCurrentPage());
    }, [getTranslationAmountByCurrentPage])

    useEffect(() => {
        setTranslationAmount(getTranslationAmountByCurrentItemIndex());
    }, [getTranslationAmountByCurrentItemIndex])
    //#endregion

    //#region JSX
    return (
        <>
            {optionsLogic.isItemDisplayLocationAbove ? (
                <CarouselItemToRender />
            ) : null}
            <div ref={itemsContainerOuterRef}
                style={{
                    ...stylingLogic.carouselItemsOuterContainerStyle,
                    ...stylingLogic.fontFamilyNavigationStyle,
                }}
            >
                <div ref={itemsContainerInnerRef}
                    style={stylingLogic.getCarouselItemsInnerContainerStyle(interItemSpacing, translationAmount)}
                    className={getClassname({ elementName: "items" })}
                >
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
                <CarouselItemToRender />
            ) : null}
        </>
    )
    //#endregion
}