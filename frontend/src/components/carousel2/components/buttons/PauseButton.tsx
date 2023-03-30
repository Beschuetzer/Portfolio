import { CLASSNAME__BUTTON } from "../../constants";

type PauseButtonProps = {
    classname?: string;
    onClick: () => void;
}

export const PauseButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: PauseButtonProps) => {
  return (
    <div onClick={onClick} className={classname}>
        <div className={`${classname}--pause-left` }/>
        <div className={`${classname}--pause-right` }/>
    </div>
  )
}