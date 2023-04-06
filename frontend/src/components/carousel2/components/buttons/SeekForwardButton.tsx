import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type SeekForwardButtonProps = {} & ButtonProps;

export const SeekForwardButton = ({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}: SeekForwardButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
        <div className={`${className}--seek-forward-left` }/>
        <div className={`${className}--seek-forward-right` }/>
    </button>
  )
}