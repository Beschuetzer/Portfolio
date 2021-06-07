import { CAROUSEL_TRANSLATION_CSS_CLASSNAME } from "../../Carousel/util";

export const changePage = (newUrl: string) => {
  //resetting Carousel scrolling
  const newValue = `${CAROUSEL_TRANSLATION_CSS_CLASSNAME}: 0px`;
  document.documentElement.style.cssText += newValue;

  const headerElement = document.querySelector("#header");
  const headerTogglerElement = document.querySelector(".header-toggler");
  if (!headerElement || !headerTogglerElement) return;
  if (newUrl === "/") {
    headerElement.classList.add("transparent");
    headerTogglerElement.classList.add("d-none");
  } else {
    headerElement.classList.remove("transparent");
    headerTogglerElement.classList.remove("d-none");
  }
}