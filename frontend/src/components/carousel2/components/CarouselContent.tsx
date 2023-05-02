import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { CarouselItem } from './CarouselItem'
import { CarouselProps } from './Carousel';
import { CAROUSEL_ITEM_SPACING_DEFAULT, CAROUSEL_SPACING_UNIT, CLASSNAME__CAROUSEL_ITEM, CURRENT_ITEM_INDEX_INITIAL, CURRENT_PAGE_INITIAL, TRANSLATION_AMOUNT_INITIAL } from '../constants';
import { CarouselArrowButton } from './CarouselArrowButton';
import { CarouselDots } from './CarouselDots';
import { useCarouselContext } from '../context';
import { ArrowButtonDirection } from '../types';
import { ItemDisplayLocationLogic } from '../business-logic/ItemDisplayLocationLogic';
import { StylingLogic } from '../business-logic/StylingLogic';
import { getNumberOfItemsThatCanFit, getContainerWidth, getClassname, getNumberOfPages } from '../utils';

type CarouselContentProps = {
    carouselContainerRef: React.MutableRefObject<HTMLElement | undefined>;
} & Omit<CarouselProps, 'style' | 'onItemChange'>

export const CarouselContent = ({
    carouselContainerRef,
    items,
    options,
}: CarouselContentProps) => {
    //#region Init
    const { currentItemIndex, numberOfPages, setNumberOfPages, currentItem, setCurrentItemIndex, isFullscreenMode } = useCarouselContext();
    const hasCalculatedNumberOfDotsRef = useRef(false);
    const hasCalculatedItemSpacingRef = useRef(false);
    const resizeWindowDebounceRef = useRef<any>();
    const translationAmountDifferenceRef = useRef(0);
    const [hasForcedRender, setHasForcedRender] = useState(false); //used to force layout calculation initially
    const [interItemSpacing, setInterItemSpacing] = useState(`${options?.thumbnail?.itemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}${CAROUSEL_SPACING_UNIT}`);
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);
    const [translationAmount, setTranslationAmount] = useState(TRANSLATION_AMOUNT_INITIAL);
    const itemsContainerRef = useRef<HTMLDivElement>(null);
    const previousCurrentItemIndexRef = useRef(CURRENT_ITEM_INDEX_INITIAL);
    const itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options: options || {}, currentItem });
    const stylingLogic = new StylingLogic({ options });
    //#endregion

    //#region Functions/Handlers
    const getInterItemSpacing = useCallback(() => {
        //if there is itemSpacing is defined, the dynamic behavior is disabled
        if (options?.thumbnail?.itemSpacing) return `${options?.thumbnail?.itemSpacing}${CAROUSEL_SPACING_UNIT}`;
        const { numberOfWholeItemsThatCanFit, containerWidth, itemSize } = getNumberOfItemsThatCanFit(
            carouselContainerRef.current as HTMLElement, stylingLogic, itemDisplayLocationLogic
        );
        const numberOfGaps = numberOfWholeItemsThatCanFit - 1;
        const remainingSpace = containerWidth - (numberOfWholeItemsThatCanFit * itemSize);
        const newInterItemSpacing = (remainingSpace / numberOfGaps);
        return `${newInterItemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}${CAROUSEL_SPACING_UNIT}`;
    }, [options?.thumbnail, carouselContainerRef, CAROUSEL_ITEM_SPACING_DEFAULT, CAROUSEL_SPACING_UNIT, getNumberOfItemsThatCanFit, stylingLogic, itemDisplayLocationLogic]);

    const onArrowButtonClick = useCallback((direction: ArrowButtonDirection) => {
        if (direction === 'left') {
            setCurrentPage(currentPage <= 0 ? numberOfPages - 1 : currentPage - 1);
        } else if (direction === 'right') {
            setCurrentPage(currentPage >= numberOfPages - 1 ? 0 : currentPage + 1);
        }
    }, [currentPage, setCurrentPage, numberOfPages]);

    const setNumberOfDotsToDisplay = useCallback(() => {
        const newNumberOfPages = getNumberOfPages(
            carouselContainerRef.current as HTMLElement, items.length, stylingLogic, itemDisplayLocationLogic
        );
        setNumberOfPages && setNumberOfPages(newNumberOfPages);
        if (currentPage >= newNumberOfPages) {
            setCurrentPage(newNumberOfPages - 1);
        }
    }, [getNumberOfPages, setNumberOfPages, setCurrentPage, currentPage, carouselContainerRef, items, stylingLogic, itemDisplayLocationLogic])
    //#endregion

    //#region Side Fx
    //have to reset hasCalculatedItemSpacingRef if the dependencies for the getInterItemSpacing callback change
    useEffect(() => {
        hasCalculatedItemSpacingRef.current = false;
    }, [options?.thumbnail, carouselContainerRef, CAROUSEL_ITEM_SPACING_DEFAULT, hasCalculatedItemSpacingRef])

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
    }, [window.innerWidth, setNumberOfDotsToDisplay, setInterItemSpacing, getInterItemSpacing])

    //Tracking the itemViewer item and moving the corresponding carousel to match the page the item is on
    useEffect(() => {
        if (
            !isFullscreenMode || 
            (options?.navigation?.trackItemViewerChanges === false) || 
            items?.length <= 0
        )  {
            return;
        }
        if (previousCurrentItemIndexRef.current === CURRENT_ITEM_INDEX_INITIAL) {
            previousCurrentItemIndexRef.current = currentItemIndex;
            return;
        }

        const { numberOfWholeItemsThatCanFit } = getNumberOfItemsThatCanFit(
            carouselContainerRef.current as HTMLElement, stylingLogic, itemDisplayLocationLogic
        );
        const currentNthItem = currentItemIndex + 1;
        const isNextItemClick = getIsNextItemClick();
        const lastItemInViewIndex = currentPage * numberOfWholeItemsThatCanFit + numberOfWholeItemsThatCanFit;
        const firstItemInViewIndex = currentPage * numberOfWholeItemsThatCanFit + 1;
        // console.log({ currentNthItem, lastItemInViewIndex, isNextItemClick, currentPage, numberOfWholeItemsThatCanFit, previousCurrentItemIndex: previousCurrentItemIndex.current, itemsLEngth: items.length});
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
            if (previousCurrentItemIndexRef.current === 0 && currentNthItem == items.length) return false;
            else if (previousCurrentItemIndexRef.current === items.length - 1 && currentItemIndex === 0) return true;
            return previousCurrentItemIndexRef.current < currentItemIndex;
        }
    }, [
        items,
        options?.navigation?.trackItemViewerChanges,
        currentItemIndex,
        previousCurrentItemIndexRef,
        isFullscreenMode,
        setCurrentPage,
        previousCurrentItemIndexRef,
        CURRENT_ITEM_INDEX_INITIAL
    ])

    //need to track the previous item index whenever an item is opened
    //need this for the above useEffect to work correctly
    useEffect(() => {
        previousCurrentItemIndexRef.current = currentItemIndex;
    }, [items])

    // //setting the currentItemIndex in carousel instance on load if condition met
    useEffect(() => {
        if (!itemDisplayLocationLogic.isDefaultItemDisplayLocation) {
            setCurrentItemIndex(0);
        }
    }, [])

    //updating translation amount
    useEffect(() => {
        function getDifferenceBetweenContainerAndLastItem() {
            const containerRight = itemsContainerRef.current?.parentElement?.getBoundingClientRect()?.right || 0;
            const items = (itemsContainerRef.current?.querySelectorAll(`.${CLASSNAME__CAROUSEL_ITEM}`) || []) as HTMLElement[];

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
        CAROUSEL_SPACING_UNIT,
        options?.thumbnail?.itemSpacing,
        carouselContainerRef,
        stylingLogic,
        itemDisplayLocationLogic,
        itemsContainerRef,
        items,
        numberOfPages
    ])
    //#endregion

    //#region JSX
    const ItemToRender = itemDisplayLocationLogic.itemToRender;
    const interItemSpacingStyle = {
        columnGap: interItemSpacing,
    } as CSSProperties
    const translationStyle = {
        transform: `translateX(-${translationAmount}${CAROUSEL_SPACING_UNIT})`,
    } as CSSProperties
    const containerStyle = {
        ...interItemSpacingStyle,
        ...translationStyle,
    }

    return (
        <>
            {itemDisplayLocationLogic.isItemDisplayLocationAbove ? (
                <ItemToRender {...currentItem} />
            ) : null}
            <div style={stylingLogic.carouselItemsContainerStyle}>
                <div ref={itemsContainerRef} style={containerStyle} className={getClassname({ elementName: "items" })}>
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
                        direction={"left"}
                        onClick={() => onArrowButtonClick("left")} />
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
                        direction={"right"}
                        onClick={() => onArrowButtonClick("right")} />
                </div>
            ) : null}
            {itemDisplayLocationLogic.isItemDisplayLocationBelow ? (
                <ItemToRender {...currentItem} />
            ) : null}
        </>
    )
    //#endregion
}