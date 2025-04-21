export function capitalize(str: string | undefined | null) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function ensureMaxLength(str: string, maxLength: number) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

export function getAncestorContainsClassname(
  elementToCheck: HTMLElement | null,
  classname: string,
  stoppingElementType = "body"
): boolean {
  try {
    const regex = new RegExp(classname, "i");
    if (!classname || !elementToCheck) return false;
    if (elementToCheck?.className?.match(regex)) return true;
    if (elementToCheck?.localName?.toLocaleLowerCase() === stoppingElementType)
      return false;
    const parent = elementToCheck?.parentElement || null;
    return getAncestorContainsClassname(parent, classname, stoppingElementType);
  } catch (error) {
    return true;
  }
}

export function getHeaderName(header: string) {
  if (!header) return "";
  return capitalize(header.replace(/[_-]+/gi, " ").trim());
}

export function getLinearPercentOfMaxMatchWithinRange(
  currentTrackedValue: number,
  minTrackedValue: number,
  maxTrackedValue: number,
  startOutputValue: number,
  endOutputValue: number
) {
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

export function getMaxLengthString(
  str: string,
  maxCharCount = 30,
  addElliplse = true
) {
  if (!str) {
    return "";
  }

  let isEllipseNeeded = false;
  if (str.length > maxCharCount) {
    isEllipseNeeded = true;
  }

  return `${str.slice(0, maxCharCount)}${
    isEllipseNeeded && addElliplse ? "..." : ""
  }`;
}

export function getMinuteAndSecondsString(songLengthInSeconds: number) {
  const secondsPerMinute = 60;
  const hours = Math.floor(
    songLengthInSeconds / secondsPerMinute / secondsPerMinute
  );
  let minutes = Math.floor(songLengthInSeconds / secondsPerMinute);

  let seconds = Math.ceil(songLengthInSeconds % secondsPerMinute);
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }

  return `${hours > 0 ? `${hours}:` : ""}${minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

export function getFormattedSectionId(sectionName: string) {
  if (!sectionName) return "";
  return sectionName.replace(/ /g, "-").toLowerCase();
}

export const replaceCharacters = (
  str: string,
  characterMappings: [string, string][] = []
) => {
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