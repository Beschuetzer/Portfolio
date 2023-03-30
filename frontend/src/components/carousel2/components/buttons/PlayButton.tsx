import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";


type PlayButtonProps = {} & ButtonProps;

export const PlayButton = ({
    classname = CLASSNAME__BUTTON,
    onClick = () => null,
}: PlayButtonProps) => {
  return (
    <button onClick={onClick} className={classname}>
        <div className={`${classname}--play-triangle` }/>
    </button>
  )
}