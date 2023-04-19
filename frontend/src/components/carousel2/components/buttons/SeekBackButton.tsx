import { forwardRef } from 'react';
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type SeekBackButtonProps = {} & ButtonProps;

export const SeekBackButton = forwardRef<HTMLButtonElement, SeekBackButtonProps> (({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}, ref) => {
  return (
    <button ref={ref} onClick={onClick} className={className}>
        <div className={`${className}--seek-back-left` }/>
        <div className={`${className}--seek-back-right` }/>
    </button>
  )
})