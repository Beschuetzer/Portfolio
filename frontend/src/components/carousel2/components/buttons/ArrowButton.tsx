import { forwardRef } from "react";
import { CAROUSEL_COLOR_ONE, CLASSNAME__BUTTON } from "../../constants";
import { ArrowProps, ButtonProps } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";

type ArrowButtonProps = {
} & ButtonProps & ArrowProps;

export const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(({
    className = CLASSNAME__BUTTON,
    fillColor = CAROUSEL_COLOR_ONE,
    direction,
    onClick = () => null,
    childStyle = {},
}, ref) => {
    const classNameToUse = `${className}--arrow-${direction}`;
    const leftClassName = `${classNameToUse}-one`;
    const rightClassName = `${classNameToUse}-two`;
    const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'backgroundColor', childStyle);
    return (
        <button ref={ref} onClick={onClick} className={`${className} ${classNameToUse}`}>
            <div style={colorStyle} className={leftClassName} />
            <div style={colorStyle} className={rightClassName} />
        </button>
    )
})