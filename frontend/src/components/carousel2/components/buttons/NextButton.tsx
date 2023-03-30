import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type NextButtonProps = {} & ButtonProps;

export const NextButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: NextButtonProps) => {
  return (
    <button onClick={onClick} className={classname}>
        <div className={`${classname}--next-left` }/>
        <div className={`${classname}--next-right` }/>
    </button>
  )
}