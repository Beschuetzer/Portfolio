import history from "../history";
import { OVERFLOW_HIDDEN_CLASSNAME } from "./constants";
import { NAVBAR_ACTIVE_CLASSNAME, NAVBAR_CLASSNAME, NAVBAR_DONE_CLASSNAME } from "./navbar/utils";

//#region Helper Functions
export const keypressHandler = (isAnimating: boolean, setIsAnimating: (value: boolean) => void, e: KeyboardEvent) => {
  if (!e.altKey || !e.ctrlKey) return;
  switch (e.key) {
    case "a":
      const navbar = document.querySelector(`.${NAVBAR_CLASSNAME}`);
      const root = document.querySelector("#root");
      setIsAnimating(!isAnimating);
      if (isAnimating) {
        navbar?.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
        root?.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
      } else {
        navbar?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
        navbar?.classList?.remove(NAVBAR_DONE_CLASSNAME);
        navbar?.classList?.add(OVERFLOW_HIDDEN_CLASSNAME);
        root?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
      }
      break;

    case "c":
      history.push("/contact");
      break;
    case "b":
      history.push("/examples/bridge");
      break;
    case "s":
      history.push("/examples/csharp");
      break;
    case "u":
      history.push("/examples/autoBid");
      break;
    case "r":
      history.push("/resume");
      break;
    case "t":
      history.push("/about");
      break;
    default:
      break;
  }
};

export const removeClassFromAllChildren = (parent: HTMLElement, classNameToRemove: string) => {
  const childrenWithClassname = parent.querySelectorAll(
    `.${classNameToRemove}`,
  );

  for (let j = 0; j < childrenWithClassname.length; j++) {
    const childWithClassname = childrenWithClassname[j];
    childWithClassname.classList.remove(classNameToRemove);
  }
}

// export function onRenderCallback(
//   id, // the "id" prop of the Profiler tree that has just committed
//   phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
//   actualDuration, // time spent rendering the committed update
//   baseDuration, // estimated time to render the entire subtree without memoization
//   startTime, // when React began rendering this update
//   commitTime, // when React committed this update
//   interactions // the Set of interactions belonging to this update
// ) {
//   console.log('id =', id);
//   console.log('phase =', phase);
//   console.log('actualDuration =', actualDuration);
//   console.log('baseDuration =', baseDuration);
//   // console.log('startTime =', startTime);
//   // console.log('commitTime =', commitTime);
//   // console.log('interactions =', interactions);
// }

export const scrollToSection = (sectionToScrollTo: HTMLElement, headerHeight: number) => {
  const topScrollAmount =  window.scrollY + sectionToScrollTo.getBoundingClientRect().top - headerHeight;
  window.scroll({
    top: topScrollAmount,
    left: 0, 
    behavior: 'smooth' 
  });
}

export const addSpaceAfterPunctuationMarks = (string: string) => {
  const punctuationMarks = ['.', '?', '!']
  let shouldAdd = false;
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    if (shouldAdd && !punctuationMarks.includes(char)) {
      //add &nbsp here in front of current char
      shouldAdd = false;
      if (char === '<' || string[i+1] !== '') newString += char;
      else newString += '&nbsp' + char;
      continue;
    }
    if (punctuationMarks.includes(char)) shouldAdd = true;  
    newString += char;
  }
  return newString;
}

//#endregion