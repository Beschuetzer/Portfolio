import { useCarouselContext } from '../../../context';
import { SeekForwardButton } from '../../buttons/SeekForwardButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

type CarouselItemViewerSeekForwardButtonProps = {
    onClick: () => void;
}
export const CarouselItemViewerSeekForwardButton = ({
    onClick
}: CarouselItemViewerSeekForwardButtonProps) => {
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.seekForwardButton || '';

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <SeekForwardButton onClick={onClick}/>
}