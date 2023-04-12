import React, { useCallback } from 'react'
import { CarouselItemProps } from './CarouselItem';
import { getClassname } from '../utils';
import { CarouselSvgHrefs, CarouselNavigationProps } from '../types';
import { CAROUSEL_DOT_COLOR_DEFAULT, CAROUSEL_DOT_OPACITY_DEFAULT, NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS } from '../constants';

type CarouselDotsProps = {
    items: CarouselItemProps[];
    svgHrefs: CarouselSvgHrefs;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
} & CarouselNavigationProps

const DOTS_CLASSNAME = getClassname({ elementName: 'dots' });
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
        opacity: CAROUSEL_DOT_OPACITY_DEFAULT,
    } as React.CSSProperties : {}

    function renderDots() {
        const dots = [];
        for (let index = 0; index < numberOfDots; index++) {
            const isCurrentPage = index === currentPage;
            const isSvg = !!svgHref;
            
            const currentDotStyle = isCurrentPage && isSvg  ? {
                opacity: 1,
            } : isCurrentPage ? {
                backgroundColor: fillColor || CAROUSEL_DOT_COLOR_DEFAULT,
                opacity: 1,
            } : {};

            const currentPageClassname = isCurrentPage ? `${DOTS_CLASSNAME}-current` : '';

            dots.push((
                isSvg ? (
                    <svg key={index} onClick={() => onDotClick(index)} className={currentPageClassname}>
                        <use
                            style={{...useStyles, ...currentDotStyle}}
                            xlinkHref={svgHref}
                            href={svgHref}
                        />
                    </svg>
                ) : (
                    <div key={index} onClick={() => onDotClick(index)} className={currentPageClassname}>
                        <div style={{...divStyles, ...currentDotStyle}} />
                    </div>
                )
            ));
        }
        return dots;
    }

    if (numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return null;
    return (
        <div className={DOTS_CLASSNAME}>
            {renderDots()}
        </div>
    )
    //#endregion
}