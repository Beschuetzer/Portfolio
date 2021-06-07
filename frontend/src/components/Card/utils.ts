import { RefObject } from "react";
import { BRIDGE_SECTION_TITLES_CLASSNAME } from "../../pages/examples/bridge/utils";
import { MOBILE_BREAK_POINT_WIDTH } from "../constants";

export const CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION =  75;
export const CARD_DONE_CLASSNAME = 'card--done';
export const CARD_STOPPED_CLASSNAME = 'card--stopped';
export const CARD_OPEN_CLASSNAME = 'card--open';
export const CARD_PLAYING_CLASSNAME = 'card--playing';
export const CARD_DEFAULT_CLASSNAME = 'card card--hoverable';

export const changeSectionTitle = (titleRef: RefObject<HTMLElement> | HTMLElement, isOpen = true) => {
  if (!titleRef) return;
  const originalMsgTitle = 'Features';
  const originalMsgSubTitle = 'Pick a Card any Card';

  const sections = document.querySelectorAll('.bridge__section');
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section.id.match(/feature/i)) {
      const title = section.querySelector('.bridge__section-title');

      let msgTitleToUse = originalMsgTitle as string | null | undefined;
      let msgSubTitleToUse = originalMsgSubTitle;
      if (isOpen) {
        if (titleRef && (titleRef as any).current) msgTitleToUse = (titleRef as any).current?.textContent;
        msgSubTitleToUse = "";
      }
      if (title) {
        title.textContent  = msgTitleToUse as string;
        (title.nextElementSibling as any).textContent = msgSubTitleToUse;
      }
      break;
    }
  }
}	

export const getFeaturesBridgeSectionTitles = (bridgeSections: string[]) => {
  const features = document.querySelector(
    `#${(bridgeSections as any)[1]?.toLowerCase()}`,
  ) as HTMLElement;
  return features.querySelector(`.${BRIDGE_SECTION_TITLES_CLASSNAME}`);
};

export const getGapAmount = (
  video: HTMLVideoElement,
  bridgeSections: string[],
) => {
  const featuresBridgeSectionTitles = getFeaturesBridgeSectionTitles(bridgeSections) as HTMLElement;
  const bridgeSectionBounds =
    featuresBridgeSectionTitles.getBoundingClientRect();
  const videoBounds = video.getBoundingClientRect();
  return videoBounds.top - bridgeSectionBounds.bottom;
};

export const getCardScaleOnHoverAmount = (card: HTMLElement, cardDimensions: ClientRect) => {
  let cardToUseAsReference = document.querySelector(".card")!;

  if (cardToUseAsReference === card) {
    const cards = document.querySelectorAll(".card");
    cardToUseAsReference = cards[cards.length - 1];
  }

  const cardToUseAsReferenceDimensions =
    cardToUseAsReference.getBoundingClientRect();
  const valueToReturn =
    cardDimensions.height / cardToUseAsReferenceDimensions.height;
  return valueToReturn;
};

