import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { getClassname, setCssCustomProperty } from '../utils';
import { CloseButton } from './buttons/CloseButton';
import { useCarouselContext } from '../context';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { Exclusive } from '../types';
import { CLASSNAME__ITEM_VIEWER_BUTTON, CLASSNAME__OVERLAY_BUTTON_RIGHT, CLASSNAME__OVERLAY_BUTTON_TOP } from '../constants';
import { StylingLogic } from '../business-logic/StylingLogic';
import { useCarouselInstanceContext } from './CarouselInstanceProvider';

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
    /*
    *This is used internally to determine where the overlay is shown
    */
    videoRef?: React.MutableRefObject<HTMLVideoElement | undefined>;
} & CarouselVideoOverlay;

export const CarouselVideoOverlay = (props: CarouselVideoOverlayProps) => {
    //#region Init
    const { currentButtons: currentSvgHrefs, options: optionsGlobal } = useCarouselContext();
    const { options: optionsLocal } = useCarouselInstanceContext();

    const { children, isVideoPlaying, title, text, closeButton, videoRef } = props;
    const [isVisible, setIsVisible] = useState(true);
    const overlayRef = useRef<HTMLElement>();

    const options = optionsLocal || optionsGlobal;
    const { svgHref } = currentSvgHrefs?.closeButton || {};
    const isCustom = !!children;
    const styleLogic = new StylingLogic({ options, videoRef, overlayRef });
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
    const button = !!svgHref ? (
        <CarouselItemViewerCustomButton onClick={onCloseClick as any} xlinkHref={svgHref} classNameModifier='inverse' />
    ) : (
        <CloseButton
            onClick={onCloseClick as any}
            className={isCustom ? getClassname({ elementName: CLASSNAME__ITEM_VIEWER_BUTTON }) : undefined}
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
                    <h3 dangerouslySetInnerHTML={{ __html: title || '' }} />
                    {button}
                </div>
                {text ? (
                    <p dangerouslySetInnerHTML={{ __html: text || '' }} />
                ) : null}
            </>
        )
    }

    const visibilityStyle = isVideoPlaying || !isVisible ? getClassname({ modifiedName: "hidden" }) : '';
    const className = getClassname({ elementName: 'video-overlay' });
    const classNameCustom = getClassname({ elementName: 'video-overlay-custom' });
    const classNameToUse = `${className} ${isCustom ? classNameCustom : ''} ${visibilityStyle}`;

    return (
        <div ref={overlayRef as any} className={classNameToUse} onClick={stopPropagation as any} style={styleLogic.carouselVideoOverlayStyle}>
            {renderChildren()}
        </div>
    )
    //#endregion
}