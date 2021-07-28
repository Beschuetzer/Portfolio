import React, { useEffect } from "react";
import { useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { HIDDEN_CLASSNAME } from "../constants";

interface LoadingSpinnerProps {
	isLoadingSound: boolean;
}

function LoadingSpinner(prop: LoadingSpinnerProps) {
	const containerRef = useRef<HTMLElement>();

	useEffect(() => {
		const container = (containerRef?.current as HTMLElement);
		if (!prop.isLoadingSound)
			container.classList.add(HIDDEN_CLASSNAME);
		else container.classList.remove(HIDDEN_CLASSNAME);

	}, [prop.isLoadingSound]);

	return (
		<div ref={containerRef as any} className="lds-spinner-container hidden">
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
