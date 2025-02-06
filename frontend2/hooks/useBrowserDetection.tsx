import { useEffect, useState } from "react";
import { BotInfo, BrowserInfo, detect, NodeInfo, ReactNativeInfo, SearchBotDeviceInfo } from 'detect-browser';

export const useBroswerDetection = () => {
    const [browser, setBrowser] = useState<BrowserInfo | SearchBotDeviceInfo | BotInfo | NodeInfo | ReactNativeInfo | null>(null);
    useEffect(() => {
        const browser = detect();
        setBrowser(browser);
    }, [])

    return browser;
}