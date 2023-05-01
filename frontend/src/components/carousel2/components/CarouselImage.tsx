import { useRef, useState } from 'react'
import { CarouselItemProps } from './CarouselItem'
import { CarouselItemViewerToolbar } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../constants';
import { CarouselItemViewerContainer } from './item-viewer/toolbar/CarouselItemViewerContainer';
import { StylingLogic } from '../business-logic/StylingLogic';
import { useCarouselContext } from '../context';

export const CarouselImage = (props: CarouselItemProps) => {
    const { options, itemViewerToolbarRef } = useCarouselContext();
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>();
    const imageRef = useRef<HTMLImageElement | undefined>();
    const {
        description,
        srcMain,
    } = props;
    const stylingLogic = new StylingLogic({options, itemViewerToolbarRef});

    return (
        <CarouselItemViewerContainer ref={containerRef}>
            <LoadingSpinner type='ring' show={!isLoaded} description={description} {...options?.styling?.itemViewer?.loadingSpinner} />
            <img
            style={stylingLogic.carouselImageStlye}
                className={isLoaded ? '' : CLASSNAME__HIDDEN}
                ref={imageRef as any}
                src={srcMain}
                alt={description}
                onLoad={() => setIsLoaded(true)}
            />
            <CarouselItemViewerToolbar
                isVideo={false}
                description={description || ''}
                itemContainerRef={containerRef}
                onClose={() => {
                    setTimeout(() => {
                        setIsLoaded(false)
                    }, 100)
                }}
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