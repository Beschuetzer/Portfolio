import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type NextButtonProps = {} & ButtonProps;

export const NextButton = ({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}: NextButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
        <div className={`${className}--next-left` }/>
        <div className={`${className}--next-right` }/>
    </button>
  )
}