import { forwardRef, useCallback } from 'react'
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CloseButton } from '../../buttons/CloseButton';
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { CarouselItemViewerToolbarProps } from './CarouselItemViewerToolbar';
import { CURRENT_VIDEO_CURRENT_TIME_DEFAULT } from '../../../constants';

type CarouselItemViewerCloseButtonProps = {} & CarouselItemViewerButtonProps & Pick<CarouselItemViewerToolbarProps, 'videoRef'>;
export const CarouselItemViewerCloseButton = forwardRef<any, CarouselItemViewerCloseButtonProps>((props, ref) => {
    const {
        actionName = '',
        isShortcutVisible = false,
        onClick = () => null,
        position: shortcutPosition = 'center',
        videoRef,
    } = props;
    const { elementStylings, setIsFullscreenMode, isFullscreenMode, setCurrentVideoCurrentTime } = useCarouselContext();
    const {
        optionsLogic,
        toolbarActionsLogic,
        toolbarLogic,
        stylingLogic,
    } = useBusinessLogic();
    const closeAction = toolbarActionsLogic.getClose();
    const { svgHref, style } = elementStylings?.closeButton || {};
    const fillColor = optionsLogic.getButtonColor(CarouselElement.closeButton);
    useKeyboardShortcuts({
        keyboardShortcuts: [
            {
                keys: closeAction.keys,
                action: () => {
                    onClickLocal();
                },
            },
        ],
        skipCondition: () => toolbarLogic?.getShouldSkipKeyboardShortcuts(),
    });

    const onClickLocal = useCallback(async () => {
        onClick && onClick()
        setIsFullscreenMode(false);
        setCurrentVideoCurrentTime(videoRef?.current?.currentTime || CURRENT_VIDEO_CURRENT_TIME_DEFAULT)
    }, [onClick, setCurrentVideoCurrentTime, setIsFullscreenMode, videoRef]);

    return (
        <CarouselItemViewerShortcutIndicator
            actionName={actionName}
            isShortcutVisible={isShortcutVisible}
            position={shortcutPosition}
            shortcuts={closeAction.keys}
            showButton={isFullscreenMode}
        >
            {!!svgHref ?
                <CarouselItemViewerCustomButton
                    ref={ref}
                    onClick={onClickLocal}
                    xlinkHref={svgHref}
                    style={stylingLogic.getCarouselElementChildSizeStlye({ buttonName: CarouselElement.closeButton, subElementName: null })}
                    useElementStyle={style}
                    fillColor={fillColor}
                /> :
                <CloseButton
                    ref={ref}
                    onClick={onClickLocal}
                    fillColor={fillColor}
                    childStyle={style}
                />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})