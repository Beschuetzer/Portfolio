import React, { useCallback } from 'react'
import { CarouselItemProps } from './CarouselItem';
import { getClassname } from '../utils';
import { useCarouselContext } from '../context';

type CarouselDotsProps = {
    currentPage: number;
    items: CarouselItemProps[];
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CarouselDots = ({
    currentPage,
    items,
    setCurrentPage,
}: CarouselDotsProps) => {
    //todo: add customization of dots
    const { setCurrentItems, setCurrentItemIndex, currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.dots || '';

    const onClick = useCallback(() => {
        //todo: set current page here
    }, []);

    return (
        <div className={getClassname({ elementName: 'dots' })}>
            {items.map((_, index) => {
                return (
                    !!svgHref ? (
                        <svg key={index} onClick={onClick} >
                            <use
                                xlinkHref={svgHref}
                                href={svgHref}
                            />
                        </svg>
                    ) : <div key={index} onClick={onClick} />
                )
            })}
        </div>
    )
}