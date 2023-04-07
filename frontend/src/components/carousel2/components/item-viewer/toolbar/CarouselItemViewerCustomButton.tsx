import { CLASSNAME__ITEM_VIEWER_BUTTON } from "../../../constants";
import { getClassname } from "../../../utils";

type CarouselItemViewerCustomButtonProps = {
    classNameModifier?: string;
    onClick?: () => void;
    xlinkHref: string;
}

export const CarouselItemViewerCustomButton = ({
    classNameModifier = '',
    onClick = () => null,
    xlinkHref,
}: CarouselItemViewerCustomButtonProps) => {
    const className = getClassname({ elementName: CLASSNAME__ITEM_VIEWER_BUTTON });
    const classModifierName = `${className}-${classNameModifier}`
    return (
        <svg onClick={onClick} className={`${className} ${classNameModifier ? classModifierName : ''}`}>
            <use 
                xlinkHref={xlinkHref}
                href={xlinkHref}
            />
        </svg>
    );
}