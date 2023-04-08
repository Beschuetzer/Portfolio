import React, { ReactNode, useCallback, useState } from 'react'
import { getClassname } from '../utils';
import { CloseButton } from './buttons/CloseButton';
import { useCarouselContext } from '../context';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { Exclusive } from '../types';

export type CarouselVideoOverlay = Exclusive<{
    /*
    *Use this prop in order to specify a customer overlay layout
    */
    children?: ReactNode | ReactNode[]
    closeButton?: {
        /*
        *The number of rem that the close button is from the top
        */
        topInRem?: number;
        /*
        *The number of rem that the close button is from the right
        */
        rightInRem?: number;
    }
}, {
    /*
    * This only shows when the video is paused and is an <h3> tag under the hood.
    */
    title?: string | undefined;

    /*
    * This only shows when the video is paused and is a <p> tag under the hood.
    */
    text?: string | undefined;
}>

export type CarouselVideoOverlayProps = {
    /*
    *This is used internally and determines when the overlay is shown
    */
    isVideoPlaying?: boolean;
} & CarouselVideoOverlay;

export const CarouselVideoOverlay = (props: CarouselVideoOverlayProps) => {
    //#region Init
    const { children, isVideoPlaying, title, text } = props;
    const [isVisible, setIsVisible] = useState(true);

    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.closeButton || '';
    //#endregion

    //#region Handlers/Functions
    const onCloseClick = useCallback((e: MouseEvent) => {
        console.log({e});
        
        stopPropagation(e)
        setIsVisible(false);
    }, [setIsVisible])

    function stopPropagation(e: MouseEvent) {
        e.stopPropagation();
    }
    //#endregion

    //#region JSX
    const button =  !!svgHref ? (
        <CarouselItemViewerCustomButton onClick={onCloseClick as any} xlinkHref={svgHref} classNameModifier='inverse' />
    ) : (
        <CloseButton onClick={onCloseClick as any} classNameModifier='inverse' />
    );

    function renderChildren() {
        if (children) {
            return (
                <div>
                    {children}
                    {button}
                </div>
            )
        }

        return (
            <>
                <div className={`${className}-header`}>
                    <h3 dangerouslySetInnerHTML={{__html: title || ''}}/>
                    {button}
                </div>
                {text ? (
                    <p dangerouslySetInnerHTML={{__html: text || ''}}/>
                ) : null}
            </>
        )
    }

    const visibilityStyle = isVideoPlaying || !isVisible ? getClassname({ modifiedName: "hidden" }) : '';
    const className = getClassname({ elementName: 'video-overlay' });
    const classNameCustom = getClassname({ elementName: 'video-overlay-custom' });
    const classNameToUse = `${className} ${children ? classNameCustom : ''} ${visibilityStyle}`;

    return (
        <div className={classNameToUse} onClick={stopPropagation as any}>
            {renderChildren()}
        </div>
    )
    //#endregion
}