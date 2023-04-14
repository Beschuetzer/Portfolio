import { forwardRef } from "react";
import { CLASSNAME__BUTTON, CLASSNAME__HIDDEN } from "../../constants";
import { ButtonProps } from "../../types";

type PreviousButtonProps = {
  showButton?: boolean;
} & ButtonProps;

export const PreviousButton = forwardRef<HTMLButtonElement, PreviousButtonProps>(({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
    showButton = true
}, ref) => {
  return (
    <button ref={ref} onClick={onClick} className={`${className}  ${showButton ? '' : CLASSNAME__HIDDEN}`}>
        <div className={`${className}--previous-left` }/>
        <div className={`${className}--previous-right` }/>
    </button>
  )
})