export function capitalize(str: string | undefined | null) {
	if (!str) return "";
	return str
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ");
}

export const replaceCharacters = (
	str: string,
	characterMappings: [string, string][] = [],
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

export function checkForParentOfType(
	clickedElement: HTMLElement,
	parentType: string,
	classPresent = "",
): boolean {
	try {
		if (
			clickedElement &&
			clickedElement.parentNode &&
			(clickedElement.parentNode as HTMLElement).localName === parentType &&
			(clickedElement.parentNode as HTMLElement).className.search(
				classPresent,
			) !== -1
		)
			return true;

		if ((clickedElement.parentNode as HTMLElement).localName.search(/html/i) !== -1) return false;

		const parent = clickedElement.parentNode as HTMLElement;
		return checkForParentOfType(parent, parentType, classPresent);
	} catch (error) {
		return false;
	}
}

export function getLinearPercentOfMaxMatchWithinRange(currentTrackedValue: number, minTrackedValue: number, maxTrackedValue: number, startOutputValue: number, endOutputValue: number) {
  //returns a value between a given input range that correlates to the value of variable as it changes within a different range.  If the tracked variable goes about the maxCutoff then it assumes the max value possible.  If it goes anywhere below the min value.  Any where inbetween is linearly correlated to the trackedValue.

  if (currentTrackedValue >= maxTrackedValue) return endOutputValue;
  if (currentTrackedValue <= minTrackedValue) return startOutputValue;

  var trackedValueRange = Math.abs(maxTrackedValue - minTrackedValue);
  var outputValueRange = Math.abs(endOutputValue - startOutputValue) ;
  var amountAboveMin = currentTrackedValue - minTrackedValue;
  var percentOfRange = amountAboveMin / trackedValueRange;

  if (startOutputValue <= endOutputValue) return startOutputValue + (percentOfRange * outputValueRange);
  else {
    return startOutputValue - (percentOfRange * outputValueRange);
  }
}