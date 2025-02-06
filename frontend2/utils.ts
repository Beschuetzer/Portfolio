import { MOBILE_BREAK_POINT_WIDTH } from "./components/constants";

export function getIsMobile() {
  const hasTouchEvent =
    "ontouchstart" in window ||
    navigator?.maxTouchPoints > 0 ||
    (navigator as any)?.msMaxTouchPoints > 0;
  return hasTouchEvent && window.innerWidth <= MOBILE_BREAK_POINT_WIDTH;
}
