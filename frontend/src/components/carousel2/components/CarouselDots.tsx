import React, { useCallback } from 'react'
import { CarouselItemProps } from './CarouselItem';
import { getClassname } from '../utils';
import { CarouselSvgHrefs, NumberOfDots } from '../types';
import { NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS } from '../constants';

type CarouselDotsProps = {
    currentPage: number;
    items: CarouselItemProps[];
    svgHrefs: CarouselSvgHrefs;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
} & NumberOfDots

export const CarouselDots = ({
    currentPage,
    items,
    numberOfDots = items?.length || NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS - 1,
    svgHrefs = {},
    setCurrentPage,
}: CarouselDotsProps) => {
    //#region Init
    const { fillColor, svgHref } = svgHrefs.dots || {};
    //#endregion

    //#region Handlers/Functions
    const onDotClick = useCallback((index: number) => {
        if (index === currentPage) return;
        setCurrentPage(index);
    }, [setCurrentPage, currentPage]);
    //#endregion

    //#region JSX
    const useStyles = !!fillColor ? {
        fill: fillColor,
    } as React.CSSProperties : {}
    const divStyles = !!fillColor ? {
        backgroundColor: fillColor,
        opacity: .66,
    } as React.CSSProperties : {}

    function renderDots() {
        const dots = [];
        for (let index = 0; index < numberOfDots; index++) {
            const isCurrentPage = index === currentPage;
            const isSvg = !!svgHref;
            console.log({isCurrentPage});
            
            const currentDotStyle = isCurrentPage && isSvg  ? {
                opacity: 1,
            } : isCurrentPage ? {
                backgroundColor: fillColor || 'black',
                opacity: 1,
            } : {};

            dots.push((
                isSvg ? (
                    <svg key={index} onClick={() => onDotClick(index)}>
                        <use
                            style={{...useStyles, ...currentDotStyle}}
                            xlinkHref={svgHref}
                            href={svgHref}
                        />
                    </svg>
                ) : (
                    <div key={index} onClick={() => onDotClick(index)}>
                        <div style={{...divStyles, ...currentDotStyle}} />
                    </div>
                )
            ));
        }
        return dots;
    }

    if (numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return null;
    return (
        <div className={getClassname({ elementName: 'dots' })}>
            {renderDots()}
        </div>
    )
    //#endregion
}