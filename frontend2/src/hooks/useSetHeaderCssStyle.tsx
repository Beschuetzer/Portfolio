import { useEffect } from 'react';
import { HEADER_TOGGLER_ACTIVE_CLASSNAME, HEADER_ID, HEADER_HEIGHT_CSS_PROPERTY_NAME } from '../components/constants';
import { useAppSelector } from '../hooks';
import { viewPortWidthSelector } from '../slices';

//match is inserted into all components via react-router-dom
export const useSetHeaderCssStyle = () => {
    const viewPortWidth = useAppSelector(viewPortWidthSelector);

	useEffect(() => {
        setHeaderHeightCSSPropertyValue();
	}, [viewPortWidth, setHeaderHeightCSSPropertyValue])
}

export function setHeaderHeightCSSPropertyValue(valueToUse = -1) {
	let newHeaderHeight = valueToUse;

	const headerTogglerActive = document.querySelector(`.${HEADER_TOGGLER_ACTIVE_CLASSNAME}`);
	if (headerTogglerActive) newHeaderHeight = 0;
	else if (newHeaderHeight === -1) {
		const header = document.querySelector(`${HEADER_ID}`) as HTMLElement;
		newHeaderHeight = header.getBoundingClientRect().height;
	}
	
	document.documentElement.style.setProperty(
		HEADER_HEIGHT_CSS_PROPERTY_NAME,
		`${newHeaderHeight}px`,
	);
}
