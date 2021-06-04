import React from "react";

class Video extends React.Component {
	render() {
		const {
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
		} = this.props;
		return (
			<React.Fragment>
				<div className={className} onClick={onClick}>
					<video ref={reference} autoPlay={autoPlay} muted={muted} loop={loop}>
						<source src={src} type={`video/${type}`} />
					</video>
					{this.props.children ? (
						<div className={`${className}__children`}>
							{this.props.children}
						</div>
					) : null}
				</div>
				<progress
					onClick={progressBarOnClick}
					ref={progressBarRef}
					value={progressBarStartValue}
					className={progressBarClassname}
        >
        </progress>
			</React.Fragment>
		);
	}
}

export default Video;
