import { FC, useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { HIDDEN_CLASSNAME } from "../constants";

interface LoadingSpinnerProps {
	forceShow?: boolean;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
	forceShow = true,
}) => {
	const containerRef = useRef<HTMLElement>();
	const isLoadingSound = useSelector((state: RootState) => state.sounds.isLoadingSound);

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