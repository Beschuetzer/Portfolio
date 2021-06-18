import React, { useEffect } from "react";
import { CSSProperties } from "react";

export interface CSSClassCreationObject {
	selector: string;
	styles: CSSProperties;
	sourceCase?: CasingType;
	targetCase?: CasingType;
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
		function getIsUpperCase(char: string) {
			return char.match(/[A-Z]/);
		}

		function getIsLowerCase(char: string) {
			return char.match(/[a-z]/);
		}

		function getCamelToKebab(value: string) {
			if (!value.length || value[0].match(/[A-Z]/))
				throw new Error("Erroneous value in getCamelToKebab()");

			const result: string[] = [];
			for (let i = 0; i < value.length; i++) {
				const char = value[i];
				if (getIsUpperCase(char)) {
					result.push("-");
				}
				result.push(char.toLowerCase());
			}
			return result.join("");
		}

		//convert to
		if (source === CasingTypeEnum.camel) {
			if (target === CasingTypeEnum.snake) {
			} else if (target === CasingTypeEnum.pascal) {
			} else if (target === CasingTypeEnum.kebab) {
				return getCamelToKebab(value);
			}
		} else if (source === CasingTypeEnum.snake) {
			if (target === CasingTypeEnum.camel) {
			} else if (target === CasingTypeEnum.pascal) {
			} else if (target === CasingTypeEnum.kebab) {
			}
		} else if (source === CasingTypeEnum.pascal) {
			if (target === CasingTypeEnum.snake) {
			} else if (target === CasingTypeEnum.camel) {
			} else if (target === CasingTypeEnum.kebab) {
			}
		}

		return value;
	}

	useEffect(() => {
		function getCSSPropStringArray(styles: CSSProperties, sourceCase: CasingType, targetCase: CasingType) {
			const result: string[] = [];
			const properties = Object.keys(styles);
			for (let i = 0; i < properties.length; i++) {
				const property = properties[i];
				//@ts-ignore
				const value = styles[property];
				const convertedProperty = convertValueToCorrectCasing(
					property,
          sourceCase,
          targetCase,			
				);
				result.push(`${convertedProperty}: ${value}`);
			}
			return result;
		}

		if (!list || list.length <= 0) return;
		for (let i = 0; i < list.length; i++) {
      const classToCreate = list[i];
      let style = document.createElement("style");
      style.type = "text/css";

      const cssPropsAsStringArray = getCSSPropStringArray(
        classToCreate.styles,
        classToCreate.sourceCase ? classToCreate.sourceCase : CasingTypeEnum.camel,
        classToCreate.targetCase ? classToCreate.targetCase : CasingTypeEnum.kebab,
      );

      style.innerHTML += `${
        classToCreate.selector
      } { ${cssPropsAsStringArray.join("; ")} }`;
      document.getElementsByTagName("head")[0].appendChild(style);
		}
	}, [list]);
	return null;
};

export default useCssClassCreator;
