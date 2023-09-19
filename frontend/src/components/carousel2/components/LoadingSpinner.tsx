import { ReactNode, useCallback } from "react";
import { StylingLogic } from "../business-logic/StylingLogic";
import { useCarouselContext } from "../context";
import { CLASSNAME__LOADING_SPINNER } from "../constants";

export type LoadingSpinnerOptions = {
	/**
	*Changes both text and spinner color.
	**/
	color?: string;
	/**
	*The margin of the container.
	*Default is 8px;
	**/
	containerMargin?: number | string;
	/**
	*The length and width of the container.
	*Default is 100px;
	**/
	containerLength?: number;
	/**
	*How big the circle is.
	*Default is 64px;
	**/
	radius?: number;
	/**
	*Changes the spinner color.  Overrides any value for 'color'.
	**/
	spinnerColor?: string;
	/**
	*Changes text color.  Overrides any value for 'color'.
	**/
	textColor?: string;
	/**
	*How thick the line is.
	*Default is 8px;
	**/
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

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
	const {
		description = '',
		options = {},
		show = false,
		type = 'ring',
	} = props;
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
						<div className={`${CLASSNAME__LOADING_SPINNER}-roller`}>
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
						<div className={`${CLASSNAME__LOADING_SPINNER}-ring`} style={stylingLogic.carouselLoadingSpinnerRingContainerStyle}>
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
						<div style={stylingLogic.carouselLoadingSpinnerRingContainerStyle} className={`${CLASSNAME__LOADING_SPINNER}-circle`}>
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
						<div className={`${CLASSNAME__LOADING_SPINNER}-grid`}>
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
		<div className={`${CLASSNAME__LOADING_SPINNER}-container`}>
			{renderContent((
				<div style={stylingLogic.carouselLoadingSpinnerTextStyle} className={`${CLASSNAME__LOADING_SPINNER}-text`}>
					{description ? <h2>Loading '{description}'</h2> : null}
				</div>
			))}
		</div>
	);
}