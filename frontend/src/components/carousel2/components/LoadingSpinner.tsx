import { ReactNode, useCallback } from "react";
import { getClassname } from "../utils";
import { StylingLogic } from "../business-logic/StylingLogic";
import { useCarouselContext } from "../context";

export type LoadingSpinnerOptions = {
	/*
	*Changes both text and spinner color
	*/
	color?: string;
	/*
	*default is 8px; The margin of the container
	*/
	containerMargin?: number | string;
	/*
	*default is 100px; The length and width of the container
	*/
	containerLength?: number;
	/*
	*Default is 64px; How big the circle is
	*/
	radius?: number;
	/*
	*Changes the spinner color.  Overrides any value for 'color'.
	*/
	spinnerColor?: string;
	/*
	*Changes text color.  Overrides any value for 'color'.
	*/
	textColor?: string;
	/*
	*Default is 8px;  How thick the line is
	*/
	width?: number;
}

type LoadingSpinnerCommonProps = {
	description?: string;
	show?: boolean;
}
export type LoadingSpinnerProps = {
	type?: 'ring',
	options?: LoadingSpinnerOptions;
} & LoadingSpinnerCommonProps | {
	type?: 'roller',
	options?: {};
} & LoadingSpinnerCommonProps | {
	type?: 'circle',
	options?: LoadingSpinnerOptions;
} & LoadingSpinnerCommonProps | {
	type?: 'grid',
	options?: LoadingSpinnerOptions;
} & LoadingSpinnerCommonProps

const CLASSNAME__LOADING = getClassname({ elementName: 'loading' });
export const LoadingSpinner = ({
	description = '',
	options = {},
	show = false,
	type = 'ring',
}: LoadingSpinnerProps) => {
	//note: using useBusinessLogic here causes infinite re-render loop with videos
	const { options: carouselOptions } = useCarouselContext();
	const stylingLogic = new StylingLogic({ options: carouselOptions, loadingSpinnerOptions: options });

	const renderContent = useCallback((content: ReactNode | ReactNode[]) => {
		if (!show) return null;
		switch (type) {
			case "roller":
				return (
					<>
						{content}
						<div className={`${CLASSNAME__LOADING}-roller`}>
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
						</div>
					</>
				);
			case "ring":
				return (
					<>
						{content}
						<div className={`${CLASSNAME__LOADING}-ring`} style={stylingLogic.carouselLoadingSpinnerRingContainerStyle}>
							<div style={stylingLogic.carouselLoadingSpinnerRingItemStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerRingItemStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerRingItemStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerRingItemStyle} />
						</div>
					</>
				);
			case 'circle':
				return (
					<>
						{content}
						<div style={stylingLogic.carouselLoadingSpinnerRingContainerStyle} className={`${CLASSNAME__LOADING}-circle`}>
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
						</div>

					</>
				)
			case 'grid':
				return (
					<>
						{content}
						<div className={`${CLASSNAME__LOADING}-grid`}>
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
							<div style={stylingLogic.carouselLoadingSpinnerBackgroundColorStyle} />
						</div>
					</>
				)
		}
	}, [
		show,
		stylingLogic.carouselLoadingSpinnerBackgroundColorStyle,
		stylingLogic.carouselLoadingSpinnerRingContainerStyle,
		stylingLogic.carouselLoadingSpinnerRingItemStyle,
		type
	]);

	return (
		<div className={`${CLASSNAME__LOADING}-container`}>
			{renderContent((
				<div style={stylingLogic.carouselLoadingSpinnerTextStyle} className={`${CLASSNAME__LOADING}-text`}>
					{description ? <h2>Loading '{description}'</h2> : null}
				</div>
			))}
		</div>
	);
}