import { CSSProperties, forwardRef } from "react";
import { CLASSNAME__HIDDEN, CLASSNAME__ITEM_VIEWER_BUTTON } from "../../../constants";
import { getClassname } from "../../../utils";
import { StylingLogic } from "../../../business-logic/StylingLogic";

type CarouselItemViewerCustomButtonProps = {
    classNameModifier?: string;
    fillColor?: string;
    onClick?: () => void;
    showButton?: boolean;
    style?: CSSProperties;
    xlinkHref: string;
    useElementStyle?: CSSProperties;
}

export const CarouselItemViewerCustomButton = forwardRef<SVGSVGElement, CarouselItemViewerCustomButtonProps>(({
    classNameModifier = '',
    fillColor = '',
    onClick = () => null,
    showButton = true,
    style = {},
    useElementStyle = {},
    xlinkHref,
}, ref) => {
    const className = getClassname({ elementName: CLASSNAME__ITEM_VIEWER_BUTTON });
    const classModifierName = `${className}-${classNameModifier}`
    const defaultStyles = StylingLogic.getButtonColorStyle(fillColor, 'fill', {
        transformOrigin: 'center',
    })

    return (
        <svg style={style} ref={ref} onClick={onClick} className={`${className} ${classNameModifier ? classModifierName : ''} ${!showButton ? CLASSNAME__HIDDEN : ''}`}>
            <use
                style={{ ...useElementStyle, ...defaultStyles }}
                xlinkHref={xlinkHref}
                href={xlinkHref}
            />
        </svg>
    );
})