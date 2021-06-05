import React from "react";
import Video from "./VideoPlayer/Video";

const CarouselItem = ({
	imageClassname,
	imgAlt,
  itemSrc,
	videoClassname,
	foregroundVideoClassname,
	onItemClick,

  videoType="mp4",
  videoAutoPlay={false},
  videoLoop={false},
}) => {
	let mediaToAdd = (
		<img
			src={itemSrc}
			className={`${imageClassname}`}
			alt={imgAlt}
			onClick={onItemClick}
		/>
	);

	if (itemSrc.match(/.+\.mp4$/i)) {
		mediaToAdd = (
			<React.Fragment>
				<Video
					type={videoType}
					src={itemSrc}
					autoPlay={videoAutoPlay}
					loop={videoLoop}
					className={`${videoClassname} ${foregroundVideoClassname}`}
					onClick={onItemClick}
					reference={videoRef}
					progressBarRef={progressBarRef}
					progressBarOnClick={handleProgressBarClick}
				/>
				;
				<svg className="carousel__video-svg">
					<use xlinkHref="/sprite.svg#icon-play"></use>
				</svg>
			</React.Fragment>
		);
	}

	return (
		<article key={index} className={ITEM_CLASSNAME}>
			{mediaToAdd}
			<p className={DESCRIPTION_CLASSNAME}>{alts[index]}</p>
			<PlayControl
				xlinkHref="/sprite.svg#icon-play"
				videoRef={videoRef}
				progressBarRef={progressBarRef}
			/>
			<StopControl xlinkHref="/sprite.svg#icon-stop" videoRef={videoRef} />

			<PauseControl xlinkHref="/sprite.svg#icon-pause" videoRef={videoRef} />

			<RestartControl
				xlinkHref="/sprite.svg#icon-restart"
				videoRef={videoRef}
				progressBarRef={progressBarRef}
			/>

			{/* <CloseControl
          xlinkHref="/sprite.svg#icon-close"
          videoRef={videoRef}
          classNamesToRemove={[
            "full-screen"
          ]}
        /> */}
		</article>
	);
};

export default CarouselItem;
