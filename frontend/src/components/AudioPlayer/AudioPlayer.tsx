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
	seekAmount = 15;
	id: number;

	constructor(props: AudioPlayerProps) {
		super(props);
		this.id = -1;
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
		if (this.state?.howl?.play) this.id = this.state.howl.play();
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
			});

			this.setState({
				howl: newHowl,
				elapsed: 0,
				songLength: newHowl.duration as unknown as number,
				currentlyPlayingSound: nextProps.currentlyPlayingSound,
			});
		}
	}

	getSeekTo(isForward = true) {
		if(!this.state.howl) return;

		const sound = (this.state.howl.pause() as any)._sounds[0];
		const currentSeek = sound._seek;
		const duration = this.state.howl.duration();

		let seekTo = currentSeek + this.seekAmount;
		if (seekTo >= duration) {
			seekTo = duration;
		}

		if (!isForward) {
			seekTo = currentSeek - this.seekAmount;
			if (seekTo <= 0) seekTo = 0;
		}

		return seekTo;
	}

	handleBackward() {
		if (!this.state.howl) return;
		const seekTo = this.getSeekTo(false);
		this.state.howl.seek(seekTo, this.id);
		this.handlePlay();
	}

	handleForward() {
		if (!this.state.howl) return;
		const seekTo = this.getSeekTo();
		this.state.howl.seek(seekTo, this.id);
		this.handlePlay();
	}

	handleClose() {
		if (this.state.howl) this.state.howl.stop();
	}

	handlePause() {
		if (!this.state.howl) return;
		this.state.howl.pause();
	}

	handlePlay() {
		if (!this.state.howl) return;
		if (this.state.howl.playing()) return;
		this.id = this.state.howl.play();
	}

	handleRestart() {
		if (!this.state.howl) return;
		this.state.howl.stop();
		this.id = this.state.howl.play();
	}

	handleStop() {
		if (!this.state.howl) return;
		this.state.howl.stop();
		this.id = -1;
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
					<svg
						onClick={(e: any) => this.handlePlay()}
						className={`${AUDIO_PLAYER_CLASSNAME}__play`}>
						<use xlinkHref="/sprite.svg#icon-play"></use>
					</svg>
					<svg
						onClick={(e: any) => this.handlePause()}
						className={`${AUDIO_PLAYER_CLASSNAME}__pause`}>
						<use xlinkHref="/sprite.svg#icon-pause"></use>
					</svg>
					<svg
						onClick={(e: any) => this.handleStop()}
						className={`${AUDIO_PLAYER_CLASSNAME}__stop`}>
						<use xlinkHref="/sprite.svg#icon-stop"></use>
					</svg>
					<svg
						onClick={(e: any) => this.handleRestart()}
						className={`${AUDIO_PLAYER_CLASSNAME}__restart`}>
						<use xlinkHref="/sprite.svg#icon-restart"></use>
					</svg>
					<svg
						onClick={(e: any) => this.handleBackward()}
						className={`${AUDIO_PLAYER_CLASSNAME}__backward`}>
						<use xlinkHref="/sprite.svg#icon-backward"></use>
					</svg>
					<svg
						onClick={(e: any) => this.handleForward()}
						className={`${AUDIO_PLAYER_CLASSNAME}__forward`}>
						<use xlinkHref="/sprite.svg#icon-forward"></use>
					</svg>
					<svg
						onClick={(e: any) => this.handleClose()}
						className={`${AUDIO_PLAYER_CLASSNAME}__close`}>
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
