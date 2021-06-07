import { useEffect } from "react";
import { clickSkill } from "../../../actions";
import { MOBILE_BREAK_POINT_WIDTH } from "../../constants";

interface useSetHeaderHeightProps {
  viewPortWidth: number,
  setHeaderHeight: (value: number) => void,
}

const useSetHeaderHeight: React.FC<useSetHeaderHeightProps> = ({
  viewPortWidth,
  setHeaderHeight,
}) => {
  useEffect(() => {
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
	}, [viewPortWidth, setHeaderHeight]);
   
  return null;
}

export default useSetHeaderHeight;