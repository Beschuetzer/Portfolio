import { forwardRef } from "react";
import { CLASSNAME__BUTTON } from "../../constants";
import { ArrowProps, ButtonProps } from "../../types";

type ArrowButtonProps = {
} & ButtonProps & ArrowProps;

export const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(({
    className = CLASSNAME__BUTTON,
    fillColor,
    direction,
    onClick = () => null,
}, ref) => {
    const classNameToUse = `${className}--arrow`;
    const leftClassName = `${classNameToUse}-left`;
    const rightClassName = `${classNameToUse}-right`;
    const backgroundColorStyle = fillColor ? {
        backgroundColor: fillColor,
    } as React.CSSProperties : {}
    return (
        <button ref={ref} onClick={onClick} className={`${classNameToUse}`}>
            <div style={backgroundColorStyle} className={leftClassName} />
            <div style={backgroundColorStyle} className={rightClassName} />
        </button>
    )
})