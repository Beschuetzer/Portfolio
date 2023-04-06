import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type PreviousButtonProps = {} & ButtonProps;

export const PreviousButton = ({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}: PreviousButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
        <div className={`${className}--previous-left` }/>
        <div className={`${className}--previous-right` }/>
    </button>
  )
}