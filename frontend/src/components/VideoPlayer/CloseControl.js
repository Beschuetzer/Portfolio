import { connect } from "react-redux";

import { setIsCardVideoOpen } from "../../actions";
import { changeSectionTitle, closeVideo, removeClassFromAllChildren } from "../constants";

const CloseControl = ({
	className = "card__close",
	xlinkHref,
	videoRef,
	containerRef = null,
	titleRef = null,
	setIsCardVideoOpen,
	classNamesToRemove,
}) => {
	const handleCloseVideo = (e) => {
		e.stopPropagation();
		closeVideo(videoRef.current, containerRef.current);

		if (titleRef) {
			changeSectionTitle(titleRef, false);
			setIsCardVideoOpen(false);
		}

		if (containerRef && containerRef.current) {
			const container = containerRef.current;

			for (let i = 0; i < classNamesToRemove.length; i++) {
				const classNameToRemove = classNamesToRemove[i];
				container.classList.remove(classNameToRemove);
				removeClassFromAllChildren(container, classNameToRemove);
			}
		}
	};

	return (
		<div onClick={handleCloseVideo} className={`${className}-parent`}>
			<svg className={`${className}`}>
				<use xlinkHref={xlinkHref}></use>
			</svg>
		</div>
	);
};

export default connect(null, {
	setIsCardVideoOpen,
})(CloseControl);