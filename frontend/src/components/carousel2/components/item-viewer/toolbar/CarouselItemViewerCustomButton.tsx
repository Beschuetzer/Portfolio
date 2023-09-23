import { CSSProperties, forwardRef, useMemo } from "react";
import { CLASSNAME__HIDDEN, CLASSNAME__ITEM_VIEWER_BUTTON } from "../../../constants";
import { StylingLogic } from "../../../business-logic/StylingLogic";
import { CarouselElementCustomization } from "../../../types";
import { useBusinessLogic } from "../../../hooks/useBusinessLogic";

export type CarouselItemViewerCustomButtonProps = {
    classNamesToInclude?: string[];
    fillColor?: string;
    onClick?: () => void;
    showButton?: boolean;
    style?: CSSProperties;
    xlinkHref: CarouselElementCustomization['svgHref'];
    useElementStyle?: CSSProperties;
}

export const CarouselItemViewerCustomButton = forwardRef<SVGSVGElement, CarouselItemViewerCustomButtonProps>((props, ref) => {
    const {
        classNamesToInclude = [],
        fillColor = '',
        onClick = () => null,
        showButton = true,
        style = {},
        useElementStyle = {},
        xlinkHref,
    } = props;
    const { optionsLogic } = useBusinessLogic();
    const classNamesToIncludeClassname = useMemo(() => classNamesToInclude.join(' '), [classNamesToInclude]);
    const defaultStyles = useMemo(() => StylingLogic.getColorStyle(fillColor, 'fill', {
        transformOrigin: 'center',
    }), [fillColor]);
    const xlinkHrefToUse = optionsLogic.getXlinkHref(xlinkHref);

    return (
        <svg
            style={style}
            ref={ref}
            onClick={onClick}
            className={`${CLASSNAME__ITEM_VIEWER_BUTTON} ${classNamesToIncludeClassname} ${!showButton ? CLASSNAME__HIDDEN : ''}`}
        >
            <use
                style={{ ...useElementStyle, ...defaultStyles }}
                xlinkHref={xlinkHrefToUse}
                href={xlinkHrefToUse}
            />
        </svg>
    );
})