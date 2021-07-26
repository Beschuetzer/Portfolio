import React from "react";

export const AUDIO_PLAYER_CLASSNAME = "audio-player";

export interface AudioPlayerProps {
	
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ }) => {
	return (
		<div className={`${AUDIO_PLAYER_CLASSNAME}__details`}>
			<div className={`${AUDIO_PLAYER_CLASSNAME}__controls`}>
				<svg className={`${AUDIO_PLAYER_CLASSNAME}__play`}>
					<use xlinkHref="/sprite.svg#icon-play"></use>
				</svg>
				<svg className={`${AUDIO_PLAYER_CLASSNAME}__pause`}>
					<use xlinkHref="/sprite.svg#icon-pause"></use>
				</svg>
				<svg className={`${AUDIO_PLAYER_CLASSNAME}__stop`}>
					<use xlinkHref="/sprite.svg#icon-stop"></use>
				</svg>
				<svg className={`${AUDIO_PLAYER_CLASSNAME}__forward`}>
					<use xlinkHref="/sprite.svg#icon-forward"></use>
				</svg>
				<svg className={`${AUDIO_PLAYER_CLASSNAME}__backward`}>
					<use xlinkHref="/sprite.svg#icon-backward"></use>
				</svg>
			</div>
		</div>
	);
};

export default AudioPlayer;
