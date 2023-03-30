import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type SeekBackButtonProps = {} & ButtonProps;

export const SeekBackButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: SeekBackButtonProps) => {
  return (
    <button onClick={onClick} className={classname}>
        <div className={`${classname}--seek-back-left` }/>
        <div className={`${classname}--seek-back-right` }/>
    </button>
  )
}