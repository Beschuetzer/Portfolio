import { useEffect, useRef } from "react";

export const useRenderCount = () => {
    const renderCountRef = useRef<number>(0);

    useEffect(() => {
        renderCountRef.current++;
    })

    return renderCountRef;
}