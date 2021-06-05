//#region Helper Functions
export const removeClassFromAllChildren = (parent, classNameToRemove) => {
  const childrenWithClassname = parent.querySelectorAll(
    `.${classNameToRemove}`,
  );

  for (let j = 0; j < childrenWithClassname.length; j++) {
    const childWithClassname = childrenWithClassname[j];
    childWithClassname.classList.remove(classNameToRemove);
  }
}

export function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  console.log('id =', id);
  console.log('phase =', phase);
  console.log('actualDuration =', actualDuration);
  console.log('baseDuration =', baseDuration);
  // console.log('startTime =', startTime);
  // console.log('commitTime =', commitTime);
  // console.log('interactions =', interactions);
}

export const scrollToSection = (sectionToScrollTo, headerHeight) => {
  const topScrollAmount =  window.scrollY + sectionToScrollTo.getBoundingClientRect().top - headerHeight;
  window.scroll({
    top: topScrollAmount,
    left: 0, 
    behavior: 'smooth' 
  });
}

export const addSpaceAfterPunctuationMarks = (string) => {
  const puncuationMarks = ['.', '?', '!']
  let shouldAdd = false;
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    if (shouldAdd && !puncuationMarks.includes(char)) {
      //add &nbsp here in front of current char
      shouldAdd = false;
      if (char === '<' || string[i+1] !== '') newString += char;
      else newString += '&nbsp' + char;
      continue;
    }
    if (puncuationMarks.includes(char)) shouldAdd = true;  
    newString += char;
  }
  return newString;
}

//#endregion