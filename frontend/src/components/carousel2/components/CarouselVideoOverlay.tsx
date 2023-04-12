import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { getClassname, setCssCustomProperty } from '../utils';
import { CloseButton } from './buttons/CloseButton';
import { useCarouselContext } from '../context';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { Exclusive } from '../types';
import { CLASSNAME__ITEM_VIEWER_BUTTON, CLASSNAME__OVERLAY_BUTTON_RIGHT, CLASSNAME__OVERLAY_BUTTON_TOP } from '../constants';

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
    const { children, isVideoPlaying, title, text, closeButton } = props;
    const [isVisible, setIsVisible] = useState(true);

    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.closeButton || '';
    const isCustom = !!children;
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

    //#region Side Fx
    useEffect(() => {
        //update closeButton the top and left values
        if (closeButton && isCustom) {
            closeButton.topInRem && setCssCustomProperty(CLASSNAME__OVERLAY_BUTTON_TOP, `${closeButton.topInRem}rem`);
            closeButton.rightInRem && setCssCustomProperty(CLASSNAME__OVERLAY_BUTTON_RIGHT, `${closeButton.rightInRem}rem`);
        }
    }, [])
    //#endregion

    //#region JSX
    const button =  !!svgHref ? (
        <CarouselItemViewerCustomButton onClick={onCloseClick as any} xlinkHref={svgHref} classNameModifier='inverse' />
    ) : (
        <CloseButton
            onClick={onCloseClick as any}
            className={isCustom ?getClassname({ elementName: CLASSNAME__ITEM_VIEWER_BUTTON }) : '' }
            classNameModifier='inverse' 
        />
    );

    function renderChildren() {
        if (isCustom) {
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
    const classNameToUse = `${className} ${isCustom ? classNameCustom : ''} ${visibilityStyle}`;

    return (
        <div className={classNameToUse} onClick={stopPropagation as any}>
            {renderChildren()}
        </div>
    )
    //#endregion
}