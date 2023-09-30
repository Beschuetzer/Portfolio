import { CarouselElementValue, CarouselElementValueTuple, CarouselElementViewingMode, CarouselElementTuple, CarouselElementValueType } from "../types";

/**
*Gets the current value for the current window width from the list of tuples.
*Tuples given are sorted by `max-width`, then `min-width`, then unspecified 
*`max-width` tuples are sorted ascending by breakpoint and `min-width` descending by breakpoint.
*Tuples with a breakpoint specified but no type are considered to be `max-width` type.
*If there is more than one tuple with just a value, the first one in the sorted array is used (e.g. for numbers it is the smallest one).
*When extending the supported types, the only thing that needs to be modified is adding another case in the switch statement for said type.

@param valueTuple - The values from which to pick an item (not mutated)
@param defaultValue - The value to use as a fallback if `valueTuple` is undefined
@param isFullscreenMode - Whether the carousel is in fullscreen mode or not
**/
export function getCurrentValue<T>(valueTuple: CarouselElementValue<T> | undefined, defaultValue: T, isFullscreenMode: boolean) {
    let valueTupleToUse: CarouselElementValueTuple<T> | undefined;
    if (typeof (valueTuple) === 'object') {
        valueTupleToUse = ((isFullscreenMode ? (valueTuple as CarouselElementViewingMode<T>)?.fullscreen : (valueTuple as CarouselElementViewingMode<T>)?.nonFullscreen)) || valueTuple as CarouselElementTuple<T>;
        if ((valueTupleToUse as CarouselElementViewingMode<T>)?.fullscreen) {
            valueTupleToUse = isFullscreenMode ? (valueTupleToUse as CarouselElementViewingMode<T>)?.fullscreen : undefined;
        } else if ((valueTupleToUse as CarouselElementViewingMode<T>)?.nonFullscreen) {
            valueTupleToUse = !isFullscreenMode ? (valueTupleToUse as CarouselElementViewingMode<T>)?.nonFullscreen : undefined;
        }
    } else {
        valueTupleToUse = valueTuple;
    }

    if (valueTupleToUse === undefined || valueTupleToUse === null) return defaultValue;
    if (!Array.isArray(valueTupleToUse)) return valueTupleToUse;

    const windowWidth = window.innerWidth;
    let sorted = valueTupleToUse;
    const valueType = typeof valueTupleToUse?.[0]?.[0];

    sorted = [...valueTupleToUse]?.sort((a, b) => {
        const priority = ['max-width', 'min-width', undefined] as (CarouselElementValueType | undefined)[]
        const firstBreakpoint = a?.[1] || 0;
        const secondBreakpoint = b?.[1] || 0;
        const firstType = firstBreakpoint ? a?.[2] || 'max-width' : undefined;
        const secondType = secondBreakpoint ? b?.[2] || 'max-width' : undefined;
        const firstValue = a?.[0];
        const secondValue = b?.[0];
        const firstTypeIndex = priority.indexOf(firstType);
        const secondTypeIndex = priority.indexOf(secondType);
        const sortFirstBeforeSecond = -1;
        const sortFirstAfterSecond = 1;
        const keepOrder = 0;
        const sortByMaxWidthBreakpoint = firstBreakpoint < secondBreakpoint ? sortFirstBeforeSecond : sortFirstAfterSecond;
        const sortByMinWidthBreakpoint = firstBreakpoint > secondBreakpoint ? sortFirstBeforeSecond : sortFirstAfterSecond;

        //each type may need to evalute equality differently       
        let sortByValue;
        switch (valueType) {
            //this is the number case
            default:
                sortByValue = firstValue !== undefined && secondValue !== undefined && firstValue < secondValue
                    ? sortFirstBeforeSecond
                    : sortFirstAfterSecond;
        }

        //assuming the index values are never -1
        if (firstTypeIndex === secondTypeIndex) {
            if (firstTypeIndex === priority.indexOf('max-width')) return sortByMaxWidthBreakpoint;
            else if (firstTypeIndex === priority.indexOf('min-width')) return sortByMinWidthBreakpoint;
            return sortByValue;
        } else if (firstTypeIndex > secondTypeIndex) {
            return sortFirstAfterSecond;
        } else if (firstTypeIndex < secondTypeIndex) {
            return sortFirstBeforeSecond;
        }
        return keepOrder;
    })
    
    for (const tuple of sorted || []) {
        const [value, breakpoint, breakpointType] = tuple || [];
        let valueToUse;

        switch (typeof value) {
            case "number":
                valueToUse = value >= 0 || value < 0 ? value : defaultValue;
                break;
            case "boolean":
                valueToUse = value;
                break;
            default:
                valueToUse = value || defaultValue;
        }

        const breakpointTypeToUse = breakpointType || "max-width";

        if (!breakpoint) {
            return valueToUse;
        }

        if (breakpointTypeToUse === "max-width") {
            if (windowWidth <= breakpoint) return valueToUse;
        } else if (breakpointTypeToUse === "min-width") {
            if (windowWidth >= breakpoint) return valueToUse;
        }
    }
    return defaultValue;
}