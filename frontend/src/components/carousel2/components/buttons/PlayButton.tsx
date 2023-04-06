import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";


type PlayButtonProps = {} & ButtonProps;

export const PlayButton = ({
    className = CLASSNAME__BUTTON,
    onClick = () => null,
}: PlayButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
        <div className={`${className}--play-triangle` }/>
    </button>
  )
}