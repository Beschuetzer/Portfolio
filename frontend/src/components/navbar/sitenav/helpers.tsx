import { SCROLL_BAR_WIDTH_IN_REM, SECTION_WIDTH_IN_PIXELS, getFontSizeCustom, BUTTON_RADIUS } from "../../../styles/constants";

export function getAbsoluteLeftPosition() {
  return `calc(((calc(${
    window.innerWidth
  }px + ${SCROLL_BAR_WIDTH_IN_REM}rem) - ${SECTION_WIDTH_IN_PIXELS}px) / 4) - ${getFontSizeCustom(
    0.5,
    BUTTON_RADIUS
  )})`;
}

export function getAbsoluteRightPosition() {
  return `calc(((calc(${
    window.innerWidth
  }px - ${SCROLL_BAR_WIDTH_IN_REM}rem) - ${SECTION_WIDTH_IN_PIXELS}px) / 2 + ${SECTION_WIDTH_IN_PIXELS}px))`;
}