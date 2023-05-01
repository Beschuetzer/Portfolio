import React, { ReactNode, forwardRef } from 'react'
import { getClassname } from '../../../utils'
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { useCarouselContext } from '../../../context';

type CarouselItemViewerContainerProps = {
    children: ReactNode | ReactNode[];
    onClick?: () => void;
}

export const CarouselItemViewerContainer = forwardRef<any, CarouselItemViewerContainerProps>(({
    children,
    onClick,
}, ref) => {
    const { currentItem, options, isFullscreenMode } = useCarouselContext();
    const stylingLogic = new StylingLogic({ options, currentItem, isFullscreenMode });

    return (
        <div
            ref={ref}
            style={stylingLogic.carouselItemContainerStyle}
            className={getClassname({ elementName: 'item-container' })}
            onClick={onClick} >
            {children}
        </div>
    )
});