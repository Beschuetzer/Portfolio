import { CLASSNAME__BUTTON } from "../../constants";

type RestartButtonProps = {
    classname?: string;
    onClick: () => void;
}

export const RestartButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: RestartButtonProps) => {
  return (
    <div onClick={onClick} className={classname}>
        <div className={`${classname}--restart-circle-outer` }/>
        <div className={`${classname}--restart-circle-inner` }/>
        <div className={`${classname}--restart-triangle-cutout` }/>
        <div className={`${classname}--restart-arrow` }/>
    </div>
  )
}