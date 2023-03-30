import React, { useCallback } from 'react'
import { PlayButton } from '../buttons/PlayButton';
import { useCarouselInstanceContext } from '../CarouselInstanceProvider';
import { EMPTY_STRING } from '../../constants';
import { useCarouselContext } from '../../context';
import { getClassname } from '../../utils';

const elementName = 'item-viewer-button';
export const CarouselItemViewerPlayButton = () => {
    const { setCurrentItemSrc, currentSvgHrefs } = useCarouselContext();
    const { id } = useCarouselInstanceContext();
    const svgHref = currentSvgHrefs?.playButton || '';

    const onPlay = useCallback(() => {
        setCurrentItemSrc(EMPTY_STRING);
    }, [setCurrentItemSrc, EMPTY_STRING]);

    return !!svgHref ? (
        <svg onClick={onPlay} className={getClassname({ elementName })}>
            <use 
                xlinkHref={svgHref}
                href={svgHref}
            />
        </svg>
    ) : <PlayButton onClick={onPlay}/>
}