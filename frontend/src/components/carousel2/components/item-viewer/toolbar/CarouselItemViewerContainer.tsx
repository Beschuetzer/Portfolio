import React, { ReactNode, forwardRef } from 'react'
import { getClassname } from '../../../utils'
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';

type CarouselItemViewerContainerProps = {
    children: ReactNode | ReactNode[];
    onClick?: () => void;
}

export const CarouselItemViewerContainer = forwardRef<any, CarouselItemViewerContainerProps> (({
    children,
    onClick,
}, ref) => {
    const { currentItemInInstance, options } = useCarouselInstanceContext();
    const stylingLogic = new StylingLogic({options: options || {}, currentItemInInstance});

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