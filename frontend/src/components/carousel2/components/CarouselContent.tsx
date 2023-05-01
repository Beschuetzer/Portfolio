import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { CarouselItem } from './CarouselItem'
import { CarouselProps } from './Carousel';
import { CAROUSEL_ITEM_SPACING_DEFAULT, CAROUSEL_SPACING_UNIT, CLASSNAME__CAROUSEL_ITEM } from '../constants';
import { CarouselArrowButton } from './CarouselArrowButton';
import { CarouselDots } from './CarouselDots';
import { CURRENT_ITEM_INDEX_INITIAL, CURRENT_PAGE_INITIAL, TRANSLATION_AMOUNT_INITIAL, useCarouselContext } from '../context';
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
    const { currentItemIndex, numberOfPages, setNumberOfPages, currentItem } = useCarouselContext();
    const hasCalculatedNumberOfDotsRef = useRef(false);
    const hasCalculatedItemSpacingRef = useRef(false);
    const [hasForcedRender, setHasForcedRender] = useState(false); //used to force layout calculation initially
    const [interItemSpacing, setInterItemSpacing] = useState(`${options?.thumbnail?.itemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}${CAROUSEL_SPACING_UNIT}`);
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);
    const [translationAmount, setTranslationAmount] = useState(TRANSLATION_AMOUNT_INITIAL);
    const itemsContainerRef = useRef<HTMLDivElement>(null);
    const previousCurrentItemIndex = useRef(CURRENT_ITEM_INDEX_INITIAL);
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
    }, [options?.thumbnail, carouselContainerRef, CAROUSEL_ITEM_SPACING_DEFAULT, CAROUSEL_SPACING_UNIT]);

    const onArrowButtonClick = useCallback((direction: ArrowButtonDirection) => {
        if (direction === 'left') {
            setCurrentPage(currentPage <= 0 ? numberOfPages - 1 : currentPage - 1);
        } else if (direction === 'right') {
            setCurrentPage(currentPage >= numberOfPages - 1 ? 0 : currentPage + 1);
        }
    }, [currentPage, setCurrentPage, numberOfPages]);

    function setNumberOfDotsToDisplay() {
        const newNumberOfPages = getNumberOfPages(
            carouselContainerRef.current as HTMLElement, items.length, stylingLogic, itemDisplayLocationLogic
        );
        setNumberOfPages && setNumberOfPages(newNumberOfPages);
        if (currentPage >= newNumberOfPages) {
            setCurrentPage(newNumberOfPages - 1);
        }
    }
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
    }, [])

    useEffect(() => {
        function handleResize() {
            setNumberOfDotsToDisplay();
            setInterItemSpacing(getInterItemSpacing());
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [window.innerWidth])

    //Tracking the itemViewer item and moving the corresponding carousel to match the page the item is on
    useEffect(() => {
        function getIsNextItemClick() {
            if (previousCurrentItemIndex.current === 0 && currentNthItem == items.length) return false;
            else if (previousCurrentItemIndex.current === items.length - 1 && currentItemIndex === 0) return true;
            return previousCurrentItemIndex.current < currentItemIndex;
        }

        if (
            (options?.navigation?.trackItemViewerChanges !== undefined &&
                !options?.navigation?.trackItemViewerChanges) ||
            currentItemIndex === CURRENT_ITEM_INDEX_INITIAL ||
            items?.length <= 0
        ) return;

        const { numberOfItemsThatCanFit, numberOfWholeItemsThatCanFit } = getNumberOfItemsThatCanFit(
            carouselContainerRef.current as HTMLElement, stylingLogic, itemDisplayLocationLogic
        );
        const currentNthItem = currentItemIndex + 1;
        const isNextItemClick = getIsNextItemClick();
        // console.log({ isNextItemClick, previousCurrentItemIndex: previousCurrentItemIndex.current, currentNthItem, itemsLEngth: items.length, numberOfWholeItemsThatCanFit, currentPage });
        if (isNextItemClick) {
            if (currentNthItem === 1 && previousCurrentItemIndex.current === items.length - 1) {
                setCurrentPage(0);
            }
            else if ((currentNthItem) > ((currentPage * numberOfItemsThatCanFit) + numberOfWholeItemsThatCanFit)) {
                setCurrentPage(currentPage + 1);
            }
        } else {
            if (currentNthItem >= items.length) {
                setCurrentPage(numberOfPages - 1);
            }
            else if ((currentNthItem) < ((currentPage * numberOfItemsThatCanFit) + numberOfWholeItemsThatCanFit)) {
                setCurrentPage(currentPage - 1);
            }
        }
        previousCurrentItemIndex.current = currentItemIndex;
    }, [currentItemIndex, previousCurrentItemIndex])

    //need to track the previous item index whenever an item is opened
    //need this for the above useEffect to work correctly
    useEffect(() => {
        previousCurrentItemIndex.current = currentItemIndex;
    }, [items])

    // //setting the currentItemIndex in carousel instance on load if condition met
    // useEffect(() => {
    //     if (!itemDisplayLocationLogic.isDefaultItemDisplayLocation) {
    //         setCurrentItemInInstanceIndex && setCurrentItemInInstanceIndex(0);
    //     }
    // }, [])

    //updating translation amount
    useEffect(() => {
        function getItemsInContainer() {
            return itemsContainerRef.current?.querySelectorAll(`.${CLASSNAME__CAROUSEL_ITEM}`);
        }

        function getTranslationAmount() {
            const itemSpacingGiven = options?.thumbnail?.itemSpacing;
            const containerWidth = getContainerWidth(carouselContainerRef.current as HTMLElement, stylingLogic);
            
            if (itemSpacingGiven !== undefined && itemSpacingGiven >= 0) {
                const { numberOfItemsThatCanFit } = getNumberOfItemsThatCanFit(
                    carouselContainerRef.current as HTMLElement, stylingLogic, itemDisplayLocationLogic
                );
    
                //if a bug occurs with translation amount in itemSpacingGiven case, check the > equality here as it may need to be >=
                const isLastItemMoreThanHalfVisible = numberOfItemsThatCanFit % 1 > .5;
                const itemsInContainer = getItemsInContainer();
                const firstItemLeft = itemsInContainer?.[0]?.getBoundingClientRect().left;
                const firstItemInNextPageIndex = Math.floor(items.length / numberOfPages) + (isLastItemMoreThanHalfVisible ? 1 : 0);
                const firstItemInNextPage = itemsInContainer?.[firstItemInNextPageIndex]?.getBoundingClientRect().left;
                return currentPage * (Math.abs((firstItemLeft || 0) - (firstItemInNextPage || 0)));
            }
            return currentPage * (parseFloat(interItemSpacing.replace(CAROUSEL_SPACING_UNIT, '')) + containerWidth);
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