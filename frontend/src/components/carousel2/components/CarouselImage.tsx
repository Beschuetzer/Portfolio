import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { CarouselItemProps } from './CarouselItem'
import { CarouselItemViewerToolbar, CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../constants';
import { useCarouselContext } from '../context';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { useRerenderOnExitFullscreenMode } from '../hooks/useRerenderOnExitFullscreenMode';

const RE_RENDER_DURATION = 1;
export const CarouselImage = (props: CarouselItemProps & Pick<CarouselItemViewerToolbarProps, 'itemContainerRef'>) => {
    const { options, setIsFullscreenMode, currentItemIndex, itemContainerHeight } = useCarouselContext();
    const [isLoaded, setIsLoaded] = useState(false);
    const [, setShouldRerender] = useState(false);
    const imageRef = useRef<HTMLImageElement>();
    const itemViewerToolbarRef = useRef<HTMLElement>();
    const rerenderTimoutRef = useRef<any>();
    const {
        description,
        itemContainerRef,
        srcMain,
        modal
    } = props;
    const { stylingLogic } = useBusinessLogic({ itemViewerToolbarRef });
    useRerenderOnExitFullscreenMode();

    const onImageClick = useCallback((e: MouseEvent) => {
        if (e.detail === 2) {
            setIsFullscreenMode((current) => !current);
        }
    }, [setIsFullscreenMode]);

    useLayoutEffect(() => {
        //only re-render if there is a modal to display
        if (!modal) return;
        clearTimeout(rerenderTimoutRef.current);
        rerenderTimoutRef.current = setTimeout(() => {
            setShouldRerender((current) => !current);
        }, RE_RENDER_DURATION)

        return () => {
            clearTimeout(rerenderTimoutRef.current);
        }
    }, [currentItemIndex, modal])

    return (
        <>
            <div style={stylingLogic.carouselImageContainerStlye}>
                <LoadingSpinner type='ring' show={!isLoaded} description={description} {...options?.styling?.itemViewer?.loadingSpinner} />
                <img
                    ref={imageRef as any}
                    onClick={onImageClick as any}
                    draggable={false}
                    style={stylingLogic.getCarouselImageStlye(itemContainerHeight)}
                    className={isLoaded ? '' : CLASSNAME__HIDDEN}
                    src={srcMain as string}
                    alt={description}
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
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
        </>
    );
}