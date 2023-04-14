import { forwardRef } from "react";
import { CLASSNAME__BUTTON, CLASSNAME__HIDDEN } from "../../constants";
import { ButtonProps } from "../../types";

type NextButtonProps = {
  showButton?: boolean;
} & ButtonProps;

export const NextButton = forwardRef<HTMLButtonElement, NextButtonProps>(({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
    showButton = true,
}, ref) => {
  return (
    <button ref={ref} onClick={onClick} className={`${className} ${showButton ? '' : CLASSNAME__HIDDEN}`}>
        <div className={`${className}--next-left` }/>
        <div className={`${className}--next-right` }/>
    </button>
  )
})