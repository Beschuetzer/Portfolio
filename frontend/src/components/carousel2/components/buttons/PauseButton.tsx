import { forwardRef } from 'react';
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type PauseButtonProps = {} & ButtonProps;

export const PauseButton = forwardRef<HTMLButtonElement, PauseButtonProps> (({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}, ref) => {
  return (
    <button ref={ref} onClick={onClick} className={className}>
        <div className={`${className}--pause-left` }/>
        <div className={`${className}--pause-right` }/>
    </button>
  )
})