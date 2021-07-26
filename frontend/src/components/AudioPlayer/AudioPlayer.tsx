import { Howl } from "howler";
import React, { useEffect } from "react";
import { RefObject } from "react";
import { useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { AudioItem } from "./AudioList";

export const AUDIO_PLAYER_CLASSNAME = "audio-player";

export interface AudioPlayerProps {
	currentlyPlayingSound: AudioItem;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentlyPlayingSound }) => {
	const howl: any = useRef<Howl | undefined>();

	useEffect(() => {
		if (!currentlyPlayingSound?.path) return;
		const path = Object.values(currentlyPlayingSound?.path)[0] as string;
		if (!path || !howl) return;

		if (howl.current?.stop) howl.current.stop();
		howl.current = new Howl({
			src: path,
		});

		howl.current.play();
	}, [currentlyPlayingSound]);

	function handleProgressBarClick(e: MouseEvent) {
		const percentBar = e.target as HTMLElement;
		const max = percentBar.getBoundingClientRect().width;
		const percent = e.clientX / max;
		console.log("percent =", percent);
	}

	return (
		<section className={`${AUDIO_PLAYER_CLASSNAME}`}>
			<div className={`${AUDIO_PLAYER_CLASSNAME}__details`}>
				<span>{currentlyPlayingSound ? currentlyPlayingSound.name : null}</span>
			</div>

			<div
				onClick={(e: any) => handleProgressBarClick(e)}
				className={`${AUDIO_PLAYER_CLASSNAME}__progress`}></div>
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
				<svg className={`${AUDIO_PLAYER_CLASSNAME}__restart`}>
					<use xlinkHref="/sprite.svg#icon-restart"></use>
				</svg>
				<svg className={`${AUDIO_PLAYER_CLASSNAME}__backward`}>
					<use xlinkHref="/sprite.svg#icon-backward"></use>
				</svg>
				<svg className={`${AUDIO_PLAYER_CLASSNAME}__forward`}>
					<use xlinkHref="/sprite.svg#icon-forward"></use>
				</svg>
				<svg className={`${AUDIO_PLAYER_CLASSNAME}__close`}>
					<use xlinkHref="/sprite.svg#icon-close"></use>
				</svg>
			</div>
		</section>
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		currentlyPlayingSound: state.sounds.currentlyPlayingSound,
	};
};

export default connect(mapStateToProps, {})(AudioPlayer);
