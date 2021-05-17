import React from 'react';
import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { 
  setLastSecondRowCardNumber,
  setBridgeCards,
  setIsCardVideoOpen,
  setCardToClose,
} from '../actions';

import {
	checkForParentOfType,
} from '../helpers';

import {
  CARD_DEFAULT_CLASSNAME, CARD_OPEN_CLASSNAME,
} from './constants';

//Responsible for changing transform origin on cards if the rows change due to viewport width
const CardManager = ({children, isMobile, viewPortWidth, lastSecondRowCardNumber, setLastSecondRowCardNumber, bridgeCards, setBridgeCards, isCardVideoOpen, setIsCardVideoOpen, setCardToClose}) => {

  const memoizedCheckForChanges = useCallback(() => {
    const getSecondRowStartCardNumber = () => {
      if (!bridgeCards) return;
      let cardNumberToReturn = -1;
      let previousTop = -1;
      for (let i = 0; i < bridgeCards.length; i++) {
        const card = bridgeCards[i];
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

    const secondRowCardNumber = getSecondRowStartCardNumber();
    if (secondRowCardNumber !== lastSecondRowCardNumber) {
      console.log('setting new card------------------------------------------------');
      setLastSecondRowCardNumber(secondRowCardNumber);
    }
  }, [lastSecondRowCardNumber, setLastSecondRowCardNumber, bridgeCards])

  //whenever lastSecondRowCardNumber changes, 
  useEffect(() => {
    const setTransformOrigins = () => {
      const rowLength = lastSecondRowCardNumber;
      const numberOfRows = Math.ceil(bridgeCards.length / rowLength);
      // console.log('');
      // console.log('lastSEcondRowCardNumber =', lastSecondRowCardNumber);
      // console.log('bridgeCards =', bridgeCards);
      // console.log('bridgeCards.length =', bridgeCards.length);
      // console.log('rowLength =', rowLength);
      // console.log('numberOfRows =', numberOfRows);
      // console.log('');

      const transformOriginOptions = {
        center: "center",
        top: "top",
        bottom: "bottom",
        left: "left",
        right: "right",
        topLeft: "top left",
        topRight: "top right",
        bottomLeft: "bottom left",
        bottomRight: "bottom right",
      }

      for (let i = 0; i < bridgeCards.length; i++) {
        // if (i === 0) debugger
        const card = bridgeCards[i];
        const isTopRow = i < lastSecondRowCardNumber;
        const isBottomRow = i > (rowLength * (numberOfRows - 1) - 1);
        const isFirstInRow = i === 0 || i % rowLength === 0;
        const isLastInRow = (i + 1) % rowLength  === 0;

        let transformOriginToUse = transformOriginOptions.topLeft;
        if (isTopRow) {
          //1st: top left
          //middle: top
          //last: top right
          if (numberOfRows > 2) {
            card.style.transformOrigin = transformOriginOptions.top;
            continue;
          }
          if (isFirstInRow) {
            transformOriginToUse = transformOriginOptions.topLeft;
          }
          else if (isLastInRow) transformOriginToUse = transformOriginOptions.topRight;
          else transformOriginToUse = transformOriginOptions.top;
        }

        else if (isBottomRow) {
          //1st: bottom left
          //middle: bottom
          //last: bottom right
          if (numberOfRows > 2) {
            card.style.transformOrigin = transformOriginOptions.bottom;
            continue;
          }
          if (isFirstInRow) transformOriginToUse = transformOriginOptions.bottomLeft;
          else if (isLastInRow) transformOriginToUse = transformOriginOptions.bottomRight;
          else transformOriginToUse = transformOriginOptions.bottom;
        }
        else {
        //middle rows:
          //1st: left
          //middle: top if middle row or above otherwise bottom
          //last: right    
          if (numberOfRows > 2) {
            card.style.transformOrigin = transformOriginOptions.center;
            continue;
          }
          if (isFirstInRow) transformOriginToUse = transformOriginOptions.left;
          else if (isLastInRow) transformOriginToUse = transformOriginOptions.right;
          else {           
            const middleRow = Math.ceil(numberOfRows / 2);
            const cutoffIndex = middleRow * rowLength - 1;

            if (i <= cutoffIndex) transformOriginToUse = transformOriginOptions.top;
            else transformOriginToUse = transformOriginOptions.bottom;          
          }
        }
      
        card.style.transformOrigin = transformOriginToUse;
      }
    }
    
    console.log('changing transform origins------------------------------------------------');
    if (!bridgeCards) return;
    setTransformOrigins();     
  }, [lastSecondRowCardNumber, bridgeCards])

  //Initial Load Check if need to change transform origins
  useEffect(() => {
    memoizedCheckForChanges();
  }, [memoizedCheckForChanges])

  useEffect(() => {
    setBridgeCards(document.querySelectorAll('.card'));
  }, [setBridgeCards])

  //check if need to change transform origins when viewPortWidth changes
  useEffect(() => {
    if (!isMobile) return;
    memoizedCheckForChanges();
  }, [viewPortWidth, isMobile, memoizedCheckForChanges])

  useEffect(() => {
		const handleClick = (e) => {
			if (!isCardVideoOpen) return;
			const isFgVideoClick = checkForParentOfType(e.target, 'video', 'fg-video');
			if (!isFgVideoClick) {
        let openCardAsNthCard = -1;
				const cards = document.querySelectorAll('.card');
				for (let i = 0; i < cards.length; i++) {
					const card = cards[i];
          if (!card) continue;
          if (card.classList.contains(CARD_OPEN_CLASSNAME)) {
            openCardAsNthCard = card
					  card.className = CARD_DEFAULT_CLASSNAME;
            break;
          }
				}
				setIsCardVideoOpen(false);
        setCardToClose(openCardAsNthCard)
			}
		}

		window.addEventListener('click', handleClick);

		return (() => {
			window.removeEventListener('click', handleClick);

		})
    //TODO: should be able to delete setCardToClose
	}, [isCardVideoOpen, setIsCardVideoOpen, setCardToClose])

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
    bridgeCards: state.bridge.bridgeCards,
    isCardVideoOpen: state.bridge.isCardVideoOpen,
  }
}

export default connect(mapStateToProps, {
  setLastSecondRowCardNumber,
  setBridgeCards,
  setIsCardVideoOpen,
  setCardToClose,
})(CardManager);