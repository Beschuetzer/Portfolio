import { forwardRef } from "react";
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type PreviousButtonProps = {} & ButtonProps;

export const PreviousButton = forwardRef<HTMLButtonElement, PreviousButtonProps>(({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}, ref) => {
  return (
    <button ref={ref} onClick={onClick} className={className}>
        <div className={`${className}--previous-left` }/>
        <div className={`${className}--previous-right` }/>
    </button>
  )
})