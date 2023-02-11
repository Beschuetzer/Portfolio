export function capitalize(str: string | undefined | null) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function checkForParentOfType(clickedElement: HTMLElement, parentType: string, classPresent = ""): boolean {
  try {
    if (
      clickedElement &&
      clickedElement.parentNode &&
      (clickedElement.parentNode as HTMLElement).localName === parentType &&
      (clickedElement.parentNode as HTMLElement).className.search(classPresent) !== -1
    )
      return true;

    if ((clickedElement.parentNode as HTMLElement).localName.search(/html/i) !== -1) return false;

    const parent = clickedElement.parentNode as HTMLElement;
    return checkForParentOfType(parent, parentType, classPresent);
  } catch (error) {
    return false;
  }
}

export function getAncestorContainsClassname(elementToCheck: HTMLElement | null, classname: string, stoppingElementType = 'body'): boolean {
  try {
    const regex = new RegExp(classname, 'i');
    if (!classname || !elementToCheck) return false;
    if ( elementToCheck?.className?.match(regex)) return true;
    if (elementToCheck?.localName?.toLocaleLowerCase() === stoppingElementType) return false;
    const parent = elementToCheck?.parentElement || null;
    return getAncestorContainsClassname(parent, classname, stoppingElementType);
  } catch (error) {
    return true;
  }
}

export function getComputedStyleCustom(propertyName: string) {
	if (!propertyName) return '';
	return window.getComputedStyle(document.documentElement).getPropertyValue(propertyName);
}

export function getLinearPercentOfMaxMatchWithinRange(currentTrackedValue: number, minTrackedValue: number, maxTrackedValue: number, startOutputValue: number, endOutputValue: number) {
  //returns a value between a given input range that correlates to the value of variable as it changes within a different range.  If the tracked variable goes above the maxCutoff then it assumes the endOutputValue.  If it goes anywhere below the min value, then it assumes the startOutputValue.  Any where inbetween is linearly correlated to the trackedValue.

  if (currentTrackedValue >= maxTrackedValue) return endOutputValue;
  if (currentTrackedValue <= minTrackedValue) return startOutputValue;

  let trackedValueRange = Math.abs(maxTrackedValue - minTrackedValue);
  let outputValueRange = Math.abs(endOutputValue - startOutputValue);
  let amountAboveMin = currentTrackedValue - minTrackedValue;
  let percentOfRange = amountAboveMin / trackedValueRange;

  if (startOutputValue <= endOutputValue) {
    return startOutputValue + percentOfRange * outputValueRange;
  } else {
    return startOutputValue - percentOfRange * outputValueRange;
  }
}

export function hexToRgb(hex: string) {
	const result = /^#?([a-fd]{2})([a-fd]{2})([a-fd]{2})$/i.exec(hex);
	if (result) {
		const r = parseInt(result[1], 16);
		const g = parseInt(result[2], 16);
		const b = parseInt(result[3], 16);
		return r + "," + g + "," + b; //return 23,14,45 -> reformat if needed
	}
	throw new Error("Invald Hex Value: " + hex);
}

export const replaceCharacters = (str: string, characterMappings: [string, string][] = []) => {
  const replacements = [
    ["-", " "],
    ["_", " "],
  ];

  let strToUse = str;
  let replacementsToUse = replacements;
  if (characterMappings.length > 0) replacementsToUse = characterMappings;

  for (let i = 0; i < replacementsToUse.length; i++) {
    const characterMapping = replacementsToUse[i];
    const splitStr = strToUse.split(characterMapping[0]);
    strToUse = splitStr.join(characterMapping[1]);
  }
  return strToUse;
};


export function rgbToHex(r: number, g: number, b: number) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}