import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { getClassname, setCssCustomProperty } from '../utils';
import { CloseButton } from './buttons/CloseButton';
import { useCarouselContext } from '../context';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { Exclusive } from '../types';
import { CLASSNAME__ITEM_VIEWER_BUTTON, CLASSNAME__VIDEO_MODAL_BUTTON_RIGHT, CLASSNAME__VIDEO_MODAL_BUTTON_TOP } from '../constants';
import { StylingLogic } from '../business-logic/StylingLogic';
import { useCarouselInstanceContext } from './CarouselInstanceProvider';

export type CarouselVideoModalSection = {
     /*
    * This only shows when the video is paused and is an <h3> tag under the hood.
    */
     title?: string | undefined;

     /*
     * This only shows when the video is paused and is a <p> tag under the hood.
     */
     text?: string | undefined;
}
export type CarouselVideoModal = Exclusive<{
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
    sections?: CarouselVideoModalSection[];
}>

export type CarouselVideoModalProps = {
    /*
    *This is used internally and determines when the overlay is shown
    */
    isVideoPlaying?: boolean;
    /*
    *This is used internally to determine where the overlay is shown
    */
    videoRef?: React.MutableRefObject<HTMLVideoElement | undefined>;
} & CarouselVideoModal;

export const CarouselVideoModal = (props: CarouselVideoModalProps) => {
    //#region Init
    const { currentButtons: currentSvgHrefs, options: optionsGlobal, currentItemIndex } = useCarouselContext();
    const { options: optionsLocal, currentItemInInstance } = useCarouselInstanceContext();

    const { children, isVideoPlaying, sections, closeButton, videoRef } = props;
    const [isVisible, setIsVisible] = useState(true);
    const modalRef = useRef<HTMLElement>();
    
    const options = optionsLocal || optionsGlobal;
    const { svgHref } = currentSvgHrefs?.closeButton || {};
    const isCustom = !!children;
    const stylingLogic = new StylingLogic({ options, videoRef, modalRef, currentItemInInstance });
    const closeButtonColor = stylingLogic.carouselVideoCloseButtonColor;
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
            closeButton.topInRem && setCssCustomProperty(CLASSNAME__VIDEO_MODAL_BUTTON_TOP, `${closeButton.topInRem}rem`);
            closeButton.rightInRem && setCssCustomProperty(CLASSNAME__VIDEO_MODAL_BUTTON_RIGHT, `${closeButton.rightInRem}rem`);
        }
    }, [])

    useEffect(() => {
        setIsVisible(true);
    }, [currentItemInInstance, currentItemIndex])
    //#endregion

    //#region JSX
    const button = !!svgHref ? (
        <CarouselItemViewerCustomButton onClick={onCloseClick as any} xlinkHref={svgHref} classNameModifier='inverse' fillColor={closeButtonColor} style={stylingLogic.carouselVideoModalCloseButtonStyle}/>
    ) : (
        <CloseButton
            onClick={onCloseClick as any}
            className={isCustom ? getClassname({ elementName: CLASSNAME__ITEM_VIEWER_BUTTON }) : undefined}
            classNameModifier='inverse'
            fillColor={closeButtonColor}
            style={stylingLogic.carouselVideoModalCloseButtonStyle}
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

        
        if (!sections || sections.length === 0) return null;
        return sections.map(({text, title}, index) => (
            <div key={index} style={StylingLogic.getCarouselVideoModalChildStyle(index)}>
                <div className={`${className}-header`}>
                    <h3 dangerouslySetInnerHTML={{ __html: title || '' }} />
                    {index === 0 ? button : null}
                </div>
                {text ? (
                    <p dangerouslySetInnerHTML={{ __html: text || '' }} />
                ) : null}
            </div>
        ));
    }

    const visibilityStyle = isVideoPlaying || !isVisible ? getClassname({ modifiedName: "hidden" }) : '';
    const className = getClassname({ elementName: 'video-modal' });
    const classNameCustom = getClassname({ elementName: 'video-modal-custom' });
    const classNameToUse = `${className} ${isCustom ? classNameCustom : ''} ${visibilityStyle}`;
    
    return (
        <div ref={modalRef as any} className={classNameToUse} onClick={stopPropagation as any} style={stylingLogic.carouselVideoModalStyle}>
            {renderChildren()}
        </div>
    )
    //#endregion
}