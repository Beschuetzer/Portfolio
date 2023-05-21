import { forwardRef } from "react";
import { CAROUSEL_COLOR_ONE, CLASSNAME__BUTTON } from "../../constants";
import { ArrowButtonDirection, ArrowProps, ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";
import { useBusinessLogic } from "../../hooks/useBusinessLogic";

type ArrowButtonProps = {
} & ButtonProps & ArrowProps;

export const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(({
    className = CLASSNAME__BUTTON,
    fillColor = CAROUSEL_COLOR_ONE,
    direction,
    onClick = () => null,
    childStyle = {},
    style = {},
}, ref) => {
    const classNameToUse = `${className}--arrow-${direction}`;
    const leftClassName = `${classNameToUse}-one`;
    const rightClassName = `${classNameToUse}-two`;
    const { stylingLogic } = useBusinessLogic({});
    const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'backgroundColor', childStyle);
    const instanceWidth = parseInt(style.width as string, 10) || 0;
    const buttonName = direction === ArrowButtonDirection.next ? CarouselElement.arrowRight : CarouselElement.arrowLeft;

    return (
        <button
            style={{ ...style, ...stylingLogic.getCarouselButtonSizeStlye(buttonName, instanceWidth) }}
            ref={ref}
            onClick={onClick}
            className={`${className} ${classNameToUse}`}
        >
            <div
                style={{ ...colorStyle, ...stylingLogic.getToolbarButtonSizeStlye({ buttonName, style, subElementName: 'first' }) }}
                className={leftClassName}
            />
            <div
                style={{ ...colorStyle, ...stylingLogic.getToolbarButtonSizeStlye({ buttonName, style, subElementName: 'second' }) }}
                className={rightClassName}
            />
        </button>
    )
})