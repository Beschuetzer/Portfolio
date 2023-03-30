import { CLASSNAME__BUTTON } from "../../constants";

type CloseButtonProps = {
    classname?: string;
    onClick: () => void;
}

export const CloseButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: CloseButtonProps) => {
  return (
    <div onClick={onClick} className={classname}>
        <div className={`${classname}--close-left` }/>
        <div className={`${classname}--close-right` }/>
    </div>
  )
}