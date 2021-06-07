import React, { ReactChildren, RefObject } from "react";

export const FOREGROUND_VIDEO_CLASSNAME = 'fg-video';

interface VideoProps {
	className: string,
	src: string,
	type: string,
	autoPlay?: boolean,
	muted?: boolean,
	loop?: boolean,
	reference?: any,
	progressBarRef?: any,
	progressBarStartValue?: string,
	progressBarClassname?: string,
	progressBarOnClick?: (e: any) => void,
	onClick?: (e: any) => void,
	children?: any,
}

const Video: React.FC<VideoProps>  = ({
	className,
	src,
	type,
	autoPlay = true,
	muted = true,
	loop = true,
	reference = null,
	onClick = null,
	progressBarRef = null,
	progressBarOnClick = null,
	progressBarStartValue = "0",
	progressBarClassname = "card__progress",
	children,
}) => {

	return (
		<React.Fragment>
			<div className={className} onClick={onClick ? (e: any) => onClick(e) : undefined}>
				<video ref={reference} autoPlay={autoPlay} muted={muted} loop={loop}>
					<source src={src} type={`video/${type}`} />
				</video>
				{children ? (
					<div className={`${className}__children`}>
						{children}
					</div>
				) : null}
			</div>
			<progress
				onClick={progressBarOnClick ? (e: any) => progressBarOnClick(e) : undefined}
				ref={progressBarRef}
				value={progressBarStartValue}
				className={progressBarClassname}
			>
			</progress>
		</React.Fragment>
	);
}

export default Video;
