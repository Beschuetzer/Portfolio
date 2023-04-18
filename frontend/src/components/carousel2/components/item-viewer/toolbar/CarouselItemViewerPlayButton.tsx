import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { PlayButton } from '../../buttons/PlayButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';

type CarouselItemViewerPlayButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPlayButton = ({
    actionName = '',
    onClick = () => null,
    position = 'center',
    shortcuts = [],
}: CarouselItemViewerPlayButtonProps) => {
    const { currentSvgs: currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.playButton || '';

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={shortcuts} position={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref} /> :
                <PlayButton onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
}