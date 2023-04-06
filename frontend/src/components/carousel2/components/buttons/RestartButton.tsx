import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type RestartButtonProps = {} & ButtonProps;

export const RestartButton = ({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}: RestartButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
        <div className={`${className}--restart-circle-outer` }/>
        <div className={`${className}--restart-circle-inner` }/>
        <div className={`${className}--restart-triangle-cutout` }/>
        <div className={`${className}--restart-arrow` }/>
    </button>
  )
}