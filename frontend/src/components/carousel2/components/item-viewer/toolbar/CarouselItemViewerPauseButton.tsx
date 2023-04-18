import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { PauseButton } from '../../buttons/PauseButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';

type CarouselItemViewerPauseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPauseButton = ({
    actionName = '',
    onClick = () => null,
    position = 'center',
    shortcuts = [],
}: CarouselItemViewerPauseButtonProps) => {
    const { currentSvgs: currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.pauseButton || '';

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={shortcuts} position={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref} /> :
                <PauseButton onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
}