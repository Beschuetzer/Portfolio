export type ButtonProps = {
    className?: string;
    onClick: () => void;
}

export type CarouselOptions = {
    thumbnail?: CarouselThumbnailOptions;
    video?: CarouselVideoOptions;
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

type CarouselColor = {
    /*
    *Default assumption is the value is a hexadecimal or color string.
    */
    type?: 'hexadecimal' | 'cssCustomProperty';
    value: string;
}

export type CarouselThumbnailOptions = {
    /*
    *The hexadecimal value for the thumbnail's background
    */
    backgroundColor?: CarouselColor;

    /*
    *The hexadecimal value for the thumbnail background's text
    */
    textColor?: CarouselColor;
}

export type CarouselVideoOptions = {
    /*
   *If this is falsy or < 0 then auto-hiding of the toolbar is disabled for videos.  
   *Otherwise, auto-hide occurs when there is no mouse input for this amount of time in milliseconds.  Default is 2.5 seconds.
   */
    autoHideToolbarDuration?: number;
    /*
    *How for forward/backward the seek buttons move a video.  Default is 5 seconds.
    */
    seekAmount?: number;
}

export type CssStyles = {
    [name: string]: React.CSSProperties;
}

export type Exclusive<
    T extends Record<PropertyKey, unknown>,
    U extends Record<PropertyKey, unknown>
> =
    | (T & { [k in Exclude<keyof U, keyof T>]?: never })
    | (U & { [k in Exclude<keyof T, keyof U>]?: never })

export type Point = {
    x: number;
    y: number;
}

export type VideoTimeStrings = {
    durationStr: string;
    currentTimeStr: string;
}