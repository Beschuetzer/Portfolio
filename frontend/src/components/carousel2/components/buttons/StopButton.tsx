import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type StopButtonProps = {} & ButtonProps;

export const StopButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: StopButtonProps) => {
  return (
    <button onClick={onClick} className={classname}>
        <div className={`${classname}--stop` }/>
    </button>
  )
}