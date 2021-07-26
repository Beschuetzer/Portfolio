import React from "react";
import { connect, RootStateOrAny } from 'react-redux';
import { setCurrentlyPlayingSound, setIsLoadingSound } from '../../actions';

export const AUDIO_LIST_CLASSNAME = "audio-list";

export interface AudioItem {
	path: any;
	name: string;
}

export interface AudioListProps {
	items: AudioItem[];
	className?: string;
  isLoadingSound: boolean;
  setCurrentlyPlayingSound: (sound: AudioItem) => void;
  setIsLoadingSound: (value: boolean) => void;
}

const AudioList: React.FC<AudioListProps> = ({ items, className, setCurrentlyPlayingSound, isLoadingSound, setIsLoadingSound}) => {
	function handleItemClick(e: Event) {
    console.log('isLoadingSound =', isLoadingSound);
    if (isLoadingSound) return;
    console.log('not loading------------------------------------------------');
    const clickedItem = e.currentTarget as HTMLElement;
    if (!clickedItem?.dataset?.item) return;

    const parsedItem = JSON.parse(clickedItem?.dataset?.item as string);
    setIsLoadingSound(true);
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
    isLoadingSound: state.sounds.isLoadingSound,
  }
}

export default connect(mapStateToProps, {
  setCurrentlyPlayingSound,
  setIsLoadingSound,
})(AudioList);
