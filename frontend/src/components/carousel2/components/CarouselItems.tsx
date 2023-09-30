import React, { forwardRef, useRef } from 'react'
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { getClassname } from '../utils/utils';
import { CarouselItem } from './CarouselItem';
import { CarouselDotsProps } from './CarouselDots';

type CarouselItemsProps = {
    interItemSpacing:  number;
    translationAmount: number;
    isLastPage: boolean
    translationAmountChangeRef:  React.MutableRefObject<number>;
} & Pick<CarouselDotsProps, 'items'>

export const CarouselItems = forwardRef<HTMLDivElement, CarouselItemsProps>((props, ref) => {
    const {
        interItemSpacing,
        isLastPage,
        items,
        translationAmount,
        translationAmountChangeRef
    } = props;
    const { stylingLogic } = useBusinessLogic();
    const itemsContainerOuterRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={itemsContainerOuterRef}
            style={{
                ...stylingLogic.carouselItemsOuterContainerStyle,
                ...stylingLogic.fontFamilyNavigationStyle,
            }}
        >
            <div ref={ref}
                style={stylingLogic.getCarouselItemsInnerContainerStyle(interItemSpacing, translationAmount, isLastPage, translationAmountChangeRef)}
                className={getClassname({ elementName: "items" })}
            >
                {
                    items.map((item, index) => <CarouselItem key={index} index={index} {...item} />)
                }
            </div>
        </div>
    )
});