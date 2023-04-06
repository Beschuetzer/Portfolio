import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type StopButtonProps = {} & ButtonProps;

export const StopButton = ({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}: StopButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
        <div className={`${className}--stop` }/>
    </button>
  )
}