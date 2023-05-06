import { ReactNode, forwardRef } from 'react'
import { getClassname } from '../../../utils'
import { useCarouselContext } from '../../../context';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerContainerProps = {
    children: ReactNode | ReactNode[];
    onClick?: () => void;
}

export const CarouselItemViewerContainer = forwardRef<any, CarouselItemViewerContainerProps>(({
    children,
    onClick,
}, ref) => {
    const {stylingLogic} = useBusinessLogic({});

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