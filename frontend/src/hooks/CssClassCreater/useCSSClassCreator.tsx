import React, { useEffect } from "react";
import { CSSProperties } from "react";

export interface CSSClassCreationObject {
	selector: string;
	styles: CSSProperties;
}

export type CasingType = "pascal" | "snake" | "camel" | "kebab";
export enum CasingTypeEnum {
	pascal = "pascal",
	snake = "snake",
	camel = "camel",
	kebab = "kebab",
}

interface CssClassCreaterProps {
	list: CSSClassCreationObject[];
}

// camelCase
// PascalCase
// snake_case
// kebab-case

const useCssClassCreator: React.FC<CssClassCreaterProps> = ({ list }) => {
	function convertValueToCorrectCasing(
		value: string,
		source: CasingType,
		target: CasingType,
	) {
		//convert to
		if (source === CasingTypeEnum.camel) {
      if (target === CasingTypeEnum.snake) {
  
      }
      else if (target === CasingTypeEnum.pascal) {
  
      }
		}
    else if (source === CasingTypeEnum.snake) {
      if (target === CasingTypeEnum.camel) {
  
      }
      else if (target === CasingTypeEnum.pascal) {
  
      }
		}
    else if (source === CasingTypeEnum.pascal) {
      if (target === CasingTypeEnum.snake) {
  
      }
      else if (target === CasingTypeEnum.camel) {
  
      }
		}

    return value;
	}

	const getCSSPropStringArray = (styles: CSSProperties) => {
		const result: string[] = [];
		const properties = Object.keys(styles);
		for (let i = 0; i < properties.length; i++) {
			const property = properties[i];
			//@ts-ignore
			const value = styles[property];
			const converted = convertValueToCorrectCasing(value);
			result.push(`${property}: ${converted}`);
		}
		return result;
	};

	useEffect(() => {
		if (!list || list.length <= 0) return;
		for (let i = 0; i < list.length; i++) {
			for (let i = 0; i < list.length; i++) {
				const classToCreate = list[i];

				let style = document.createElement("style");
				style.type = "text/css";

				const cssPropsAsStringArray = getCSSPropStringArray(
					classToCreate.styles,
				);
				style.innerHTML += `${
					classToCreate.selector
				} { ${cssPropsAsStringArray.join("; ")} }`;
				document.getElementsByTagName("head")[0].appendChild(style);
			}
		}
	}, [list]);
	return null;
};

export default useCssClassCreator;
