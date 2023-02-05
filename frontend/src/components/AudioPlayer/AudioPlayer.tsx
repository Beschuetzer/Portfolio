import { Howl } from "howler";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoadingSound, setCurrentlyPlayingSound } from "../../actions";
import { HIDDEN_CLASSNAME, TRANSFORM_NONE_CLASSNAME } from "../constants";
import { MaxCharCount, MAX_CHAR_COUNTS } from "../../types";
import {
	AudioItem,
	AUDIO_LIST_CLASSNAME,
	AUDIO_LIST_ITEM_CLASSNAME,
} from "./AudioList";
import { getMinuteAndSecondsString } from "./utils";
import { getMaxLengthString } from "../utils";
import { RootState } from "../../reducers";
import { useLocation } from "react-router-dom";

export const AUDIO_PLAYER_CLASSNAME = "audio-player";
export const AUDIO_PLAYER_TOGGLER_CLASSNAME = `${AUDIO_PLAYER_CLASSNAME}__toggler`;
export const AUDIO_PLAYER_TOGGLER_OPEN_CLASSNAME = `${AUDIO_PLAYER_TOGGLER_CLASSNAME}--open`;
export const AUDIO_PLAYER_FILL_COLOR_CLASSNAME = "fill-primary-3";

export type AudioPlayerAction = "add" | "remove" | "toggle";
export type AudioPlayerProps = {}
export type AudioPlayerState = {
	howls: Howl[] | null;
	playingHowl: Howl | null;
	currentlyPlayingSound: AudioItem;
	elapsed: string;
	songLength: string;
	songProgressPercent: number;
	shouldShowAudioPlayer: boolean;
	isOpen: boolean;
	isLoadingHowl: boolean;
}

