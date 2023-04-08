import { forwardRef } from "react";
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type NextButtonProps = {} & ButtonProps;

export const NextButton = forwardRef<HTMLButtonElement, NextButtonProps>(({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}, ref) => {
  return (
    <button ref={ref} onClick={onClick} className={className}>
        <div className={`${className}--next-left` }/>
        <div className={`${className}--next-right` }/>
    </button>
  )
})