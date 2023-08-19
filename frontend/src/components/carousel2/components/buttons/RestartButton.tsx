import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type RestartButtonProps = {} & ButtonProps;

export const RestartButton = ({
  childStyle = {},
  className = CLASSNAME__BUTTON,
  fillColor,
  onClick = () => null,
}: RestartButtonProps) => {
  //todo: if deciding to not use can delete this file and scss stuff
  //todo: would need to follow pattern in other buttons if using though and test
  // const colorStyle = optionsLogic.getButtonColorStyle(style, fillColor, CarouselButton.restartButton);
  // const fillColorToUse = fillColor || optionsLogic.theme.colorFive;
  const colorStyle = {}

  return (
    <button onClick={onClick} className={className}>
      <div style={colorStyle} className={`${className}--restart-circle-outer`} />
      <div style={colorStyle} className={`${className}--restart-circle-inner`} />
      <div style={colorStyle} className={`${className}--restart-triangle-cutout`} />
      <div style={colorStyle} className={`${className}--restart-arrow`} />
    </button>
  )
}