import { CSSProperties, forwardRef } from "react";
import { CLASSNAME__ITEM_VIEWER_BUTTON } from "../../../constants";
import { getClassname } from "../../../utils";

type CarouselItemViewerCustomButtonProps = {
    classNameModifier?: string;
    fillColor?: string;
    onClick?: () => void;
    style?: CSSProperties;
    xlinkHref: string;
}

export const CarouselItemViewerCustomButton = forwardRef<SVGSVGElement, CarouselItemViewerCustomButtonProps> (({
    classNameModifier = '',
    fillColor,
    onClick = () => null,
    style = {},
    xlinkHref,
}, ref) => {
    const className = getClassname({ elementName: CLASSNAME__ITEM_VIEWER_BUTTON });
    const classModifierName = `${className}-${classNameModifier}`
    const defaultStyles = fillColor ? {
        fill: fillColor,
        transformOrigin: 'center',
    } as React.CSSProperties : {}
    
    return (
        <svg ref={ref} onClick={onClick} className={`${className} ${classNameModifier ? classModifierName : ''}`}>
            <use 
                style={{...style, ...defaultStyles}}
                xlinkHref={xlinkHref}
                href={xlinkHref}
            />
        </svg>
    );
})