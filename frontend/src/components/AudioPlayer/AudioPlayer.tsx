import { Howl } from "howler";
import React from "react";
import { connect, RootStateOrAny } from "react-redux";
import { AudioItem } from "./AudioList";

export const AUDIO_PLAYER_CLASSNAME = "audio-player";

export interface AudioPlayerProps {
	currentlyPlayingSound: AudioItem;
}

export interface AudioPlayerState {
	howl: Howl | null;
	currentlyPlayingSound: AudioItem;
	elapsed: number;
	songLength: number;
}

class AudioPlayer extends React.Component<AudioPlayerProps, AudioPlayerState> {
	constructor(props: AudioPlayerProps) {
		super(props);
		this.state = {
			howl: null,
			currentlyPlayingSound: {} as AudioItem,
			elapsed: -1,
			songLength: -1,
		};
	}

	componentDidMount() {}

	componentDidUpdate() {
		if (!this.props.currentlyPlayingSound?.path) return;
		if (this.state?.howl?.play) this.state.howl.play();
	}

	componentWillReceiveProps(nextProps: AudioPlayerProps) {
		if (nextProps.currentlyPlayingSound) {
			const path = Object.values(
				nextProps.currentlyPlayingSound?.path,
			)[0] as string;

			if (!path) return;

			if (this.state.howl?.stop) this.state.howl.stop();

			const newHowl = new Howl({
				src: path,
			})
	
			this.setState(
				{
					howl: newHowl,
					elapsed: 0,
					songLength: newHowl.duration as unknown as number,  
					currentlyPlayingSound: nextProps.currentlyPlayingSound,
				}
			);
		}
	}

	handleProgressBarClick(e: MouseEvent) {
		const percentBar = e.target as HTMLElement;
		const max = percentBar.getBoundingClientRect().width;
		const percent = e.clientX / max;
		console.log("percent =", percent);
	}

	updateElapsedTime(e: Event) {}

	render() {
		return (
			<section className={`${AUDIO_PLAYER_CLASSNAME}`}>
				<div className={`${AUDIO_PLAYER_CLASSNAME}__details`}>
					<span>Playing:&nbsp;</span>
					<span>
						<b>
							'
							{this.props.currentlyPlayingSound
								? this.props.currentlyPlayingSound.name
								: null}
							'
						</b>
					</span>
					<span className={`${AUDIO_PLAYER_CLASSNAME}__details-time`}>
						<span>{this.state.elapsed}</span>
						<span>&nbsp;/&nbsp;</span>
						<span>{this.state.songLength}</span>
					</span>
				</div>

				<div
					onClick={(e: any) => this.handleProgressBarClick(e)}
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
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		currentlyPlayingSound: state.sounds.currentlyPlayingSound,
	};
};

export default connect(mapStateToProps, {})(AudioPlayer);
