import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CloseButton } from '../buttons/CloseButton';
import { useCarouselContext } from '../../context';
import { CarouselItemViewerCustomButton } from '../item-viewer/toolbar/CarouselItemViewerCustomButton';
import { CarouselModalSectionProps, Exclusive } from '../../types';
import {
    CLASSNAME__ITEM_VIEWER_BUTTON,
    CLASSNAME__MODAL,
    CLASSNAME__MODAL_CUSTOM,
    CLASSNAME__MODAL_MINIMIZED,
    CSS_CUSTOM_PROPERTY_MODAL_OPACITY_MINIMIZED,
    CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_BACKGROUND_COLOR,
    CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_FOREGROUND_COLOR,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CAROUSEL_MODAL_PADDING_DEFAULT,
} from '../../constants';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';
import { CarouselItemViewerToolbarProps } from '../item-viewer/toolbar/CarouselItemViewerToolbar';
import { useSetCustomCssProperties } from '../../hooks/useSetCustomCssProperties';
import { CarouselModalSection } from './CarouselModalSection';

export type CarouselModalProps = Exclusive<{
    /**
    *Use this when you want to use a custom modal layout.
    **/
    children?: ReactNode | ReactNode[]
}, {
    /**
    *Use this when you want to use the default modal layout.
    *@example
    *sections: [
    *    {
    *        title: "Section 1 Title",
    *        text: "Section 1 description."
    *    },
    *    {
    *        title: "Section 2 Title",
    *        text: "Section 2 description."
    *    }
    *],
    **/
    sections?: CarouselModalSectionProps[];
}> & {
    /**
    *The amount of pixels that the close button is from the top.  Default is {@link CAROUSEL_MODAL_PADDING_DEFAULT.top here}.
    **/
    closeButtonTop?: number
}

export type CarouselModalInternalProps = {
    isProgressBarBeingHoveredRef?: React.MutableRefObject<boolean>;
    /**
    *This is used internally and determines when the modal is shown
    **/
    isVideoPlaying?: boolean;
    itemViewerToolbarRef?: React.MutableRefObject<HTMLElement | undefined>;
    itemRef?: React.MutableRefObject<HTMLElement | undefined>;
    shouldHideWhenMinimized?: boolean;
} & CarouselModalProps & Pick<CarouselItemViewerToolbarProps, 'isProgressBarMouseDownRef'>;

const IS_VISIBLE_INITIAL = true;
const MODAL_HEIGHT_INITIAL = 0;

export const CarouselModal = (props: CarouselModalInternalProps) => {
    //#region Init
    const { elementStylings, currentItemIndex, currentItem, isModalMinimized, setIsModalMinimized } = useCarouselContext();
    const {
        children,
        isVideoPlaying,
        sections,
        isProgressBarMouseDownRef,
        isProgressBarBeingHoveredRef,
        itemViewerToolbarRef,
        itemRef,
        shouldHideWhenMinimized = false,
    } = props;
    const { modal } = currentItem;
    const { closeButtonTop } = modal || {};
    const [isVisible, setIsVisible] = useState(IS_VISIBLE_INITIAL);
    const modalRef = useRef<HTMLElement>();
    const modalHeightRef = useRef<number>(MODAL_HEIGHT_INITIAL);
    const { svgHref } = elementStylings?.closeButton || {};
    const isCustom = useMemo(() => !!children, [children]);
    const { optionsLogic, stylingLogic } = useBusinessLogic({ itemRef, modalRef, itemViewerToolbarRef });
    const closeButtonColor = useMemo(() => optionsLogic.modalCloseButtonColor, [optionsLogic.modalCloseButtonColor]);
    const [, setShouldRerender] = useState(false);
    useSetCustomCssProperties({
        element: modalRef?.current as HTMLElement,
        properties: [
            [CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_BACKGROUND_COLOR, optionsLogic?.modalBackgroundColor],
            [CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_FOREGROUND_COLOR, optionsLogic?.modalTextColor],
            [CSS_CUSTOM_PROPERTY_MODAL_OPACITY_MINIMIZED, optionsLogic?.modalOpacityWhenMinimized]
        ]
    })
    //#endregion

    //#region Handlers/Functions
    const onClick = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        if (optionsLogic.modalMinimizeOnClick) {
            setIsModalMinimized(current => !current);
            return;
        }
        setIsModalMinimized(false);
    }, [optionsLogic.modalMinimizeOnClick, setIsModalMinimized])

    const onCloseClick = useCallback((e: MouseEvent) => {
        onClick(e)
        setIsModalMinimized(true);
    }, [onClick, setIsModalMinimized])
    //#endregion

    //#region Side Fx
    useEffect(() => {
        setIsVisible(IS_VISIBLE_INITIAL);
        if (!optionsLogic.modalMaintainMinimizedStateAcrossItems) {
            setIsModalMinimized(false);
        }
    }, [currentItem, currentItemIndex, optionsLogic.modalMaintainMinimizedStateAcrossItems, setIsModalMinimized])

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
    const classNameToUse = useMemo(() => `${CLASSNAME__MODAL} ${isCustom ? CLASSNAME__MODAL_CUSTOM : ''} ${isModalMinimized ? CLASSNAME__MODAL_MINIMIZED : ''}`, [isCustom, isModalMinimized]);
    const buttonJSX = useMemo(() => !!svgHref ? (
        <CarouselItemViewerCustomButton
            onClick={onCloseClick as any}
            xlinkHref={svgHref}
            classNamesToInclude={[`${CLASSNAME__ITEM_VIEWER_BUTTON}-inverse`]}
            fillColor={closeButtonColor}
            style={{ ...stylingLogic.carouselModalCloseButtonStyle, ...(closeButtonTop ? { top: closeButtonTop } : {}) }}
        />
    ) : (
        <CloseButton
            onClick={onCloseClick as any}
            className={isCustom ? CLASSNAME__ITEM_VIEWER_BUTTON : undefined}
            classNameModifier='inverse'
            fillColor={closeButtonColor}
            style={{ ...stylingLogic.carouselModalCloseButtonStyle, ...(closeButtonTop ? { top: closeButtonTop } : {}) }}
        />
    ),
        [
            closeButtonColor,
            closeButtonTop,
            isCustom,
            onCloseClick,
            stylingLogic.carouselModalCloseButtonStyle,
            svgHref,
        ]);

    const renderChildren = useCallback(() => {
        if (isModalMinimized) {
            return (
                <span>Description</span>
            )
        }

        if (isCustom) {
            return (
                <div>
                    {children}
                    {buttonJSX}
                </div>
            )
        }

        if (!sections || sections.length === 0 || isVideoPlaying) return null;

        return sections.map((section, index) =>
            //@ts-ignore
            <CarouselModalSection
                key={index}
                index={index}
                button={buttonJSX}
                {...section}
            />);
    }, [buttonJSX, children, isCustom, isModalMinimized, isVideoPlaying, sections]);

    return (
        <div
            ref={modalRef as any}
            className={classNameToUse}
            onClick={onClick as any}
            style={
                stylingLogic.getCarouselModalStyle(
                    (shouldHideWhenMinimized && isModalMinimized) || isVideoPlaying || !isVisible || !!isProgressBarMouseDownRef?.current || !!isProgressBarBeingHoveredRef?.current,
                    modalHeightRef.current,
                    isModalMinimized,
                )
            }
        >
            {renderChildren()}
        </div>
    )
    //#endregion
}