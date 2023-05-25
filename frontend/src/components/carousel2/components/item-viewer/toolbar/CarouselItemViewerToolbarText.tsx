import { CLASSNAME__ITEM_VIEWER } from "../../../constants";
import { useBusinessLogic } from "../../../hooks/useBusinessLogic";
import { VideoTimeStrings } from "../../../types";
import { getClassname } from "../../../utils";

export type CarouselItemViewerToolbarTextProps = {
    description: string;
    isVideo: boolean;
    timeStrings: VideoTimeStrings;
}

const CLASSNAME_TOOLBAR_MIDDLE = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-middle` });

export const CarouselItemViewerToolbarText = ({
    description,
    isVideo = false,
    timeStrings,
}: CarouselItemViewerToolbarTextProps) => {
    const { stylingLogic } = useBusinessLogic({});

    return (
        <span style={stylingLogic.carouselToolbarTextStyle} className={CLASSNAME_TOOLBAR_MIDDLE}>
            {isVideo ? (
                <>
                    <div style={stylingLogic.carouselVideoTimeTextStyle}>
                        <span>{timeStrings.currentTimeStr}</span>
                        <span style={stylingLogic.carouselVideoTimeTextDividierStyle}>/</span>
                        <span>{timeStrings.durationStr}</span>
                    </div>
                    <span>&#x2022;</span>
                </>
            ) : null}
            <span style={stylingLogic.carouselToolbarTextDescriptionStyle}>{description}</span>
        </span>
    )
}