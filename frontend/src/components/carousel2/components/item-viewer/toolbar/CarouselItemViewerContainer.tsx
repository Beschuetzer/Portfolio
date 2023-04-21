import React, { ReactNode, forwardRef } from 'react'
import { getClassname } from '../../../utils'

type CarouselItemViewerContainerProps = {
    children: ReactNode | ReactNode[];
    onClick?: () => void;
}

export const CarouselItemViewerContainer = forwardRef<any, CarouselItemViewerContainerProps> (({
    children,
    onClick,
}, ref) => {
    return (
        <div
            ref={ref}
            className={getClassname({ elementName: 'item-container' })}
            onClick={onClick} >
                {children}
        </div>
    )
});