import { forwardRef } from 'react';
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type SeekForwardButtonProps = {} & ButtonProps;

export const SeekForwardButton = forwardRef<HTMLButtonElement, SeekForwardButtonProps> (({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}, ref) => {
  return (
    <button ref={ref} onClick={onClick} className={className}>
        <div className={`${className}--seek-forward-left` }/>
        <div className={`${className}--seek-forward-right` }/>
    </button>
  )
})