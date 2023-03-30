import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type SeekForwardButtonProps = {} & ButtonProps;

export const SeekForwardButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: SeekForwardButtonProps) => {
  return (
    <button onClick={onClick} className={classname}>
        <div className={`${classname}--seek-forward-left` }/>
        <div className={`${classname}--seek-forward-right` }/>
    </button>
  )
}