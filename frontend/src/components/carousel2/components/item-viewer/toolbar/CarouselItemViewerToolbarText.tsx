import { CLASSNAME__ITEM_VIEWER_TOOLBAR_TEXT } from "../../../constants";
import { useBusinessLogic } from "../../../hooks/useBusinessLogic";
import { VideoTimeStrings } from "../../../types";

export type CarouselItemViewerToolbarTextProps = {
    description: string;
    isVideo: boolean;
    timeStrings: VideoTimeStrings;
}

export const CarouselItemViewerToolbarText = (props: CarouselItemViewerToolbarTextProps) => {
    const {
        description,
        isVideo = false,
        timeStrings,
    } = props;
    const { stylingLogic } = useBusinessLogic();

    return (
        <span style={stylingLogic.carouselToolbarTextStyle} className={CLASSNAME__ITEM_VIEWER_TOOLBAR_TEXT}>
            {isVideo ? (
                <>
                    <div style={stylingLogic.carouselVideoTimeTextStyle}>
                        <span style={stylingLogic.getCarouselVideoTimeTextBlockStyle(timeStrings.currentTimeStr)}>
                            {timeStrings.currentTimeStr}
                        </span>
                        <span style={stylingLogic.carouselVideoTimeTextDividierStyle}>/</span>
                        <span style={stylingLogic.getCarouselVideoTimeTextBlockStyle(timeStrings.durationStr)}>
                            {timeStrings.durationStr}
                        </span>
                    </div>
                    <span>&#x2022;</span>
                </>
            ) : null}
            <span style={stylingLogic.carouselToolbarTextDescriptionStyle}>{description}</span>
        </span>
    )
}