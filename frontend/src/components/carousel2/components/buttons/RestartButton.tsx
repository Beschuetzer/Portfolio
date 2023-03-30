import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type RestartButtonProps = {} & ButtonProps;

export const RestartButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: RestartButtonProps) => {
  return (
    <button onClick={onClick} className={classname}>
        <div className={`${classname}--restart-circle-outer` }/>
        <div className={`${classname}--restart-circle-inner` }/>
        <div className={`${classname}--restart-triangle-cutout` }/>
        <div className={`${classname}--restart-arrow` }/>
    </button>
  )
}