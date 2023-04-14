import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { CarouselItem } from './CarouselItem'
import { getClassname } from '../utils';
import { CarouselProps } from './Carousel';
import { CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_SPACING_DEFAULT, CAROUSEL_ITEM_SPACING_UNIT, CLASSNAME__CAROUSEL_ITEM } from '../constants';
import { CarouselArrowButton } from './CarouselArrowButton';
import { CarouselDots } from './CarouselDots';
import { CURRENT_PAGE_INITIAL } from '../context';
import { ArrowButtonDirection } from '../types';

type CarouselContentProps = {
    carouselContainerRef: React.MutableRefObject<HTMLElement | undefined>;
} & Omit<CarouselProps, 'style' | 'onItemChange'>

export const CarouselContent = ({
    carouselContainerRef,
    items,
    options,
}: CarouselContentProps) => {
    //#region Init
    const hasCalculatedNumberOfDotsRef = useRef(false);
    const hasCalculatedItemSpacingRef = useRef(false);
    const [hasForcedRender, setHasForcedRender] = useState(false); //used to force layout calculation initially
    const [interItemSpacing, setInterItemSpacing] = useState(`${options?.thumbnail?.itemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}${CAROUSEL_ITEM_SPACING_UNIT}`);
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const itemsContainerRef = useRef<HTMLDivElement>(null);
    //#endregion

    //#region Functions/Handlers
    const getInterItemSpacing = useCallback(() => {
        //if there is itemSpacing is defined, the dynamic behavior is disabled
        if (options?.thumbnail?.itemSpacing) return `${options?.thumbnail?.itemSpacing}${CAROUSEL_ITEM_SPACING_UNIT}`;
        const {numberOfWholeItemsThatCanFit: numberOfItemsThatCanFit, containerWidth, itemSize } = getNumberOfItemsThatCanFit();
        const numberOfGaps = numberOfItemsThatCanFit - 1;
        const remainingSpace = containerWidth - (numberOfItemsThatCanFit * itemSize);
        const newInterItemSpacing = (remainingSpace / numberOfGaps);
        return `${newInterItemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}${CAROUSEL_ITEM_SPACING_UNIT}`;
    }, [options?.thumbnail, carouselContainerRef, CAROUSEL_ITEM_SPACING_DEFAULT]);

    function getItemsInContainer() {
        return itemsContainerRef.current?.querySelectorAll(`.${CLASSNAME__CAROUSEL_ITEM}`);
    }

    function getNumberOfItemsThatCanFit() {
        const containerWidth = carouselContainerRef.current?.getBoundingClientRect()?.width || 0;
        const itemSize = options?.thumbnail?.size || CAROUSEL_ITEM_SIZE_DEFAULT;
        return {
            containerWidth,
            itemSize,
            numberOfWholeItemsThatCanFit: Math.floor(containerWidth / itemSize),
            numberOfItemsThatCanFit: containerWidth / itemSize,
        }
    }

    function getTranslationAmount() {
        const itemSpacingGiven = options?.thumbnail?.itemSpacing;
        const containerWidth = carouselContainerRef.current?.getBoundingClientRect()?.width || 0;
        if (itemSpacingGiven !== undefined && itemSpacingGiven >= 0) {
            const { numberOfItemsThatCanFit } = getNumberOfItemsThatCanFit();

            //if a bug occurs with translation amount in itemSpacingGiven case, check the > equality here as it may need to be >=
            const isLastItemMoreThanHalfVisible = numberOfItemsThatCanFit % 1 > .5;
            const itemsInContainer = getItemsInContainer();
            const firstItemLeft = itemsInContainer?.[0]?.getBoundingClientRect().left;
            const firstItemInNextPageIndex = Math.floor(items.length / numberOfPages) + (isLastItemMoreThanHalfVisible ? 1 : 0);
            const firstItemInNextPage = itemsInContainer?.[firstItemInNextPageIndex]?.getBoundingClientRect().left;
            return currentPage * (Math.abs((firstItemLeft || 0) - (firstItemInNextPage || 0)));
        }
        return currentPage * (parseFloat(interItemSpacing.replace(CAROUSEL_ITEM_SPACING_UNIT, '')) + containerWidth);
    }

    const onArrowButtonClick = useCallback((direction: ArrowButtonDirection) => {
        if (direction === 'left') {
            setCurrentPage(currentPage <= 0 ? numberOfPages - 1 : currentPage - 1);
        } else if (direction === 'right') {
            setCurrentPage(currentPage >= numberOfPages - 1 ? 0 : currentPage + 1);
        }
    }, [currentPage, setCurrentPage, numberOfPages]);

    function setNumberOfDotsToDisplay() {
        if (!carouselContainerRef.current || !itemsContainerRef.current) return;
        const { numberOfWholeItemsThatCanFit: numberOfItemsThatCanFit } = getNumberOfItemsThatCanFit();
        const newNumberOfPages = Math.ceil(items.length / numberOfItemsThatCanFit);
        setNumberOfPages(newNumberOfPages);
        
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
    //#endregion

    //#region JSX
    const interItemSpacingStyle = {
        columnGap: interItemSpacing,
    } as CSSProperties
    const translationStyle = {
        transform: `translateX(-${getTranslationAmount()}${CAROUSEL_ITEM_SPACING_UNIT})`,
    } as CSSProperties
    const containerStyle = {
        ...interItemSpacingStyle,
        ...translationStyle,
    }

    return (
        <>
            <div ref={itemsContainerRef} style={containerStyle} className={getClassname({ elementName: "items" })}>
                {
                    items.map((item, index) => <CarouselItem key={index} index={index} {...item} />)
                }
            </div>
            {numberOfPages > 1 ? (
                <div className={getClassname({ elementName: "navigation" })}>
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
            ): null}
        </>
    )
    //#endregion
}