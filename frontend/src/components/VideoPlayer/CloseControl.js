import React from 'react';
import { connect } from 'react-redux';

import { setIsCardVideoOpen } from '../../actions';
import { 
	CARD_DONE_CLASSNAME,
	CARD_STOPPED_CLASSNAME,
	changeSectionTitle,
	closeVideo,
} from "../constants";

const CloseControl = ({className, xlinkHref, videoRef, cardRef = null, titleRef = null, setIsCardVideoOpen}) => {
 
	const handleCloseVideo = (e) => {
		e.stopPropagation();
		closeVideo(videoRef.current, cardRef.current);
	};

  return (
    <div onClick={handleCloseVideo} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default connect(null, {
	setIsCardVideoOpen,
})(CloseControl);