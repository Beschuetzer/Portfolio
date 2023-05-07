import { useRef, useEffect } from "react";

export const useRenderCount = () => {
    const countRef = useRef(-1);

    useEffect(() => {
        countRef.current++;
    })

    return countRef;
}