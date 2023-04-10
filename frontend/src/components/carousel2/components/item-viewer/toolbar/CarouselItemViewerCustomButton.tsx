import { forwardRef } from "react";
import { CLASSNAME__ITEM_VIEWER_BUTTON } from "../../../constants";
import { getClassname } from "../../../utils";

type CarouselItemViewerCustomButtonProps = {
    classNameModifier?: string;
    fillColor?: string;
    onClick?: () => void;
    xlinkHref: string;
}

export const CarouselItemViewerCustomButton = forwardRef<SVGSVGElement, CarouselItemViewerCustomButtonProps> (({
    classNameModifier = '',
    fillColor,
    onClick = () => null,
    xlinkHref,
}, ref) => {
    const className = getClassname({ elementName: CLASSNAME__ITEM_VIEWER_BUTTON });
    const classModifierName = `${className}-${classNameModifier}`
    const fillColorStyle = fillColor ? {
        fillColor,
    } as React.CSSProperties : {}
    return (
        <svg ref={ref} onClick={onClick} className={`${className} ${classNameModifier ? classModifierName : ''}`}>
            <use 
                style={fillColorStyle}
                xlinkHref={xlinkHref}
                href={xlinkHref}
            />
        </svg>
    );
})