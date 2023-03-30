import { CLASSNAME__ITEM_VIEWER_BUTTON } from '../../constants';
import { getClassname } from '../../utils';

type CarouselItemViewerCustomButtonProps = {
    onClick?: () => void;
    xlinkHref: string;
}

export const CarouselItemViewerCustomButton = ({
    onClick = () => null,
    xlinkHref,
}: CarouselItemViewerCustomButtonProps) => {
    return (
        <svg onClick={onClick} className={getClassname({ elementName: CLASSNAME__ITEM_VIEWER_BUTTON })}>
            <use 
                xlinkHref={xlinkHref}
                href={xlinkHref}
            />
        </svg>
    );
}