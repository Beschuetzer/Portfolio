import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type PauseButtonProps = {} & ButtonProps;

export const PauseButton = ({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}: PauseButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
        <div className={`${className}--pause-left` }/>
        <div className={`${className}--pause-right` }/>
    </button>
  )
}