import React, { useCallback, useMemo } from 'react'
import { useCarouselInstanceContext } from '../CarouselInstanceProvider';
import { EMPTY_STRING } from '../../constants';
import { useCarouselContext } from '../../context';
import { getClassname } from '../../utils';
import { PauseButton } from '../buttons/PauseButton';

const elementName = 'item-viewer-button';
export const CarouselItemViewerPauseButton = () => {
    const { setCurrentItemSrc, currentSvgHrefs } = useCarouselContext();
    const { id } = useCarouselInstanceContext();
    const pauseButtonSvgHref = currentSvgHrefs?.pauseButton || '';

    const onClick = useCallback(() => {
        setCurrentItemSrc(EMPTY_STRING);
    }, [setCurrentItemSrc, EMPTY_STRING]);

    return !!pauseButtonSvgHref ? (
        <svg onClick={onClick} className={getClassname({ elementName })}>
            <use 
                xlinkHref={pauseButtonSvgHref}
                href={pauseButtonSvgHref}
            />
        </svg>
    ) : <PauseButton onClick={onClick}/>
}