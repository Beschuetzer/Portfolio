import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type SeekBackButtonProps = {} & ButtonProps;

export const SeekBackButton = ({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}: SeekBackButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
        <div className={`${className}--seek-back-left` }/>
        <div className={`${className}--seek-back-right` }/>
    </button>
  )
}