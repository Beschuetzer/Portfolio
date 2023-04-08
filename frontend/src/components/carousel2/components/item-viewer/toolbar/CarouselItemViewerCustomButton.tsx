import { forwardRef } from "react";
import { CLASSNAME__ITEM_VIEWER_BUTTON } from "../../../constants";
import { getClassname } from "../../../utils";

type CarouselItemViewerCustomButtonProps = {
    classNameModifier?: string;
    onClick?: () => void;
    xlinkHref: string;
}

export const CarouselItemViewerCustomButton = forwardRef<SVGSVGElement, CarouselItemViewerCustomButtonProps> (({
    classNameModifier = '',
    onClick = () => null,
    xlinkHref,
}, ref) => {
    const className = getClassname({ elementName: CLASSNAME__ITEM_VIEWER_BUTTON });
    const classModifierName = `${className}-${classNameModifier}`
    return (
        <svg ref={ref} onClick={onClick} className={`${className} ${classNameModifier ? classModifierName : ''}`}>
            <use 
                xlinkHref={xlinkHref}
                href={xlinkHref}
            />
        </svg>
    );
})