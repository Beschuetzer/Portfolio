import { CLASSNAME__BUTTON } from "../../constants";

type StopButtonProps = {
    classname?: string;
    onClick: () => void;
}

export const StopButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: StopButtonProps) => {
  return (
    <div onClick={onClick} className={classname}>
        <div className={`${classname}--stop` }/>
    </div>
  )
}