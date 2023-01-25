import React, { useEffect } from "react";
import { useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { HIDDEN_CLASSNAME } from "../constants";

interface LoadingSpinnerProps {
	isLoadingSound: boolean;
	forceShow?: boolean;
}

function LoadingSpinner({
	isLoadingSound = false,
	forceShow = true,
}) {
	const containerRef = useRef<HTMLElement>();

	useEffect(() => {
		if (forceShow) return;
		const container = (containerRef?.current as HTMLElement);
		if (!isLoadingSound)
			container.classList.add(HIDDEN_CLASSNAME);
		else container.classList.remove(HIDDEN_CLASSNAME);

	}, [isLoadingSound]);

	return (
		<div ref={containerRef as any} className="lds-spinner-container">
			<div className="lds-spinner">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoadingSound: state.sounds.isLoadingSound,
	};
};

export default connect(mapStateToProps, {})(LoadingSpinner);
