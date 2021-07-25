import React from "react";

export const AUDIO_PLAYER_CLASSNAME = "audio-player";

export interface AudioItem {
	path: any;
	name: string;
}

export interface AudioPlayerProps {
	items: AudioItem[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ items }) => {
	function renderItems() {
		return items.map((item) => {
			return <li>{`${item.path}, ${item.name}`}</li>;
		});
	}

  // <input type="button" value="PLAY" onclick="play()"/>
  // <audio controls id='audio'>
  //   <source src="horse.ogg" type="audio/ogg">
  //   <source src="horse.mp3" type="audio/mpeg">
  //   Your browser does not support the audio element.
  // </audio>

	return (
		<ul className={AUDIO_PLAYER_CLASSNAME}>
			{renderItems()}
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
		</ul>
	);
};

export default AudioPlayer;
