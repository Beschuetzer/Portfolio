export function capitalize(str: string) {
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
		strToUse = strToUse.replace(characterMapping[0], characterMapping[1]);
	}
	console.log('strToUse =', strToUse);

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
