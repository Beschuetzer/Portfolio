import { useRef, useState } from 'react'
import { CarouselItemProps } from './CarouselItem'
import { CarouselItemViewerToolbar } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../constants';
import { CarouselItemViewerContainer } from './item-viewer/toolbar/CarouselItemViewerContainer';
import { useCarouselContext } from '../context';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { useRerenderOnExitFullscreenMode } from '../hooks/useRerenderOnExitFullscreenMode';

export const CarouselImage = (props: CarouselItemProps) => {
    const { options } = useCarouselContext();
    const [isLoaded, setIsLoaded] = useState(false);
    const itemViewerToolbarRef = useRef<HTMLElement>();
    const itemContainerRef = useRef<HTMLDivElement>();
    const {
        description,
        srcMain,
    } = props;
    const { stylingLogic } = useBusinessLogic({ itemViewerToolbarRef });
    useRerenderOnExitFullscreenMode();

    return (
        <CarouselItemViewerContainer ref={itemContainerRef}>
            <LoadingSpinner type='ring' show={!isLoaded} description={description} {...options?.styling?.itemViewer?.loadingSpinner} />
            <img
                draggable={false}
                style={stylingLogic.carouselImageStlye}
                className={isLoaded ? '' : CLASSNAME__HIDDEN}
                src={srcMain}
                alt={description}
                onLoad={() => setIsLoaded(true)}
            />
            <CarouselItemViewerToolbar
                ref={itemViewerToolbarRef as any}
                isVideo={false}
                description={description || ''}
                itemContainerRef={itemContainerRef}
                onNextItemClick={() => {
                    setIsLoaded(false)
                }}
                onPreviousItemClick={() => {
                    setIsLoaded(false)
                }}
            />
        </CarouselItemViewerContainer>
    );
}