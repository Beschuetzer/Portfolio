import { useState, useLayoutEffect } from "react";
import { PROGRESS_BAR_PERCENT_INITIAL_VALUE } from "../constants";

export type UseSetToolbarWidthInput = {
    progressBarRef?: React.MutableRefObject<HTMLDivElement | undefined>;
}
export const useSetToolbarWidth = (input: UseSetToolbarWidthInput) => {
    const {
        progressBarRef,
    } = input;
    const [toolbarWidth, setToolbarWidth] = useState(PROGRESS_BAR_PERCENT_INITIAL_VALUE);
    
    useLayoutEffect(() => {
        if (toolbarWidth !== undefined && toolbarWidth <= PROGRESS_BAR_PERCENT_INITIAL_VALUE) {
            const newWidth = progressBarRef?.current?.getBoundingClientRect().width;
            if (newWidth !== undefined && newWidth > 0 && toolbarWidth !== undefined) {
                setToolbarWidth(newWidth);
            }
        }
    }, [progressBarRef, setToolbarWidth, toolbarWidth])

    return toolbarWidth;
}