import { debug } from "console";
import { Howl } from "howler";
import React from "react";
import { connect, RootStateOrAny } from "react-redux";
import { setIsLoadingSound } from "../../actions";
import { AudioItem } from "./AudioList";
import { getMinuteAndSecondsString } from "./utils";

export const AUDIO_PLAYER_CLASSNAME = "audio-player";

export interface AudioPlayerProps {
	currentlyPlayingSound: AudioItem;
	setIsLoadingSound: (value: boolean) => void;
}

export interface AudioPlayerState {
	howls: Howl[] | null;
	playingHowl: Howl | null;
	currentlyPlayingSound: AudioItem;
	elapsed: string;
	songLength: string;
}

class AudioPlayer extends React.Component<AudioPlayerProps, AudioPlayerState> {
	seekAmount = 15;
	id: number;

	constructor(props: AudioPlayerProps) {
		super(props);
		this.id = -1;
		this.state = {
			howls: null,
			playingHowl: null,
			currentlyPlayingSound: {} as AudioItem,
			elapsed: "-1",
			songLength: "-1",
		};
	}

	componentDidMount() {}

	componentDidUpdate() {
		if (!this.props.currentlyPlayingSound?.path) return;
	}

	componentWillReceiveProps(nextProps: AudioPlayerProps) {
		//need to just play from beginning if clicking same song
		const playingSoundPath = Object.values(
			nextProps.currentlyPlayingSound?.path,
		)[0];
		if (
			playingSoundPath !== undefined &&
			playingSoundPath === (this.state.playingHowl as any)?._src
		) {
			this.props.setIsLoadingSound(false);
			return this.handleRestart();
		}

		if (nextProps.currentlyPlayingSound) {
			const playingHowl = this.getPlayingHowl();
			if (playingHowl) playingHowl.stop();

			const path = Object.values(
				nextProps.currentlyPlayingSound?.path,
			)[0] as string;

			if (!path) return;

			//need to see if sound is already loaded, if so play it, otherwise load
			const loadedHowl = this.getLoadedHowl(path);
			if (loadedHowl) {
				loadedHowl.play();
				this.props.setIsLoadingSound(false);
				return this.setState({
					playingHowl: loadedHowl,
				});
			}

			const newHowl = new Howl({
				src: path,
			});

			newHowl.once("load", this.onSoundLoad.bind(this, newHowl, nextProps));
		}
	}

	getLoadedHowl(path: string) {
		if (!this.state.howls) return null;

		let loadedSound = null;
		for (let i = 0; i < this.state.howls.length; i++) {
			const howl = this.state.howls[i];
			if ((howl as any)._src === path) return howl;
		}

		return loadedSound;
	}

	getPlayingHowl() {
		if (!this.state.howls) return null;

		let isSoundPlaying = null;
		for (let i = 0; i < this.state.howls.length; i++) {
			const howl = this.state.howls[i];
			if (howl.playing()) return howl;
		}

		return isSoundPlaying;
	}

	getSeekTo(isForward = true) {
		if (!this.state.howls || !this.state.playingHowl) return;

		const sound = (this.state.playingHowl.pause() as any)._sounds[0];
		const currentSeek = sound._seek;
		const duration = this.state.playingHowl.duration();

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
		if (!this.state.howls || !this.state.playingHowl) return;

		const seekTo = this.getSeekTo(false);
		this.state.playingHowl.seek(seekTo, this.id);
		this.handlePlay();
	}

	handleForward() {
		if (!this.state.howls || !this.state.playingHowl) return;

		const seekTo = this.getSeekTo();
		this.state.playingHowl.seek(seekTo, this.id);
		this.handlePlay();
	}

	handleClose() {
		if (this.state.playingHowl) this.state.playingHowl.stop();
	}

	handlePause() {
		if (!this.state.playingHowl) return;
		this.state.playingHowl.pause();
	}

	handlePlay() {
		if (!this.state.playingHowl) return;
		if (this.state.playingHowl.playing()) return;
		this.id = this.state.playingHowl.play();
	}

	handleRestart() {
		if (!this.state.playingHowl) return;
		this.state.playingHowl.stop();
		this.id = this.state.playingHowl.play();
	}

	handleStop() {
		if (!this.state.playingHowl) return;
		this.state.playingHowl.stop();
		this.id = -1;
	}

	handleProgressBarClick(e: MouseEvent) {
		const percentBar = e.target as HTMLElement;
		const max = percentBar.getBoundingClientRect().width;
		const percent = e.clientX / max;
		console.log("percent =", percent);
	}

	step = () => {
		if (!this.state?.playingHowl) return;
		const seek = (this.state.playingHowl.seek() || 0) as number;
		const percent =
			((seek / this.state.playingHowl.duration()) * 100 || 0) + "%";
		this.setState({ elapsed: getMinuteAndSecondsString(seek) });

		if (this.state.playingHowl.playing()) {
			requestAnimationFrame(this.step);
		}
	};

	onSoundLoad(newHowl: Howl, nextProps: AudioPlayerProps) {
		if (newHowl?.play) {
			this.id = newHowl.play();
			requestAnimationFrame(this.step);
		}

		let newHowls = [];
		if (this.state.howls) newHowls = [...this.state.howls, newHowl];
		else newHowls.push(newHowl);

		this.props.setIsLoadingSound(false);

		this.setState({
			howls: newHowls,
			playingHowl: newHowl,
			elapsed: "0",
			songLength: getMinuteAndSecondsString(
				newHowl.duration() as unknown as number,
			),
			currentlyPlayingSound: nextProps.currentlyPlayingSound,
		});
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

export default connect(mapStateToProps, { setIsLoadingSound })(AudioPlayer);
