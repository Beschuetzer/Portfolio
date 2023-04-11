import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { CarouselItem } from './CarouselItem'
import { getClassname } from '../utils';
import { CarouselProps } from './Carousel';
import { CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_SPACING_DEFAULT } from '../constants';
import { CarouselArrowButton } from './CarouselArrowButton';
import { CarouselDots } from './CarouselDots';
import { CURRENT_PAGE_INITIAL } from '../context';

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

    //#endregion
    const hasCalculatedItemSpacingRef = useRef(false);
    const [hasForcedRender, setHasForcedRender] = useState(false); //used to force layout calculation initially
    const [interItemSpacing, setInterItemSpacing] = useState(`${options?.thumbnail?.itemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}px`);
	const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);

    //#region Functions/Handlers
    const getInterItemSpacing = useCallback(() => {
        //if there is itemSpacing is defined, the dynamic behavior is disabled
        if (options?.thumbnail?.itemSpacing) return `${options?.thumbnail?.itemSpacing}px`;
        const containerWidth = carouselContainerRef.current?.getBoundingClientRect()?.width || 0;
        const itemSize = options?.thumbnail?.size || CAROUSEL_ITEM_SIZE_DEFAULT;
        const numberOfItemsThatCanFit = Math.floor(containerWidth / itemSize);
        const numberOfGaps = numberOfItemsThatCanFit - 1;
        const remainingSpace = containerWidth - (numberOfItemsThatCanFit * itemSize);
        const newInterItemSpacing = (remainingSpace / numberOfGaps);
        return `${newInterItemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}px`;
    }, [options?.thumbnail, carouselContainerRef, CAROUSEL_ITEM_SPACING_DEFAULT]);
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
    //#endregion

    //#region JSX
    const interItemSpacingStyle = {
        columnGap: interItemSpacing,
    } as CSSProperties
    const containerStyle = {
        ...interItemSpacingStyle,
    }

    return (
        <>
            <div style={containerStyle} className={getClassname({ elementName: "items" })}>
                {
                    items.map((item, index) => <CarouselItem key={index} index={index} {...item} />)
                }
            </div>
            <div className={getClassname({ elementName: "navigation" })}>
                <CarouselArrowButton svgHrefs={svgHrefs} direction={"left"} onClick={() => console.log('left clicked')} />
                <CarouselDots
                    svgHrefs={svgHrefs}
                    items={items || []}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
                <CarouselArrowButton svgHrefs={svgHrefs} direction={"right"} onClick={() => console.log('right clicked')} />
            </div>
        </>
    )
    //#endregion
}