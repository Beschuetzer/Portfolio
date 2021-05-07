import React from 'react';
import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { setLastSecondRowCardNumber } from '../actions';

//Responsible for changing transform origin on cards if the rows change due to viewport width
const CardManager = ({children, isMobile, viewPortWidth, lastSecondRowCardNumber, setLastSecondRowCardNumber}) => {

  const memoizedCheckForChanges = useCallback(() => {
    const checkForChanges = () => {
      const cards = document.querySelectorAll('.card');
      const secondRowCardNumber = getSecondRowStartCardNumber(cards);
  
      if (secondRowCardNumber !== lastSecondRowCardNumber) {
        console.log('setting new card------------------------------------------------');
        setLastSecondRowCardNumber(secondRowCardNumber);
      }
    }
    checkForChanges();
  }, [lastSecondRowCardNumber, setLastSecondRowCardNumber])


//Initial Load Check if need to change transform origins
  useEffect(() => {
    console.log('initial load------------------------------------------------');
    memoizedCheckForChanges();
  }, [memoizedCheckForChanges])

  useEffect(() => {
    console.log('view port change------------------------------------------------');
    if (!isMobile) return;
    memoizedCheckForChanges();
    console.log('is mobile------------------------------------------------');
  }, [viewPortWidth, isMobile, memoizedCheckForChanges])

  

  const getSecondRowStartCardNumber = (cards) => {
		if (!cards) return;
		let cardNumberToReturn = -1;
		let previousTop = -1;
		for (let i = 0; i < cards.length; i++) {
			const card = cards[i];
			const currentTop = card.getBoundingClientRect().top;
      // console.log('previousTop =', previousTop);
      // console.log('currentTop =', currentTop);
			if (previousTop === -1) {
        previousTop = currentTop;
        continue
      }
      if ( previousTop !== currentTop) return i;
			// console.log('card =', card);
		}

		return cardNumberToReturn
	}

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    viewPortWidth: state.general.viewPortWidth,
    isMobile: state.general.isMobile,
    lastSecondRowCardNumber: state.bridge.lastSecondRowCardNumber,
  }
}

export default connect(mapStateToProps, {
  setLastSecondRowCardNumber,
})(CardManager);