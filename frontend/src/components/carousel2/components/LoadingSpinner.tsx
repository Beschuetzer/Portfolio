import { ReactNode } from "react";
import { getClassname } from "../utils";

type RingOptions = {
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
	*Default is 8px;  How thick the line is
	*/
	width?: number;
}

type LoadingSpinnerCommonProps = {
	description?: string;
	show?: boolean;
}
type LoadingSpinnerProps = {
	type?: 'ring',
	options?: RingOptions;
} & LoadingSpinnerCommonProps | {
	type?: 'roller',
	options?: {};
} & LoadingSpinnerCommonProps

const CLASSNAME__LOADING = getClassname({ elementName: 'loading' });
const RING_RADIUS_DEFAULT = 64;
export const LoadingSpinner = ({
	description = '',
	options = {},
	show = false,
	type = 'ring',
}: LoadingSpinnerProps) => {

	function renderContent(content: ReactNode | ReactNode[]) {
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
				const { radius, width, containerLength, containerMargin } = options as RingOptions;
				const isContainerLengthLessThanRadius = containerLength && containerLength <= (radius || RING_RADIUS_DEFAULT);
				const widthStyle = containerLength ? {
					width: containerLength,
					height: containerLength,
				} as React.CSSProperties : {}
				const marginStyle = containerMargin ? {
					margin: containerMargin,
				} as React.CSSProperties : {}
				const divRadiusStyle = radius || isContainerLengthLessThanRadius ? {
					width: Math.min((radius || Number.MAX_SAFE_INTEGER), containerLength || Number.MAX_SAFE_INTEGER),
					height: Math.min(radius || Number.MAX_SAFE_INTEGER, containerLength || Number.MAX_SAFE_INTEGER),
				} as React.CSSProperties : {}
				const divSizeStyle = width || containerLength ? {
					margin: width ? width : isContainerLengthLessThanRadius ? containerLength / 4 : 4,
					border: `${width ? width : isContainerLengthLessThanRadius ? containerLength / 4 : 4}px solid #fff`,
					borderTopColor: `#fff`,
					borderRightColor: `transparent`,
					borderBottomColor: `transparent`,
					borderLeftColor: `transparent`,
				} as React.CSSProperties : {}
				return (
					<>
						{content}
						<div className={`${CLASSNAME__LOADING}-ring`} style={{ ...widthStyle, ...marginStyle }}>
							<div style={{ ...divRadiusStyle, ...divSizeStyle }} />
							<div style={{ ...divRadiusStyle, ...divSizeStyle }} />
							<div style={{ ...divRadiusStyle, ...divSizeStyle }} />
							<div style={{ ...divRadiusStyle, ...divSizeStyle }} />
						</div>
					</>
				);
		}
	}

	return (
		<div className={`${CLASSNAME__LOADING}-container`}>
			{renderContent((
				<div className={`${CLASSNAME__LOADING}-text`}>
					{description ? <h2>Loading '{description}'</h2> : null}
				</div>
			))}
		</div>
	);
}