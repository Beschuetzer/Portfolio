import React from "react";
import { connect, RootStateOrAny } from 'react-redux';
import { setCurrentlyPlayingSound } from '../../actions';

export const AUDIO_LIST_CLASSNAME = "audio-list";

export interface AudioItem {
	path: any;
	name: string;
}

export interface AudioListProps {
	items: AudioItem[];
	className?: string;
  setCurrentlyPlayingSound: (sound: AudioItem) => void;
}

const AudioList: React.FC<AudioListProps> = ({ items, className, setCurrentlyPlayingSound}) => {
	function handleItemClick(e: Event) {
    const clickedItem = e.currentTarget as HTMLElement;
    if (!clickedItem?.dataset?.item) return;

    const parsedItem = JSON.parse(clickedItem?.dataset?.item as string);
    setCurrentlyPlayingSound(parsedItem);
	}

	function renderItems() {
		return items.map((item, index) => {
			return (
				<div
					key={index}
					onClick={(e: any) => handleItemClick(e)}
					className={`${AUDIO_LIST_CLASSNAME}__item`}
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

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    currentlyPlayingSound: state.sounds.currentlyPlayingSound,
  }
}

export default connect(mapStateToProps, {
  setCurrentlyPlayingSound,
})(AudioList);
