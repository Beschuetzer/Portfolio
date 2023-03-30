import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type PreviousButtonProps = {} & ButtonProps;

export const PreviousButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: PreviousButtonProps) => {
  return (
    <button onClick={onClick} className={classname}>
        <div className={`${classname}--previous-left` }/>
        <div className={`${classname}--previous-right` }/>
    </button>
  )
}