import { Howl } from "howler";
import React from "react";
import soundsSpriteMp3 from "../../sounds/soundsSprite.mp3";



export const AUDIO_PLAYER_CLASSNAME = "audio-player";

export interface AudioItem {
	path: any;
	name: string;
}

export interface AudioPlayerProps {
	items: AudioItem[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ items }) => {
  console.log('items =', items);


	function renderItems() {
		return items.map((item) => {
			return <li>{`${item.path}, ${item.name}`}</li>;
		});
	}

 

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
