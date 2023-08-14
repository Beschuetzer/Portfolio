import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getClassname } from '../utils';
import { CloseButton } from './buttons/CloseButton';
import { useCarouselContext } from '../context';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { Exclusive } from '../types';
import { CLASSNAME__ITEM_VIEWER_BUTTON, CLASSNAME__MODAL, CLASSNAME__MODAL_CUSTOM, CLASSNAME__MODAL_HEADER, CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_BACKGROUND_COLOR, CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_FOREGROUND_COLOR } from '../constants';
import { StylingLogic } from '../business-logic/StylingLogic';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { useSetCustomCssProperties } from '../hooks/useSetCustomCssProperties';

export type CarouselModalSection = {
    /**
    * This only shows when the video is paused and is an `<h3>` tag under the hood.
    **/
    title?: string | undefined;

    /**
    * This only shows when the video is paused and is a `<p>` tag under the hood.
    **/
    text?: string | undefined;
}
export type CarouselModalProps = Exclusive<{
    /**
    *Use this prop in order to specify a customer overlay layout
    **/
    children?: ReactNode | ReactNode[]
}, {
    sections?: CarouselModalSection[];
}>

export type CarouselModalInternalProps = {
    /**
    *This is used internally and determines when the overlay is shown
    **/
    isVideoPlaying?: boolean;
    itemViewerToolbarRef?: React.MutableRefObject<HTMLElement | undefined>;
    itemRef?: React.MutableRefObject<HTMLElement | undefined>;
} & CarouselModalProps & Pick<CarouselItemViewerToolbarProps, 'isProgressBarMouseDownRef'>;

const MODAL_HEIGHT_INITIAL = 0;
export const CarouselModal = (props: CarouselModalInternalProps) => {
    //#region Init
    const { elementStylings, currentItemIndex, currentItem } = useCarouselContext();
    
    const { children, isVideoPlaying, sections, isProgressBarMouseDownRef, itemViewerToolbarRef, itemRef } = props;
    const [isVisible, setIsVisible] = useState(true);
    const modalRef = useRef<HTMLElement>();
    const modalHeightRef = useRef<number>(MODAL_HEIGHT_INITIAL);
    const { svgHref } = elementStylings?.closeButton || {};
    const isCustom = useMemo(() => !!children, [children]);
    const { optionsLogic, stylingLogic } = useBusinessLogic({ itemRef, modalRef, itemViewerToolbarRef });
    const closeButtonColor = useMemo(() => stylingLogic.carouselModalCloseButtonColor, [stylingLogic.carouselModalCloseButtonColor]);
    const [, setShouldRerender] = useState(false);
    useSetCustomCssProperties({
        element: modalRef?.current as HTMLElement,
        properties: [
            [CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_BACKGROUND_COLOR, optionsLogic?.modalBackgroundColor],
            [CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_FOREGROUND_COLOR, optionsLogic?.modalTextColor]
        ]
    })
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
        setIsVisible(true);
    }, [currentItem, currentItemIndex])

    useEffect(() => {
        const height = modalRef.current?.getBoundingClientRect().height;
        if (height !== undefined && height > MODAL_HEIGHT_INITIAL) {
            modalHeightRef.current = Math.max(height, modalHeightRef.current);
        }
    })

    useEffect(() => {
        modalHeightRef.current = MODAL_HEIGHT_INITIAL;
        setShouldRerender(current => !current);
    }, [currentItem])
    //#endregion

    //#region JSX
    const visibilityStyle = useMemo(() => isVideoPlaying || !isVisible ? getClassname({ modifiedName: "hidden" }) : '', [isVideoPlaying, isVisible]);
    const classNameToUse = useMemo(() => `${CLASSNAME__MODAL} ${isCustom ? CLASSNAME__MODAL_CUSTOM : ''} ${visibilityStyle}`, [
        isCustom,
        visibilityStyle
    ]);
    const button = useMemo(() => !!svgHref ? (
        <CarouselItemViewerCustomButton
            onClick={onCloseClick as any}
            xlinkHref={svgHref}
            classNamesToInclude={[`${CLASSNAME__ITEM_VIEWER_BUTTON}-inverse`]}
            fillColor={closeButtonColor}
            style={stylingLogic.carouselModalCloseButtonStyle}
        />
    ) : (
        <CloseButton
            onClick={onCloseClick as any}
            className={isCustom ? CLASSNAME__ITEM_VIEWER_BUTTON : undefined}
            classNameModifier='inverse'
            fillColor={closeButtonColor}
            style={stylingLogic.carouselModalCloseButtonStyle}
        />
    ),
        [
            closeButtonColor,
            isCustom,
            onCloseClick,
            stylingLogic.carouselModalCloseButtonStyle,
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

        if (!sections || sections.length === 0 || isVideoPlaying) return null;
        return sections.map(({ text, title }, index) => (
            <div key={index} style={StylingLogic.getCarouselModalChildStyle(index)}>
                <div className={CLASSNAME__MODAL_HEADER}>
                    <h3 dangerouslySetInnerHTML={{ __html: title || '' }} />
                    {index === 0 ? button : null}
                </div>
                {text ? (
                    <p dangerouslySetInnerHTML={{ __html: text || '' }} />
                ) : null}
            </div>
        ));
    }, [button, children, isCustom, isVideoPlaying, sections]);

    return (
        <div
            ref={modalRef as any}
            className={classNameToUse}
            onClick={stopPropagation as any}
            style={stylingLogic.getCarouselModalStyle(!!isProgressBarMouseDownRef?.current, modalHeightRef.current)}
        >
            {renderChildren()}
        </div>
    )
    //#endregion
}