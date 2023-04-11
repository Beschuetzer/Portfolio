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
    const onClick = useCallback((nthItem: number) => {
        //todo: set current page here
        console.log("clicked " + nthItem);
    }, []);
    //#endregion


    //#region Side Fx
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
            dots.push((
                !!svgHref ? (
                    <svg key={index} >
                        <use
                            style={useStyles}
                            xlinkHref={svgHref}
                            href={svgHref}
                        />
                    </svg>
                ) : (
                    <div key={index} onClick={() => onClick(index)}>
                        <div style={divStyles} />
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