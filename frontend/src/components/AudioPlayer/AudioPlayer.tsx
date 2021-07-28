import { Howl } from "howler";
import React from "react";
import { RefObject } from "react";
import { createRef } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { setIsLoadingSound, setCurrentlyPlayingSound } from "../../actions";
import { HIDDEN_CLASSNAME, TRANSFORM_NONE_CLASSNAME } from "../constants";
import { AudioItem, AUDIO_LIST_CLASSNAME } from "./AudioList";
import { getMinuteAndSecondsString } from "./utils";

export const AUDIO_PLAYER_CLASSNAME = "audio-player";

export interface AudioPlayerProps {
	currentlyPlayingSound: AudioItem;
	setIsLoadingSound: (value: boolean) => void;
	setCurrentlyPlayingSound: (value: AudioItem) => void;
}

export interface AudioPlayerState {
	howls: Howl[] | null;
	playingHowl: Howl | null;
	currentlyPlayingSound: AudioItem;
	elapsed: string;
	songLength: string;
	songProgressPercent: number;
}

class AudioPlayer extends React.Component<AudioPlayerProps, AudioPlayerState> {
	seekAmount = 15;
	id: number;
	pauseRef: RefObject<HTMLElement>;
	playRef: RefObject<HTMLElement>;
	audioPlayerRef: RefObject<HTMLElement>;
	songsOnPage: NodeListOf<Element> | null;
	shouldShowAudioPlayer = true;

	constructor(props: AudioPlayerProps) {
		super(props);
		this.id = -1;
		this.state = {
			howls: null,
			playingHowl: null,
			currentlyPlayingSound: {} as AudioItem,
			elapsed: "-1",
			songLength: "-1",
			songProgressPercent: 0,
		};

		this.pauseRef = createRef();
		this.playRef = createRef();
		this.audioPlayerRef = createRef();
		this.songsOnPage = null;
	}