export const AudioPlayer: FC<AudioPlayerProps> = () => {
	//#region Init
	const SEEK_AMOUNT = 10;
	const UPDATE_RATE = 125;
	const currentlyPlayingSound = useSelector((state: RootState) => state.sounds.currentlyPlayingSound);
	const isCurrentlyPlayingSoundValid = Object.keys(currentlyPlayingSound || {}).length > 0;
	const id = useRef(-1);
	const pauseRef = useRef<HTMLElement>(null);
	const playRef = useRef<HTMLElement>(null);
	const audioPlayerRef = useRef<HTMLElement>(null);
	const audioPlayerTogglerSvgRef = useRef<HTMLElement>(null);
	const songsOnPage = useRef<NodeListOf<Element> | null>(null);
	const updateInterval = useRef<any>(-1);
	const [hasShownPlayer, setHasShownPlayer] = useState(false);
	const [howls, setHowls] = useState<Howl[] | null>(null);
	const [playingHowl, setPlayingHowl] = useState<Howl | null>(null);
	const [elapsed, setElapsed] = useState("0");
	const [songLength, setSongLength] = useState("0");
	const [songProgressPercent, setSongProgressPercent] = useState(0);
	const [shouldShowAudioPlayer, setShouldShowAudioPlayer] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoadingHowl, setIsLoadingHowl] = useState(true);
	const [isPlayButtonVisible, setIsPlayButtonVisible] = useState(false);
	const dispatch = useDispatch();
	const location = useLocation();
	//#endregion
	
	//#region Functions/Handlers
	function getPlayingHowl() {
		if (!howls) return null;

		for (let i = 0; i < howls.length; i++) {
			const howl = howls[i];
			if (howl.playing()) return howl;
		}

		return null;
	}

	function getSeekToAmount(isForward = true) {
		if (!howls || !playingHowl) return;

		const sound = (playingHowl.pause() as any)._sounds[0];
		const currentSeek = sound._seek;
		const duration = playingHowl.duration();

		let seekTo = currentSeek + SEEK_AMOUNT;
		if (seekTo >= duration) {
			seekTo = duration;
		}

		if (!isForward) {
			seekTo = currentSeek - SEEK_AMOUNT;
			if (seekTo <= 0) seekTo = 0;
		}

		return seekTo;
	}

	function handleBackward() {
		if (!playingHowl) return;

		const seekToValue = getSeekToAmount(false);
		seekTo(seekToValue);
		handlePlay();
	}

	function handleForward() {
		if (!howls || !playingHowl) return;

		const seekToValue = getSeekToAmount();
		seekTo(seekToValue);
		handlePlay();
	}

	function handlePause() {
		if (!playingHowl) return;
		playingHowl.pause();

		showPlay();
	}

	function handlePlay() {
		if (!playingHowl) return;
		if (playingHowl.playing()) {
			return showPause();
		}

		showPause();

		id.current = playingHowl.play();
		setUpdateInterval();
	}

	function handleRestart() {
		if (!playingHowl) return;
		playingHowl.stop();
		handlePlay();
	}

	function handleSkipBackward(e: MouseEvent) {
		if (!howls || !playingHowl) return;
		loadNextSong(false);
	}

	function handleSkipForward(e: MouseEvent) {
		if (!howls || !playingHowl) return;
		loadNextSong(true);
	}

	function handleToggler(e: MouseEvent) {
		setShouldShowAudioPlayer(!shouldShowAudioPlayer);
		setIsOpen(!isOpen);
	}

	function handleWindowClick(e: MouseEvent) {
		//todo: need to re-do this
		const target = e.target as HTMLElement;
		if (!target) return;

		let targetIsAudioListItem = false;
		let parentIsAudioListItem = -1;

		const pathes = (e as any)?.path || [];
		for (let i = 0; i < pathes.length; i++) {
			const path = pathes[i] as HTMLElement;

			if (typeof path.className === "string") {
				if (path.className?.match(AUDIO_PLAYER_CLASSNAME)) return;
				targetIsAudioListItem = !!path.className?.match(
					AUDIO_LIST_ITEM_CLASSNAME,
				);
			}
		}

		if (!targetIsAudioListItem) {
			const audioListMatchRegExp = new RegExp(AUDIO_LIST_ITEM_CLASSNAME, "i");
			parentIsAudioListItem = (
				target.closest(`.${AUDIO_LIST_CLASSNAME}__item`) as HTMLElement
			)?.className.search(audioListMatchRegExp);
		}
	
		if (
			targetIsAudioListItem ||
			(parentIsAudioListItem !== undefined &&
				parentIsAudioListItem !== -1 &&
				shouldShowAudioPlayer)
		) {
			setIsOpen(true);
		}

		const audioPlayerExists = target.closest(AUDIO_PLAYER_CLASSNAME);
		if (
			!audioPlayerExists && isCurrentlyPlayingSoundValid
		) {
			setIsOpen(false);
		}
	}

	function getNextSong(isSkipForward = true) {
		const songsOnPageLocal = songsOnPage?.current || null;
		if (!songsOnPageLocal) return null;

		let currentIndex = -1;
		for (let i = 0; i < songsOnPageLocal?.length || 0; i++) {
			const element = songsOnPageLocal?.[i] as HTMLElement;
			const parsedItem = JSON.parse(
				element.dataset?.item as string,
			) as AudioItem;
			if (
				Object.values(parsedItem.path)[0] ===
				(playingHowl as any)._src
			) {
				currentIndex = i;
				break;
			}
		}

		let elementToUse;
		if (isSkipForward) {
			if (currentIndex >= songsOnPageLocal.length - 1)
				elementToUse = songsOnPageLocal[0];
			else elementToUse = songsOnPageLocal[currentIndex + 1];
		} else {
			if (currentIndex <= 0)
				elementToUse = songsOnPageLocal[songsOnPageLocal.length - 1];
			else elementToUse = songsOnPageLocal[currentIndex - 1];
		}

		return JSON.parse((elementToUse as HTMLElement)?.dataset?.item as string);
	}


	function handleAudioPlayerTogglerOpenClassname(action: AudioPlayerAction) {
		const audioPlayerToggler = audioPlayerTogglerSvgRef
			.current as HTMLElement;
		if (audioPlayerToggler) {
			switch (action) {
				case "add":
					audioPlayerToggler.classList.add(AUDIO_PLAYER_TOGGLER_OPEN_CLASSNAME);
					break;
				case "remove":
					audioPlayerToggler.classList.remove(
						AUDIO_PLAYER_TOGGLER_OPEN_CLASSNAME,
					);
					break;
				case "toggle":
					audioPlayerToggler.classList.toggle(
						AUDIO_PLAYER_TOGGLER_OPEN_CLASSNAME,
					);
					break;
			}
		}
	}

	function handleAudioPlayerTransformNoneClassname(action: AudioPlayerAction) {
		const audioPlayer = audioPlayerRef.current as HTMLElement;
		if (audioPlayer) {
			switch (action) {
				case "add":
					audioPlayer.classList.add(TRANSFORM_NONE_CLASSNAME);
					break;
				case "remove":
					audioPlayer.classList.remove(TRANSFORM_NONE_CLASSNAME);
					break;
				case "toggle":
					audioPlayer.classList.toggle(TRANSFORM_NONE_CLASSNAME);
					break;
			}
		}
	}

	function handleStop() {
		if (!playingHowl) return;
		playingHowl.stop();
		id.current = -1;
		showPlay();
	}

	function handleProgressBarClick(e: MouseEvent) {
		const percentBar = (e.target as HTMLElement).parentNode as HTMLElement;
		const percentBarBounds = percentBar.getBoundingClientRect();
		const left = percentBarBounds.left;
		const right = percentBarBounds.right;
		const percent = (e.clientX - left) / Math.abs(right - left);
		const duration = playingHowl?.duration();

		if (duration === undefined) return;

		seekTo(duration ? duration * percent : 0);
		handlePlay();
		setSongProgressPercent(percent);
	}

	function loadNextSong(isSkipForward = true) {
		handleStop();
		const nextSong = getNextSong(isSkipForward);
		dispatch(setIsLoadingSound(true));
		dispatch(setCurrentlyPlayingSound(nextSong));
	}

	function onSoundLoad(newHowl: Howl) {
		if (newHowl?.play) {
			id.current = newHowl.play();
		}

		let newHowls = [];
		if (howls) newHowls = [...howls, newHowl];
		else newHowls.push(newHowl);

		showPause();

		dispatch(setIsLoadingSound(false));

		setHowls(newHowls);
		setPlayingHowl(newHowl);
		setElapsed("0");
		setSongLength(getMinuteAndSecondsString(
			newHowl.duration() as unknown as number,
		));
		setIsLoadingHowl(false);
		setUpdateInterval(newHowl);
	}

	function seekTo(seekTo: number) {
		playingHowl?.seek(seekTo);
	}

	function setSeekAmount(howl?: Howl) {
		const howlToUse = playingHowl || howl;
		if (!howlToUse) return;
		const seek = howlToUse.seek() as number;
		const percent = seek / howlToUse.duration();
		setElapsed(getMinuteAndSecondsString(seek));
		setSongProgressPercent(percent);
	}
	
	function setUpdateInterval(howl?: Howl) {
		clearInterval(updateInterval.current);
		updateInterval.current = setInterval(() => {
			setSeekAmount(howl);
		}, UPDATE_RATE);
	};

	function showPlay() {
		setIsPlayButtonVisible(true);
	}

	function showPause() {
		setIsPlayButtonVisible(false);
	}
	//#endregion
	
	//#region Side FXs
	useEffect(() => {
		songsOnPage.current = document.querySelectorAll(
			`.${AUDIO_LIST_CLASSNAME}__item`,
		);
		window.addEventListener("click", handleWindowClick);
	
		return () => {
			playingHowl?.stop();
			window.removeEventListener("click", handleWindowClick);
			dispatch(setCurrentlyPlayingSound({} as AudioItem));
			dispatch(setIsLoadingSound(false));
		}
	}, [])

	//loading sound
	useEffect(() => {
		if (!isCurrentlyPlayingSoundValid) {
			return
		};
	 	//need to just play from beginning if clicking same song
		setIsLoadingHowl(true);
		const playingSoundPath = Object.values(
			currentlyPlayingSound?.path || {}
		)?.[0] as string || '';
		if (
			playingSoundPath !== undefined &&
			playingSoundPath === (playingHowl as any)?._src
		) {
			dispatch(setIsLoadingSound(false));
			return handleRestart();
		}

		if (!hasShownPlayer) {
			setHasShownPlayer(true);
		}

		const playingHowlLocal = getPlayingHowl();
		if (playingHowlLocal) playingHowlLocal.stop();
		if (!playingSoundPath) return;	
		const newHowl = new Howl({
			src: playingSoundPath,
			html5: true,
		});

		setPlayingHowl(newHowl);
		newHowl.once("load", onSoundLoad.bind(this, newHowl));
	}, [currentlyPlayingSound])
	//#endregion

	//#region JSX
	const openClassname = isOpen ? TRANSFORM_NONE_CLASSNAME : '';
	const showSvgClassname = hasShownPlayer ? '' : HIDDEN_CLASSNAME;
	return (
		<section
			ref={audioPlayerRef as any}
			className={`${AUDIO_PLAYER_CLASSNAME} ${openClassname}`}>
			<div className={`${AUDIO_PLAYER_CLASSNAME}__content`}>
				<div className={`${AUDIO_PLAYER_CLASSNAME}__details`}>
					{!!playingHowl ? (
						<div>
						{/* <span>Playing:&nbsp;</span> */}
						<span>
							<b>
								'
								{getMaxLengthString(currentlyPlayingSound.name, MAX_CHAR_COUNTS[MaxCharCount.song]())}
								'
							</b>
						</span>
					</div>
					) : null}
					<span className={`${AUDIO_PLAYER_CLASSNAME}__details-time`}>
						<span>{elapsed}</span>
						<span>&nbsp;/&nbsp;</span>
						<span>{songLength}</span>
					</span>
				</div>
				<div
					onClick={(e: any) => handleProgressBarClick(e)}
					className={`${AUDIO_PLAYER_CLASSNAME}__progress`}>
					<div
						style={{
							width: `${songProgressPercent * 100}%`,
						}}></div>
				</div>
				<div className={`${AUDIO_PLAYER_CLASSNAME}__controls`}>
					<div>
						{isPlayButtonVisible ? (
							<svg
								ref={playRef as any}
								onClick={(e: any) => handlePlay()}
								className={`${AUDIO_PLAYER_CLASSNAME}__play`}>
								<use xlinkHref="/sprite.svg#icon-play"></use>
							</svg>
						) : (
							<svg
								ref={pauseRef as any}
								onClick={(e: any) => handlePause()}
								className={`${AUDIO_PLAYER_CLASSNAME}__pause`}>
								<use xlinkHref="/sprite.svg#icon-pause"></use>
							</svg>
						)}
					</div>
					<svg
						onClick={(e: any) => handleStop()}
						className={`${AUDIO_PLAYER_CLASSNAME}__stop`}>
						<use xlinkHref="/sprite.svg#icon-stop"></use>
					</svg>
					<svg
						onClick={(e: any) => handleRestart()}
						className={`${AUDIO_PLAYER_CLASSNAME}__restart`}>
						<use xlinkHref="/sprite.svg#icon-restart"></use>
					</svg>
					<svg
						onClick={(e: any) => handleBackward()}
						className={`${AUDIO_PLAYER_CLASSNAME}__backward`}>
						<use xlinkHref="/sprite.svg#icon-backward"></use>
					</svg>
					<svg
						onClick={(e: any) => handleForward()}
						className={`${AUDIO_PLAYER_CLASSNAME}__forward`}>
						<use xlinkHref="/sprite.svg#icon-forward"></use>
					</svg>
					<svg
						onClick={(e: any) => handleSkipBackward(e)}
						className={`${AUDIO_PLAYER_CLASSNAME}__skip-backward`}>
						<use xlinkHref="/sprite.svg#icon-skip-backward"></use>
					</svg>
					<svg
						onClick={(e: any) => handleSkipForward(e)}
						className={`${AUDIO_PLAYER_CLASSNAME}__skip-forward`}>
						<use xlinkHref="/sprite.svg#icon-skip-forward"></use>
					</svg>
				</div>
			</div>
			<div
				id={`${AUDIO_PLAYER_TOGGLER_CLASSNAME}`}
				className={`${AUDIO_PLAYER_TOGGLER_CLASSNAME} ${showSvgClassname}`}>
				<svg
					className={`${
						shouldShowAudioPlayer
							? AUDIO_PLAYER_FILL_COLOR_CLASSNAME
							: ``
					} ${isOpen ? AUDIO_PLAYER_TOGGLER_OPEN_CLASSNAME : ""}`}
					ref={audioPlayerTogglerSvgRef as any}
					onClick={(e: any) => handleToggler(e)}>
					<use xlinkHref="/sprite.svg#icon-forward"></use>
				</svg>
			</div>
		</section>
	);
	//#endregion
}

