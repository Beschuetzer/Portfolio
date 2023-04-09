import { useCarouselContext } from '../../../context';
import { SeekBackButton } from '../../buttons/SeekBackButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
type CarouselItemViewerSeekBackButtonProps = {
    onClick: () => void,
}
export const CarouselItemViewerSeekBackButton = ({
    onClick
}: CarouselItemViewerSeekBackButtonProps) => {
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.seekBackButton || '';

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <SeekBackButton onClick={onClick}/>
}