import { useCallback, useRef, useState } from 'react'
import { CarouselItemProps } from './CarouselItem'
import { CarouselItemViewerToolbar, CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../constants';
import { useCarouselContext } from '../context';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { useRerenderOnExitFullscreenMode } from '../hooks/useRerenderOnExitFullscreenMode';

export const CarouselImage = (props: CarouselItemProps & Pick<CarouselItemViewerToolbarProps, 'itemContainerRef'> ) => {
    const { options, setIsFullscreenMode } = useCarouselContext();
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement>();
    const itemViewerToolbarRef = useRef<HTMLElement>();
    const {
        description,
        itemContainerRef,
        srcMain,
    } = props;
    const { stylingLogic } = useBusinessLogic({ itemViewerToolbarRef });
    useRerenderOnExitFullscreenMode();

    const onImageClick = useCallback((e: MouseEvent) => {
        if (e.detail === 2) {
            setIsFullscreenMode((current) => !current);
        }
    }, [setIsFullscreenMode]);

    return (
        <div style={stylingLogic.carouselImageContainerStlye}>
            <LoadingSpinner type='ring' show={!isLoaded} description={description} {...options?.styling?.itemViewer?.loadingSpinner} />
            <img
                ref={imageRef as any}
                onClick={onImageClick as any}
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
                imageRef={imageRef}
            />
        </div>
    );
}