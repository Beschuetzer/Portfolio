import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { SeekBackButton } from '../../buttons/SeekBackButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
type CarouselItemViewerSeekBackButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekBackButton = ({
    actionName = '',
    onClick = () => null,
    position = 'center',
    shortcuts = [],
}: CarouselItemViewerSeekBackButtonProps) => {
    const { currentSvgs: currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.seekBackButton || '';

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={shortcuts} position={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref} /> :
                <SeekBackButton onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
}