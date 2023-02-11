import { useEffect, useState } from 'react';
import { BODY_BACKGROUND_CLASSNAME, PAGE_NAMES, DEFAULT_PAGE_NAME_INDEX, DISPLAY_NONE_CLASSNAME, HEADER_ID, HEADER_TOGGLER_CLASSNAME, TRANSPARENT_CLASSNAME } from '../components/constants';
import { scrollToSection } from '../components/utils';
import { useAppSelector } from '../hooks';
import { previousUrlSelector } from '../slices';
import { Match } from '../types';

//match is inserted into all components via react-router-dom
export const useHandleChangePage = (match: Match) => {
	const previousUrl = useAppSelector(previousUrlSelector);
	const [currentUrl, setCurrentUrl] = useState<string>("");

    useEffect(() => {
		if (!currentUrl) { 
			(document.body.className = `${BODY_BACKGROUND_CLASSNAME} home-page`);
			return;
		}
	
		let docStyle = getComputedStyle(document.documentElement);
		const colorVarRoot = "--color-primary";
		const colorSuffixes = ["-1", "-2", "-3", "-4", "-red"];
		const lastIndexOfSlash = (currentUrl as any).lastIndexOf("/");
		const pageName = (currentUrl as any).slice(lastIndexOfSlash);
		const temp = PAGE_NAMES.indexOf(pageName);
	
		if (temp === -1) return;
		let index = temp !== -1 ? temp : DEFAULT_PAGE_NAME_INDEX;
		if (currentUrl === "/") index = 0;
		document.body.className = `${BODY_BACKGROUND_CLASSNAME} ${PAGE_NAMES[index].slice(
			1,
		)}-page`;
		const colorVarSuffix = PAGE_NAMES[index].slice(1);
	
		for (let i = 0; i < colorSuffixes.length; i++) {
			const colorVarNumber = colorSuffixes[i];
			let colorVarToChange = `${colorVarRoot}${colorVarNumber}`;
			const colorVarTarget = `${colorVarRoot}${
				colorVarSuffix !== "" ? `-${colorVarSuffix}` : ""
			}${colorVarNumber}`;
			const targetValue = docStyle.getPropertyValue(colorVarTarget);
			document.documentElement.style.setProperty(colorVarToChange, targetValue);
	
			const colorRGBTarget = colorVarTarget + "-rgb";
			if (colorVarToChange) colorVarToChange += "-rgb";
			const targetValueRGB = docStyle.getPropertyValue(colorRGBTarget);
			document.documentElement.style.setProperty(
				colorVarToChange,
				targetValueRGB,
			);
		}
	}, [currentUrl]);

    useEffect(() => {
		if (!currentUrl || currentUrl !== match.url) {
			scrollToSection(document.body);
			setCurrentUrl(match.url);
		}
	}, [match, currentUrl, previousUrl, setCurrentUrl]);

	useEffect(() => {
		const headerElement = document.querySelector(HEADER_ID);
		const headerTogglerElement = document.querySelector(
			`.${HEADER_TOGGLER_CLASSNAME}`,
		);
		if (!headerElement || !headerTogglerElement) return;
		if (currentUrl === "/") {
			headerElement.classList.add(TRANSPARENT_CLASSNAME);
			headerTogglerElement.classList.add(DISPLAY_NONE_CLASSNAME);
		} else {
			headerElement.classList.remove(TRANSPARENT_CLASSNAME);
			headerTogglerElement.classList.remove(DISPLAY_NONE_CLASSNAME);
		}
	}, [currentUrl]);
}