	componentDidMount() {
		const songsOnPage = document.querySelectorAll(
			`.${AUDIO_LIST_CLASSNAME}__item`,
		);
		this.songsOnPage = songsOnPage;
	}

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
			this.showAudioPlayer();

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
				html5: true,
			});

			newHowl.once("load", this.onSoundLoad.bind(this, newHowl, nextProps));
		}
	}

	componentWillUnmount() {
		this.state.playingHowl?.stop();
		this.setState = (state, callback) => {
			return;
		};
		this.props.setIsLoadingSound(false);
		this.props.setCurrentlyPlayingSound({} as AudioItem);
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
		this.seekTo(seekTo, this.id);
		this.handlePlay();
	}

	handleForward() {
		if (!this.state.howls || !this.state.playingHowl) return;

		const seekTo = this.getSeekTo();
		this.seekTo(seekTo, this.id);
		this.handlePlay();
	}

	handleToggler() {
		this.toggleAudioPlayer();
		this.shouldShowAudioPlayer = !this.shouldShowAudioPlayer;
	}

	handlePause() {
		if (!this.state.playingHowl) return;
		this.state.playingHowl.pause();

		this.showPlay();
		this.hidePause();
	}

	handlePlay() {
		if (!this.state.playingHowl) return;
		if (this.state.playingHowl.playing()) {
			this.hidePlay();
			return this.showPause();
		}

		this.hidePlay();
		this.showPause();

		this.id = this.state.playingHowl.play();
		requestAnimationFrame(this.step);
	}

	hidePause() {
		(this.pauseRef?.current as HTMLElement)?.classList.add(HIDDEN_CLASSNAME);
	}

	hidePlay() {
		(this.playRef?.current as HTMLElement)?.classList.add(HIDDEN_CLASSNAME);
	}

	handleRestart() {
		if (!this.state.playingHowl) return;
		this.state.playingHowl.stop();
		this.handlePlay();
	}

	handleSkipBackward(e: MouseEvent) {
		if (!this.state.howls || !this.state.playingHowl) return;
		this.loadNextSong(false);
	}

	handleSkipForward(e: MouseEvent) {
		if (!this.state.howls || !this.state.playingHowl) return;
		this.loadNextSong(true);
	}

	getNextSong(isSkipForward = true) {
		if (!this.songsOnPage) return null;

		let currentIndex = -1;
		for (let i = 0; i < this.songsOnPage.length; i++) {
			const element = this.songsOnPage[i] as HTMLElement;
			const parsedItem = JSON.parse(
				element.dataset?.item as string,
			) as AudioItem;
			if (
				Object.values(parsedItem.path)[0] ===
				(this.state.playingHowl as any)._src
			) {
				currentIndex = i;
				break;
			}
		}

		let elementToUse;
		if (isSkipForward) {
			if (currentIndex >= this.songsOnPage.length - 1)
				elementToUse = this.songsOnPage[0];
			else elementToUse = this.songsOnPage[currentIndex + 1];
		} else {
			if (currentIndex <= 0)
				elementToUse = this.songsOnPage[this.songsOnPage.length - 1];
			else elementToUse = this.songsOnPage[currentIndex - 1];
		}

		return JSON.parse((elementToUse as HTMLElement)?.dataset?.item as string);
	}

	handleStop() {
		if (!this.state.playingHowl) return;
		this.state.playingHowl.stop();
		this.id = -1;

		this.showPlay();
		this.hidePause();
	}

	handleProgressBarClick(e: MouseEvent) {
		const percentBar = (e.target as HTMLElement).parentNode as HTMLElement;
		const max = percentBar.getBoundingClientRect().width;
		const percent = e.clientX / max;
		const duration = this.state.playingHowl?.duration();

		if (!duration) return;

		this.seekTo(duration ? duration * percent : 0);
		this.handlePlay();
		this.setState({ songProgressPercent: percent });
	}

	hideAudioPlayer() {
		const audioPlayer = this.audioPlayerRef.current as HTMLElement;
		if (audioPlayer && this.shouldShowAudioPlayer) {
			audioPlayer.classList.add(HIDDEN_CLASSNAME);
			audioPlayer.classList.remove(TRANSFORM_NONE_CLASSNAME);
		}
	}

	loadNextSong(isSkipForward = true) {
		this.handleStop();
		const nextSong = this.getNextSong(isSkipForward);
		this.props.setIsLoadingSound(true);
		this.props.setCurrentlyPlayingSound(nextSong);
	}

	onSoundLoad(newHowl: Howl, nextProps: AudioPlayerProps) {
		if (newHowl?.play) {
			this.id = newHowl.play();
			requestAnimationFrame(this.step);
		}

		let newHowls = [];
		if (this.state.howls) newHowls = [...this.state.howls, newHowl];
		else newHowls.push(newHowl);

		this.hidePlay();
		this.showPause();

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

	seekTo(seekTo: number, id?: number) {
		this.state.playingHowl?.seek(seekTo);
	}

	showAudioPlayer() {
		const audioPlayer = this.audioPlayerRef.current as HTMLElement;
		if (audioPlayer && this.shouldShowAudioPlayer) {
			audioPlayer.classList.remove(HIDDEN_CLASSNAME);
			audioPlayer.classList.add(TRANSFORM_NONE_CLASSNAME);
		}
	}

	showPlay() {
		(this.playRef?.current as HTMLElement)?.classList.remove(HIDDEN_CLASSNAME);
	}

	showPause() {
		(this.pauseRef?.current as HTMLElement)?.classList.remove(HIDDEN_CLASSNAME);
	}

	step = () => {
		if (!this.state?.playingHowl) return;
		const seek = (this.state.playingHowl.seek() || 0) as number;
		const percent = seek / this.state.playingHowl.duration() || 0;
		this.setState({
			elapsed: getMinuteAndSecondsString(seek),
			songProgressPercent: percent,
		});

		if (this.state.playingHowl.playing()) {
			requestAnimationFrame(this.step);
		}
	};

	toggleAudioPlayer() {
		const audioPlayer = this.audioPlayerRef.current as HTMLElement;
		audioPlayer.classList.toggle(HIDDEN_CLASSNAME);
		audioPlayer.classList.toggle(TRANSFORM_NONE_CLASSNAME);
	}

	updateElapsedTime(e: Event) {}

	render() {
		return (
			<React.Fragment>
				<div className={`${AUDIO_PLAYER_CLASSNAME}__toggler`}>
					<svg onClick={(e: any) => this.handleToggler()}>
						<use xlinkHref="/sprite.svg#icon-forward"></use>
					</svg>
				</div>
				<section
					ref={this.audioPlayerRef}
					className={`${AUDIO_PLAYER_CLASSNAME} ${HIDDEN_CLASSNAME}`}>
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
						className={`${AUDIO_PLAYER_CLASSNAME}__progress`}>
						<div style={{ width: `${this.state.songProgressPercent * 100}%` }}>
							&nbsp;
						</div>
					</div>
					<div className={`${AUDIO_PLAYER_CLASSNAME}__controls`}>
						<div>
							<svg
								ref={this.playRef as any}
								onClick={(e: any) => this.handlePlay()}
								className={`${AUDIO_PLAYER_CLASSNAME}__play`}>
								<use xlinkHref="/sprite.svg#icon-play"></use>
							</svg>
							<svg
								ref={this.pauseRef as any}
								onClick={(e: any) => this.handlePause()}
								className={`${AUDIO_PLAYER_CLASSNAME}__pause hidden`}>
								<use xlinkHref="/sprite.svg#icon-pause"></use>
							</svg>
						</div>
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
							onClick={(e: any) => this.handleSkipBackward(e)}
							className={`${AUDIO_PLAYER_CLASSNAME}__skip-backward`}>
							<use xlinkHref="/sprite.svg#icon-skip-backward"></use>
						</svg>
						<svg
							onClick={(e: any) => this.handleSkipForward(e)}
							className={`${AUDIO_PLAYER_CLASSNAME}__skip-forward`}>
							<use xlinkHref="/sprite.svg#icon-skip-forward"></use>
						</svg>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		currentlyPlayingSound: state.sounds.currentlyPlayingSound,
	};
};

export default connect(mapStateToProps, {
	setIsLoadingSound,
	setCurrentlyPlayingSound,
})(AudioPlayer as any);
