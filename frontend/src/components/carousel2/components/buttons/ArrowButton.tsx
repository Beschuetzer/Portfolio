import { forwardRef } from "react";
import { CLASSNAME__BUTTON } from "../../constants";
import { ArrowButtonDirection, ArrowProps, ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";
import { useBusinessLogic } from "../../hooks/useBusinessLogic";

type ArrowButtonProps = {
} & ButtonProps & ArrowProps;

export const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>((props, ref) => {
    const {
        className = CLASSNAME__BUTTON,
        fillColor,
        direction,
        onClick = () => null,
        childStyle = {},
        style = {},
    } = props;
    const { stylingLogic, optionsLogic } = useBusinessLogic();
    const classNameToUse = `${className}--arrow-${direction}`;
    const leftClassName = `${classNameToUse}-one`;
    const rightClassName = `${classNameToUse}-two`;
    const fillColorToUse = fillColor || optionsLogic.theme.colorOne;
    const colorStyle = StylingLogic.getColorStyle(fillColorToUse, 'backgroundColor', childStyle);
    const instanceWidth = parseInt(style.width as string, 10) || 0;
    const buttonName = direction === ArrowButtonDirection.next ? CarouselElement.arrowRight : CarouselElement.arrowLeft;

    return (
        <button
            style={{ ...style, ...stylingLogic.getCarouselElementSizeStlye(buttonName, instanceWidth) }}
            ref={ref}
            onClick={onClick}
            className={`${className} ${classNameToUse}`}
        >
            <div
                style={{ ...colorStyle, ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style, subElementName: 'first' }) }}
                className={leftClassName}
            />
            <div
                style={{ ...colorStyle, ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style, subElementName: 'second' }) }}
                className={rightClassName}
            />
        </button>
    )
})