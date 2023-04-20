import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { PauseButton } from '../../buttons/PauseButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';

type CarouselItemViewerPauseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPauseButton = forwardRef<any, CarouselItemViewerPauseButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    shortcutPosition: position = 'center',
    shortcuts = [],
}, ref) => {
    const { currentSvgs: currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.pauseButton || '';

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={shortcuts} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} /> :
                <PauseButton ref={ref} onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
})