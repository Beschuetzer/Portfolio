export type ButtonProps = {
    classname?: string;
    onClick: () => void;
}

export type CarouselOptions = {
    /*
    *If this is falsy or < 0 then auto-hiding of the toolbar is disabled for videos.  Otherwise, auto-hide occurs after this duration in milliseconds.
    */
    autoHideToolbarDuration?: number;
}

export type CarouselSvgHrefs = {
	closeButton?: string;
	nextButton?: string;
	pauseButton?: string;
	playButton?: string;
	previousButton?: string;
	restartButton?: string;
	seekBackButton?: string;
	seekForwardButton?: string;
	stopButton?: string;
}

export type CssStyles = {
    [name: string]: React.CSSProperties;
}

export type Point = {
    x: number;
    y: number;
}

export type VideoTimeStrings = {
    durationStr: string;
    currentTimeStr: string;
}