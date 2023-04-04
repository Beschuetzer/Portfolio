import React, { useRef } from 'react'
import { CarouselItemProps } from './CarouselItem'
import { getClassname } from '../utils';
import { CarouselItemViewerToolbar } from './item-viewer/CarouselItemViewerToolbar';

export const CarouselImage = (props: CarouselItemProps) => {
    const containerRef = useRef<HTMLDivElement>();
    const {
        description,
        srcMain,
    } = props;

    return (
        <div ref={containerRef as any} className={getClassname({ elementName: 'item-container' })}>
            <>
                <img
                    src={srcMain}
                    alt={description}
                />
                <CarouselItemViewerToolbar
                    isVideo={false}
                    description={description || ''}
                    videoRef={null}
                    itemContainerRef={containerRef}
                />
            </>
        </div>
    );
}