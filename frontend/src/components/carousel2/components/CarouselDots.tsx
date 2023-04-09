import React, { useCallback } from 'react'
import { CarouselItemProps } from './CarouselItem';
import { getClassname } from '../utils';
import { CarouselSvgHrefs } from '../types';

type CarouselDotsProps = {
    currentPage: number;
    items: CarouselItemProps[];
    svgHrefs: CarouselSvgHrefs;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CarouselDots = ({
    currentPage,
    items,
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
    console.log({ svgHrefs });

    const useStyles = !!fillColor ? {
        fill: fillColor,
    } as React.CSSProperties : {}
    const divStyles = !!fillColor ? {
        backgroundColor: fillColor,
        opacity: .66,
    } as React.CSSProperties : {}
    return (
        <div className={getClassname({ elementName: 'dots' })}>
            {items.map((_, index) => {
                return (
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
                )
            })}
        </div>
    )
    //#endregion
}