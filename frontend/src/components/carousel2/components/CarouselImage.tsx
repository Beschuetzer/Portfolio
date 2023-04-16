import { useRef, useState } from 'react'
import { CarouselItemProps } from './CarouselItem'
import { getClassname } from '../utils';
import { CarouselItemViewerToolbar } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../constants';

export const CarouselImage = (props: CarouselItemProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>();
    const imageRef = useRef<HTMLImageElement | undefined>();
    const {
        description,
        srcMain,
    } = props;

    return (
        <div ref={containerRef as any} className={getClassname({ elementName: 'item-container' })}>
            <>
                <LoadingSpinner type='ring' show={!isLoaded} description={description} />
                <img
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
            </>
        </div>
    );
}