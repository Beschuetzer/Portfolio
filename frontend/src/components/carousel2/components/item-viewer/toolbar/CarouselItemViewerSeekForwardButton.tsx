import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { SeekForwardButton } from '../../buttons/SeekForwardButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';

type CarouselItemViewerSeekForwardButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekForwardButton = forwardRef<any, CarouselItemViewerSeekForwardButtonProps> (({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    position = 'center',
    shortcuts =[],
}, ref) => {
    const { currentSvgs: currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.seekForwardButton || '';

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={shortcuts} position={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} /> :
                <SeekForwardButton ref={ref} onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
})