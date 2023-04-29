import { CSSProperties, forwardRef } from "react";
import { CLASSNAME__HIDDEN, CLASSNAME__ITEM_VIEWER_BUTTON } from "../../../constants";
import { StylingLogic } from "../../../business-logic/StylingLogic";

type CarouselItemViewerCustomButtonProps = {
    classNamesToInclude?: string[];
    fillColor?: string;
    onClick?: () => void;
    showButton?: boolean;
    style?: CSSProperties;
    xlinkHref: string;
    useElementStyle?: CSSProperties;
}

export const CarouselItemViewerCustomButton = forwardRef<SVGSVGElement, CarouselItemViewerCustomButtonProps>(({
    classNamesToInclude = [],
    fillColor = '',
    onClick = () => null,
    showButton = true,
    style = {},
    useElementStyle = {},
    xlinkHref,
}, ref) => {
    const classNamesToIncludeClassname = classNamesToInclude.join(' ');
    const defaultStyles = StylingLogic.getButtonColorStyle(fillColor, 'fill', {
        transformOrigin: 'center',
    })

    return (
        <svg style={style} ref={ref} onClick={onClick} className={`${CLASSNAME__ITEM_VIEWER_BUTTON} ${classNamesToIncludeClassname} ${!showButton ? CLASSNAME__HIDDEN : ''}`}>
            <use
                style={{ ...useElementStyle, ...defaultStyles }}
                xlinkHref={xlinkHref}
                href={xlinkHref}
            />
        </svg>
    );
})