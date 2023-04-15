import { ReactNode } from "react";

type RingOptions = {
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
type LoadingSpinnerProps =  {
	type?: 'ring',
	options?: RingOptions;
} & LoadingSpinnerCommonProps | {
	type?: 'spinner',
	options?: {};
} & LoadingSpinnerCommonProps


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
			case "spinner":
				return (
					<div className="lds-roller-container">
						{content}
						<div className="lds-roller">
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
						</div>
					</div>
				);
			case "ring":
				const { radius, width, containerLength } = options as RingOptions;
				const isContainerLengthLessThanRadius = containerLength && containerLength <= (radius || RING_RADIUS_DEFAULT);
				const widthStyle = containerLength ? {
					width: containerLength,
					height: containerLength,
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
						<div className="lds-ring" style={widthStyle}>
							<div style={{...divRadiusStyle, ...divSizeStyle}}/>
							<div style={{...divRadiusStyle, ...divSizeStyle}}/>
							<div style={{...divRadiusStyle, ...divSizeStyle}}/>
							<div style={{...divRadiusStyle, ...divSizeStyle}}/>
						</div>
					</>
				);
		}
	}

	return renderContent((
		<div className="loading-container">
			{description ? <h2>Loading '{description}'</h2> : null}
		</div>
	))
}