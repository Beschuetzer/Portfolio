export const CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION =  75;
export const CARD_DONE_CLASSNAME = 'card--done';
export const CARD_STOPPED_CLASSNAME = 'card--stopped';
export const CARD_OPEN_CLASSNAME = 'card--open';
export const CARD_PLAYING_CLASSNAME = 'card--playing';
export const CARD_DEFAULT_CLASSNAME = 'card card--hoverable';

export const changeSectionTitle = (titleRef, isOpen = true) => {
  if (!titleRef) return;
  const originalMsgTitle = 'Features';
  const originalMsgSubTitle = 'Pick a Card any Card';

  const sections = document.querySelectorAll('.bridge__section');
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section.id.match(/feature/i)) {
      const title = section.querySelector('.bridge__section-title');

      let msgTitleToUse = originalMsgTitle;
      let msgSubTitleToUse = originalMsgSubTitle;
      if (isOpen) {
        msgTitleToUse = titleRef.current?.textContent;
        msgSubTitleToUse = "";
      }
      title.textContent = msgTitleToUse;
      title.nextElementSibling.textContent = msgSubTitleToUse;
      break;
    }
  }
}	