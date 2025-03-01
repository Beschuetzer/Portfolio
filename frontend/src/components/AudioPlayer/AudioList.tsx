import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setIsLoadingSound, setCurrentlyPlayingSound, isLoadingSoundSelector } from "../../slices/soundsSlice";

export const AUDIO_LIST_CLASSNAME = "audio-list";
export const AUDIO_LIST_ITEM_CLASSNAME = `${AUDIO_LIST_CLASSNAME}__item`;

export interface AudioItem {
	path: any;
	name: string;
}

export interface AudioListProps {
	items: AudioItem[];
	className?: string;
}

export const AudioList: React.FC<AudioListProps> = ({ items, className}) => {
	const dispatch = useAppDispatch();
    const isLoadingSound = useAppSelector(isLoadingSoundSelector);

	function handleItemClick(e: Event) {
		if (isLoadingSound) return;
		const clickedItem = e.currentTarget as HTMLElement;
		if (!clickedItem?.dataset?.item) return;

		const parsedItem = JSON.parse(clickedItem?.dataset?.item as string);
		dispatch(setIsLoadingSound(true));
		dispatch(setCurrentlyPlayingSound(parsedItem));
	}

	function renderItems() {
		return items.map((item, index) => {
			return (
				<div
					key={index}
					onClick={(e: any) => handleItemClick(e)}
					className={AUDIO_LIST_ITEM_CLASSNAME}
					data-item={JSON.stringify(item)}
				>
				<span>{index + 1}).</span>
				<span>{item.name}</span>
				</div>
			);
		});
	}

	return (
		<div className={`${className ? className : ""} ${AUDIO_LIST_CLASSNAME}`}>
			{renderItems()}
		</div>
	);
};