import React from "react";
import { AUDIO_PLAYER_CLASSNAME } from "./AudioPlayer";

export interface AudioItem {
	path: any;
	name: string;
}

export interface AudioListProps {
	items: AudioItem[];
	className?: string;
}

const AudioList: React.FC<AudioListProps> = ({ items, className }) => {
	function handleItemClick(e: Event) {
		console.log("item click------------------------------------------------");
		console.log("e =", e);
    const clickedItem = e.target as HTMLElement;
    if (!clickedItem) return;

    const parsedItem = JSON.parse(clickedItem?.dataset?.item as string);
    debugger
	}

	function renderItems() {
		return items.map((item, index) => {
			return (
				<li
					key={index}
					onClick={(e: any) => handleItemClick(e)}
					className={`${AUDIO_PLAYER_CLASSNAME}__item`}
          data-item={JSON.stringify(item)}
        >
          {`${JSON.stringify(item.path)}, ${item.name}`}
        </li>
			);
		});
	}

	return (
		<ul className={`${className ? className : ""} ${AUDIO_PLAYER_CLASSNAME}`}>
			{renderItems()}
		</ul>
	);
};

export default AudioList;
