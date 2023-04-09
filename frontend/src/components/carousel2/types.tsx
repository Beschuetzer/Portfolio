export type ButtonProps = {
    className?: string;
    onClick: () => void;
}

export type CarouselLayoutOptions = {
    /*
    *Default is dynamic;  If set to dynamic, the amount of spacing between items adjusts to fit the max number of thumbnails inside the container
    *based on the thumbnailSize.  If set to 'fixed', the interItemSpacing value is used regardless of how many items will fit inside the container
    */
    spacingStrategy?: 'dynamic' | 'fixed';
    /*
    *The value in rem that the items are spaced apart.  Default is 1rem.
    */
    interItemSpacing?: number;
}

export type CarouselOptions = {
    thumbnail?: CarouselThumbnailOptions;
    video?: CarouselVideoOptions;
    layout?: CarouselLayoutOptions;
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

export type CarouselThumbnailOptions = {
    /*
    *The hexadecimal value for the thumbnail's background
    */
    backgroundColor?: string;
    /*
    *The size of the font in rem of the thumbnail description;  Default is 12px;
    */
    fontSize?: number;
     /*
    *If false, the overlay with the description is always present.  
    *If true, the overlay only shows when item is hovered.
    *No overlay is shown if item.description is falsy
    *Default is true
    */
    hideOverlayUnlessHovered?: boolean;
    /*
    *The number of lines to show before an ellipsis is inserted.  Default is 2.
    */
    maxLineCount?: number;
    /*
    *The size of the thumbnails in rem.  Default is 15rem.
    */
    size?: number;
    /*
    *The hexadecimal value for the thumbnail background's text
    */
    textColor?: string;
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