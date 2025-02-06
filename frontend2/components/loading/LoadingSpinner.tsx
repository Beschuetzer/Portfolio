import { FC, useEffect } from "react";
import { useRef } from "react";
import { useAppSelector } from "../../hooks";
import { isLoadingSoundSelector } from "../../slices/soundsSlice";
import { HIDDEN_CLASSNAME } from "../constants";

interface LoadingSpinnerProps {
	forceShow?: boolean;
	text?: string[];
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = (props) => {
	const {
		forceShow = true,
		text,
	} = props;
	const containerRef = useRef<HTMLElement>();
	const isLoadingSound = useAppSelector(isLoadingSoundSelector);

	useEffect(() => {
		if (forceShow) return;
		const container = (containerRef?.current as HTMLElement);
		if (!isLoadingSound)
			container.classList.add(HIDDEN_CLASSNAME);
		else container.classList.remove(HIDDEN_CLASSNAME);

	}, [forceShow, isLoadingSound]);

	return (
		<div ref={containerRef as any} className="lds-spinner-container">
			<div className="text-container">
				{text && text.length > 0 ? (
					text.map((t, index) => <h3>{index === text.length - 1 ? `'${t}'...` : t}</h3>)
				) : null}
			</div>
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