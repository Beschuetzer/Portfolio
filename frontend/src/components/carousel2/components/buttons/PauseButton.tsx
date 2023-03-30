import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type PauseButtonProps = {} & ButtonProps;

export const PauseButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: PauseButtonProps) => {
  return (
    <button onClick={onClick} className={classname}>
        <div className={`${classname}--pause-left` }/>
        <div className={`${classname}--pause-right` }/>
    </button>
  )
}