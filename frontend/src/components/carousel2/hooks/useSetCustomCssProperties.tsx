import { useEffect } from "react";

type CustomPropertyName = string;
type CustomPropertyValue = string | null;
type CustomPropertyPriority = string;
export type UseSetCustomCssPropertyInput = {
    element: HTMLElement | undefined;
    properties: [CustomPropertyName, CustomPropertyValue, CustomPropertyPriority?][];
}

const PROPERTY_TUPLE_EXPECTED_MIN_LENGTH = 2;
const PROPERTY_TUPLE_EXPECTED_MAX_LENGTH = 3;
export const useSetCustomCssProperties = (input: UseSetCustomCssPropertyInput) => {
    const {
        element,
        properties,
    } = input;
    useEffect(() => {
        if (element && properties?.length > 0) {
            for (const property of properties) {
                if (
                    !property ||
                    property?.length < PROPERTY_TUPLE_EXPECTED_MIN_LENGTH ||
                    property?.length > PROPERTY_TUPLE_EXPECTED_MAX_LENGTH
                ) continue;
                element.style?.setProperty(`--${property[0]}`, property[1], property?.[2]);
            }
        }
    }, [element, properties])
}