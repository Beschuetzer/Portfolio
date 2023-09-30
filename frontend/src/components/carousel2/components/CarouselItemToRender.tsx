import { useCallback, useMemo, useRef, useState } from 'react'
import { CarouselItemViewerContainer } from './item-viewer/toolbar/CarouselItemViewerContainer';
import { useCarouselContext } from '../context';
import { getIsVideo } from '../utils/utils';
import { CarouselVideo } from './CarouselVideo';
import { CarouselImage } from './CarouselImage';

type CarouselItemToRenderProps = {}

export const CarouselItemToRender = (props: CarouselItemToRenderProps) => {
    const { currentItem, setIsFullscreenMode } = useCarouselContext();
    const itemContainerRef = useRef<HTMLDivElement>();
    const isVideoStateChangeInitiatedInternallyRef = useRef<boolean>(false);
    const isVideo = useMemo(() => getIsVideo(currentItem), [currentItem]);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const onClick = useCallback((e: MouseEvent) => {
        if (!isVideo) return;
        if (e.detail === 2) {
            setIsFullscreenMode((current) => !current);
        }

        isVideoStateChangeInitiatedInternallyRef.current = false;
        setIsVideoPlaying((current) => !current);
    }, [isVideo, setIsFullscreenMode])

    return (
        <CarouselItemViewerContainer ref={itemContainerRef} onClick={onClick}>
            {isVideo ?
                <CarouselVideo
                    itemContainerRef={itemContainerRef}
                    isVideoPlaying={isVideoPlaying}
                    isVideoStateChangeInitiatedInternallyRef={isVideoStateChangeInitiatedInternallyRef}
                    setIsVideoPlaying={setIsVideoPlaying}
                    {...currentItem}
                />
                :
                <CarouselImage itemContainerRef={itemContainerRef} {...currentItem} />
            }
        </CarouselItemViewerContainer>
    )
}