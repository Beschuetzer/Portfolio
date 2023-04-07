import React, { useCallback, useState } from 'react'
import { getClassname } from '../utils';
import { CloseButton } from './buttons/CloseButton';
import { useCarouselContext } from '../context';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';

export type CarouselVideoOverlay = {
   /*
    * This only shows when the video is paused and is an <h3> tag under the hood.
    */
   title?: string | undefined;

   /*
   * This only shows when the video is paused and is a <p> tag under the hood.
   */
   text?: string | undefined;
}
export type CarouselVideoOverlayProps = {
    /*
    *This is used internally and determines when the overlay is shown
    */
    isVideoPlaying?: boolean;
} & CarouselVideoOverlay;

export const CarouselVideoOverlay = (props: CarouselVideoOverlayProps) => {
    //#region Init
    const { isVideoPlaying, title, text } = props;
    const [isVisible, setIsVisible] = useState(true);

    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.closeButton || '';
    //#endregion

    //#region Handlers/Functions
    const onCloseClick = useCallback((e: MouseEvent) => {
        stopPropagation(e)
        setIsVisible(false);
    }, [setIsVisible])

    function stopPropagation(e: MouseEvent) {
        e.stopPropagation();
    }
    //#endregion

    //#region JSX
    const visibilityStyle = isVideoPlaying || !isVisible ? getClassname({ modifiedName: "hidden" }) : '';
    const className = getClassname({ elementName: 'video-overlay' });
    const classNameToUse = `${className} ${visibilityStyle}`;

    return (
        <div className={classNameToUse} onClick={stopPropagation as any}>
            <div className={`${className}-header`}>
                <h3>{title}</h3>
                {!!svgHref ? (
                    <CarouselItemViewerCustomButton onClick={onCloseClick as any} xlinkHref={svgHref} classNameModifier='inverse'/>
                ) : (
                    <CloseButton onClick={onCloseClick as any} classNameModifier='inverse'/>
                )}
            </div>
            <p>{text}</p>
        </div>
    )
    //#endregion
}