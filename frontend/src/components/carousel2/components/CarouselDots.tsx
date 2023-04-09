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
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.dots || '';

    const onClick = useCallback(() => {
        //todo: set current page here
        console.log("clicked");
        
    }, []);

    console.log({svgHref});
    
    return (
        <div className={getClassname({ elementName: 'dots' })}>
            {items.map((_, index) => {
                return  (
                    <div key={index} onClick={onClick}>
                        { !!svgHref ? (
                        <svg key={index} onClick={onClick} >
                            <use
                                xlinkHref={svgHref}
                                href={svgHref}
                            />
                        </svg>
                    ) : <div/>}
                    </div>
                )
                
            })}
        </div>
    )
}