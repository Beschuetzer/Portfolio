import { RefObject } from "react";
import { CAROUSEL_TRANSLATION_CSS_CLASSNAME } from "../../Carousel/util";
import { MOBILE_BREAK_POINT_WIDTH } from "../../constants";
import { NAVBAR_ACTIVE_CLASSNAME } from "../util";

const onBodyClick = (navRef: RefObject<HTMLElement>, e: Event) => {
  console.log('e =', e);
  const isNavClick = (e.target as any)?.classList?.contains(NAVBAR_ACTIVE_CLASSNAME)
    ? true
    : false;
  if (!isNavClick) {
    navRef?.current?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
  }
};

export const init = (navRef: RefObject<HTMLElement>, setHeaderHeight: (value: number) => void) => {
  document.body.addEventListener("click", onBodyClick.bind(null, navRef));

  setTimeout(() => {
    const headerHeight = (document
      .querySelector("#header") as HTMLElement)
      .getBoundingClientRect().height;
    setHeaderHeight(headerHeight);
  }, 100);
}

export const destroy = (navRef: RefObject<HTMLElement>) => {
  document.body.removeEventListener("click", onBodyClick.bind(null, navRef));
}

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

export const setBodyStyle = (currentUrl: string) => {
  console.log('123--------------')
    const setBodyStyle = (page: string) => {
      if (page === "") document.body.className = "body-background";
      else {
        document.body.className = `body-background ${page.slice(1)}-page`;
      }
    };

		if (!currentUrl) return;

		let docStyle = getComputedStyle(document.documentElement);
		const colorVarRoot = "--color-primary";
		const colorVarPages = [
			"",
			"/bridge",
			"/resume",
			"/downloader",
			"/playlist-syncer",
		];
		const colorVarNumbers = ["-1", "-2", "-3", "-4"];
		// const colorVarHSL = ['-h', '-s', '-l'];

		const lastIndexOfSlash = (currentUrl as any).lastIndexOf("/");
		const pageName = (currentUrl as any).slice(lastIndexOfSlash);
		const temp = colorVarPages.indexOf(pageName);
		const index = temp !== -1 ? temp : 0;
		setBodyStyle(colorVarPages[index]);
		const colorVarSuffix = colorVarPages[index].slice(1);

		for (let i = 0; i < colorVarNumbers.length; i++) {
			const colorVarNumber = colorVarNumbers[i];
			const colorVarToChange = `${colorVarRoot}${colorVarNumber}`;
			const colorVarTarget = `${colorVarRoot}${
				colorVarSuffix !== "" ? `-${colorVarSuffix}` : ""
			}${colorVarNumber}`;
			const targetValue = docStyle.getPropertyValue(colorVarTarget);
			document.documentElement.style.setProperty(colorVarToChange, targetValue);
		}
}

export const setHeaderHeightOnViewPortChange = (viewPortWidth: number, setHeaderHeight: (value: number) => void) => {
  const navbarContent = document.querySelector(".navbar__content") as HTMLElement;
  const header = document.querySelector(".header") as HTMLElement;
  const headerBoundingRect = header.getBoundingClientRect();

  let newTop = `calc(${headerBoundingRect.height}px)`;
  if (viewPortWidth > MOBILE_BREAK_POINT_WIDTH) {
    newTop = "auto";
  }
  navbarContent.style.top = newTop;

  const headerHeight = (document
    .querySelector("#header") as HTMLElement)
    .getBoundingClientRect().height;

  setHeaderHeight(headerHeight);
}

