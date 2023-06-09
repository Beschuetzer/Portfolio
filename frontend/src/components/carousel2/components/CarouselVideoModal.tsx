import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getClassname, setCssCustomProperty } from '../utils';
import { CloseButton } from './buttons/CloseButton';
import { useCarouselContext } from '../context';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { Exclusive } from '../types';
import { CLASSNAME__ITEM_VIEWER_BUTTON, CLASSNAME__VIDEO_MODAL_BUTTON_RIGHT, CLASSNAME__VIDEO_MODAL_BUTTON_TOP } from '../constants';
import { StylingLogic } from '../business-logic/StylingLogic';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';

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
export type CarouselVideoModalProps = Exclusive<{
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

export type CarouselVideoModalInternalProps = {
    /*
    *This is used internally and determines when the overlay is shown
    */
    isVideoPlaying?: boolean;
    /*
    *This is used internally to determine where the overlay is shown
    */
} & CarouselVideoModalProps & Pick<CarouselItemViewerToolbarProps, 'videoRef'>;

export const CarouselVideoModal = (props: CarouselVideoModalInternalProps) => {
    //#region Init
    const { elementStylings, currentItemIndex, currentItem } = useCarouselContext();

    const { children, isVideoPlaying, sections, closeButton, videoRef } = props;
    const [isVisible, setIsVisible] = useState(true);
    const videoModalRef = useRef<HTMLElement>();

    const { svgHref } = elementStylings?.closeButton || {};
    const isCustom = useMemo(() => !!children, [children]);
    const { stylingLogic } = useBusinessLogic({ videoRef, videoModalRef })
    const closeButtonColor = useMemo(() => stylingLogic.carouselVideoCloseButtonColor, [stylingLogic.carouselVideoCloseButtonColor]);
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
    }, [closeButton, isCustom])

    useEffect(() => {
        setIsVisible(true);
    }, [currentItem, currentItemIndex])
    //#endregion

    //#region JSX
    const visibilityStyle = useMemo(() => isVideoPlaying || !isVisible ? getClassname({ modifiedName: "hidden" }) : '', [isVideoPlaying, isVisible]);
    const className = useMemo(() => getClassname({ elementName: 'video-modal' }), []);
    const classNameCustom = useMemo(() => getClassname({ elementName: 'video-modal-custom' }), []);
    const classNameToUse = useMemo(() => `${className} ${isCustom ? classNameCustom : ''} ${visibilityStyle}`, [
        className,
        classNameCustom,
        isCustom,
        visibilityStyle
    ]);
    const button = useMemo(() => !!svgHref ? (
        <CarouselItemViewerCustomButton
            onClick={onCloseClick as any}
            xlinkHref={svgHref}
            classNamesToInclude={[`${CLASSNAME__ITEM_VIEWER_BUTTON}-inverse`]}
            fillColor={closeButtonColor}
            style={stylingLogic.carouselVideoModalCloseButtonStyle}
        />
    ) : (
        <CloseButton
            onClick={onCloseClick as any}
            className={isCustom ? CLASSNAME__ITEM_VIEWER_BUTTON : undefined}
            classNameModifier='inverse'
            fillColor={closeButtonColor}
            style={stylingLogic.carouselVideoModalCloseButtonStyle}
        />
    ),
        [
            closeButtonColor,
            isCustom,
            onCloseClick,
            stylingLogic.carouselVideoModalCloseButtonStyle,
            svgHref
        ]);

    const renderChildren = useCallback(() => {
        if (isCustom) {
            return (
                <div>
                    {children}
                    {button}
                </div>
            )
        }


        if (!sections || sections.length === 0) return null;
        return sections.map(({ text, title }, index) => (
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
    }, [button, children, className, isCustom, sections]);


    return (
        <div ref={videoModalRef as any} className={classNameToUse} onClick={stopPropagation as any} style={stylingLogic.carouselVideoModalStyle}>
            {renderChildren()}
        </div>
    )
    //#endregion
}