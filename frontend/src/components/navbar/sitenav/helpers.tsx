import {
  SCROLL_BAR_WIDTH_IN_REM,
  SECTION_WIDTH_IN_PIXELS,
  getFontSizeCustom,
  BUTTON_WIDTH,
} from "../../../styles/constants";

//create a capitalize function
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get the absolute left position of the site nav.
 * @returns The absolute left position as a string that can be used as the `left` css property.
 */
export function getAbsoluteLeftPosition() {
  return `calc(((calc(${
    window.innerWidth
  }px - ${SCROLL_BAR_WIDTH_IN_REM}rem) - ${SECTION_WIDTH_IN_PIXELS}px) / 4) - ${getFontSizeCustom(
    0.5,
    BUTTON_WIDTH
  )})`;
}

/**
 * Get the absolute right position of the site nav.
 * @returns The absolute right position as a string that can be used as the `left` css property.
 */
export function getAbsoluteRightPosition() {
  const columnWidth = `calc(calc(${window.innerWidth}px - ${SCROLL_BAR_WIDTH_IN_REM}rem - ${SECTION_WIDTH_IN_PIXELS}px) / 2)`;
  return `calc(${columnWidth} + ${SECTION_WIDTH_IN_PIXELS}px + calc(${columnWidth} / 2) - ${getFontSizeCustom(
    0.5,
    BUTTON_WIDTH
  )})`;
}

/**
 * Converts a hex color code to an rgba() string.
 * @param hex - The hex color code (e.g., "#ff5733").
 * @param opacity - The optional opacity value (0 to 1).
 * @returns The rgba() string.
 */
export function hexToRgba(hex = "#fff", opacity = 1): string {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the rgba string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