export const getCardCoordinates = (card: HTMLElement, cardDimensions: ClientRect, viewPortWidth: number, isMobile: boolean) => {
  let cardLeftOriginal = cardDimensions.left;
  let cardRightOriginal = cardDimensions.right;
  let cardTopOriginal = cardDimensions.top;
  let cardBottomOriginal = cardDimensions.bottom;
  let cardCenterXOriginal =
    (cardRightOriginal - cardLeftOriginal) / 2 + cardLeftOriginal;
  let cardCenterYOriginal =
    (cardBottomOriginal - cardTopOriginal) / 2 + cardTopOriginal;

  if (viewPortWidth > MOBILE_BREAK_POINT_WIDTH) {
    cardLeftOriginal = cardDimensions.left + (cardDimensions.width * 1) / 6;
    cardRightOriginal = cardDimensions.right - (cardDimensions.width * 1) / 6;

    cardTopOriginal = cardDimensions.top + (cardDimensions.height * 1) / 6;
    cardBottomOriginal =
      cardDimensions.bottom - (cardDimensions.height * 1) / 6;

    cardCenterXOriginal =
      (cardRightOriginal - cardLeftOriginal) / 2 + cardLeftOriginal;
    cardCenterYOriginal =
      (cardBottomOriginal - cardTopOriginal) / 2 + cardTopOriginal;
  }

  const transformOrigin = getComputedStyle(card)["transformOrigin"];
  const split = transformOrigin.split(" ");
  const yCornerOffset = isMobile ? 1.75 : 1.85;
  const xCornerOffset = 1.1675;
  const cardScaleOnHoverAmount = getCardScaleOnHoverAmount(
    card,
    cardDimensions,
  );
  const yTransformOffset = parseFloat(split[0]);
  const xTransformOffset = parseFloat(split[1]);
  const xValueToMatch = cardDimensions.width / cardScaleOnHoverAmount;
  const yValueToMatch = cardDimensions.height / cardScaleOnHoverAmount;
  const xCondition = Math.abs(yTransformOffset - xValueToMatch) < 1;
  const yCondition = Math.abs(xTransformOffset - yValueToMatch) < 1;
  const xConditionHalf = Math.abs(yTransformOffset * 2 - xValueToMatch) < 1;
  const yConditionHalf = Math.abs(xTransformOffset * 2 - yValueToMatch) < 1;

  const isTransformOriginTopLeft =
    xTransformOffset === 0 && yTransformOffset === 0;
  const isTransformOriginTopRight = xTransformOffset === 0 && xCondition;
  const isTransformOriginBottomLeft = yCondition && yTransformOffset === 0;
  const isTransformOriginBottomRight = yCondition && xCondition;
  const isTransformOriginTop = xTransformOffset === 0 && xConditionHalf;
  const isTransformOriginBottom = yCondition && xConditionHalf;
  const isTransformOriginLeft = yTransformOffset === 0 && yConditionHalf;
  const isTransformOriginRight = xCondition && yConditionHalf;

  // console.log('xTransformOffset =', xTransformOffset);
  // console.log('yTransformOffset =', yTransformOffset);
  // console.log('cardDimensions =', cardDimensions);
  // console.log('xValueToMatch =', xValueToMatch);
  // console.log('yValueToMatch =', yValueToMatch);
  // console.log('xCondition =', xCondition);
  // console.log('yCondition =', yCondition);
  // console.log('xConditionHalf =', xConditionHalf);
  // console.log('yConditionHalf =', yConditionHalf);
  // console.log('something------------------------------------------------');
  // console.log('isTransformOriginTopLeft =', isTransformOriginTopLeft);
  // console.log('isTransformOriginTopRight =', isTransformOriginTopRight);
  // console.log('isTransformOriginBottomLeft =', isTransformOriginBottomLeft);
  // console.log('isTransformOriginBottomRight =', isTransformOriginBottomRight);
  // console.log('isTransformOriginTop =', isTransformOriginTop);
  // console.log('isTransformOriginBottom =', isTransformOriginBottom);
  // console.log('isTransformOriginLeft =', isTransformOriginLeft);
  // console.log('isTransformOriginRight =', isTransformOriginRight);
  // console.log('Math.abs(yTransformOffset - valueToMatch) =', Math.abs(yTransformOffset - xValueToMatch));

  if (isTransformOriginTopLeft || isTransformOriginTopRight) {
    cardCenterYOriginal =
      cardCenterYOriginal +
      cardDimensions.height / cardScaleOnHoverAmount / yCornerOffset;
  } else if (isTransformOriginBottomLeft || isTransformOriginBottomRight) {
    cardCenterYOriginal =
      cardCenterYOriginal -
      cardDimensions.height / cardScaleOnHoverAmount / yCornerOffset;
  }

  if (isTransformOriginTopLeft || isTransformOriginBottomLeft) {
    cardCenterXOriginal =
      cardCenterXOriginal + cardDimensions.width * xCornerOffset;
  } else if (isTransformOriginTopRight || isTransformOriginBottomRight) {
    cardCenterXOriginal =
      cardCenterXOriginal - cardDimensions.width * xCornerOffset;
  } else if (isTransformOriginTop)
    cardCenterYOriginal += yTransformOffset * cardScaleOnHoverAmount;
  else if (isTransformOriginBottom)
    cardCenterYOriginal -= yTransformOffset * cardScaleOnHoverAmount;
  else if (isTransformOriginLeft)
    cardCenterXOriginal += xTransformOffset * cardScaleOnHoverAmount;
  else if (isTransformOriginRight)
    cardCenterXOriginal -= xTransformOffset * cardScaleOnHoverAmount;

  // cardCenterXOriginal += xOffset;

  return {
    cardCenterXOriginal,
    cardCenterYOriginal,
  };
};