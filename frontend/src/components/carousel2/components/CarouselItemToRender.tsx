import { useRef } from 'react'
import { CarouselItemViewerContainer } from './item-viewer/toolbar/CarouselItemViewerContainer';
import { useCarouselContext } from '../context';
import { getIsVideo } from '../utils';
import { CarouselVideo } from './CarouselVideo';
import { CarouselImage } from './CarouselImage';

type CarouselItemToRenderProps = {}

export const CarouselItemToRender = (props: CarouselItemToRenderProps) => {
    const { currentItem } = useCarouselContext();
    const itemContainerRef = useRef<HTMLDivElement>();
    const isVideo = getIsVideo(currentItem);
    
    return (
        <CarouselItemViewerContainer ref={itemContainerRef}>
            {isVideo ?
                <CarouselVideo itemContainerRef={itemContainerRef} {...currentItem} />
                :
                <CarouselImage itemContainerRef={itemContainerRef} {...currentItem} />
            }
        </CarouselItemViewerContainer>
    )
}