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
    svgHrefs = {},
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
        const containerWidth = carouselContainerRef.current?.getBoundingClientRect()?.width || 0;
        const itemSize = options?.thumbnail?.size || CAROUSEL_ITEM_SIZE_DEFAULT;
        const numberOfItemsThatCanFit = Math.floor(containerWidth / itemSize);
        const numberOfGaps = numberOfItemsThatCanFit - 1;
        const remainingSpace = containerWidth - (numberOfItemsThatCanFit * itemSize);
        const newInterItemSpacing = (remainingSpace / numberOfGaps);
        return `${newInterItemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}${CAROUSEL_ITEM_SPACING_UNIT}`;
    }, [options?.thumbnail, carouselContainerRef, CAROUSEL_ITEM_SPACING_DEFAULT]);

    function getTranslationAmount() {
        const itemSpacingGiven = options?.thumbnail?.itemSpacing;
        const containerWidth = carouselContainerRef.current?.getBoundingClientRect()?.width || 0;
        if (itemSpacingGiven !== undefined && itemSpacingGiven >= 0) {
            return currentPage * containerWidth;
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
        //todo: use the items ref to get the left of the first item and the 
        if (!carouselContainerRef.current || !itemsContainerRef.current) return;
        const containerWidth = carouselContainerRef.current?.getBoundingClientRect()?.width || 0;
        const itemsInContainer = itemsContainerRef.current?.querySelectorAll(`.${CLASSNAME__CAROUSEL_ITEM}`);
        const firstItemLeft = itemsInContainer?.[0].getBoundingClientRect().left;
        const lastItemRight = itemsInContainer?.[itemsInContainer.length - 1].getBoundingClientRect().right;
        const itemsContainerWidth = Math.abs((lastItemRight || 0) - (firstItemLeft || 0));
        setNumberOfPages(Math.ceil(itemsContainerWidth / containerWidth));
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
            <div className={getClassname({ elementName: "navigation" })}>
                <CarouselArrowButton
                    options={options}
                    currentPage={currentPage}
                    numberOfDots={numberOfPages}
                    svgHrefs={svgHrefs}
                    direction={"left"}
                    onClick={() => onArrowButtonClick("left")} />
                <CarouselDots
                    svgHrefs={svgHrefs}
                    items={items || []}
                    numberOfDots={numberOfPages}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
                <CarouselArrowButton
                    options={options}
                    currentPage={currentPage}
                    numberOfDots={numberOfPages}
                    svgHrefs={svgHrefs}
                    direction={"right"}
                    onClick={() => onArrowButtonClick("right")} />
            </div>
        </>
    )
    //#endregion
}