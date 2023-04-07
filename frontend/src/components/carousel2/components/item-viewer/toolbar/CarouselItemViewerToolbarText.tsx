import { CLASSNAME__ITEM_VIEWER } from "../../../constants";
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

    return (
        <span className={CLASSNAME_TOOLBAR_MIDDLE}>
            {isVideo ? (
                <div>
                    <span>{timeStrings.currentTimeStr}</span>
                    <span>/</span> 
                    <span>{timeStrings.durationStr}</span>
                </div>
            ) : null}
            <span>{description}</span>
        </span>
    )
}