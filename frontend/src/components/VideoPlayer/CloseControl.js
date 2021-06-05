import { connect } from "react-redux";
import { removeClassFromAllChildren } from "../helpers";

import { closeVideo } from "./utils";

const CloseControl = ({
	className = "card__close",
	xlinkHref,
	videoRef,
	containerRef = null,
	classNamesToRemove,
}) => {
	const handleCloseVideo = (e) => {
		e.stopPropagation();
		closeVideo(videoRef.current, containerRef.current);

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
	
})(CloseControl);
