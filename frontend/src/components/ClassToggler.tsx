import React from "react";

export const CLASS_TOGGLER_CLASSNAME = "class-toggler";

export interface ClassTogglerProps {
	targetSelector: string;
	classToToggle: string;
	children: any;
}

const ClassToggler: React.FC<ClassTogglerProps> = ({
	targetSelector,
	classToToggle,
	children,
}) => {
	const toggleClass = (e: MouseEvent) => {
		const elementToToggle = document.querySelector(targetSelector);

		if (!elementToToggle) return;

		elementToToggle.classList.toggle(classToToggle);
	};

	return (
		<span
			onClick={(e: any) => toggleClass(e)}
			className={`${CLASS_TOGGLER_CLASSNAME} bridge__link`}>
			{children}
		</span>
	);
};

export default ClassToggler;
