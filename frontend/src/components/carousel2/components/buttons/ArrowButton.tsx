import { forwardRef } from "react";
import { CLASSNAME__BUTTON } from "../../constants";
import { ArrowProps, ButtonProps } from "../../types";
import { getClassname } from "../../utils";

type ArrowButtonProps = {
} & ButtonProps & ArrowProps;

export const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(({
    className = CLASSNAME__BUTTON,
    fillColor,
    direction,
    onClick = () => null,
}, ref) => {
    const arrowClassname = getClassname({ elementName: 'arrow' });
    const backgroundColorStyle = fillColor ? {
        backgroundColor: fillColor,
    } as React.CSSProperties : {}
    return (
        <button ref={ref} onClick={onClick} className={`${className} ${arrowClassname}`}>
            <div style={backgroundColorStyle} className={`${arrowClassname}-${direction}-one}`} />
            <div style={backgroundColorStyle} className={`${arrowClassname}-${direction}-two}`} />
        </button>
    )
})