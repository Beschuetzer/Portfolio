import React from 'react'
import { getClassname } from '../../../utils'
import { useCarouselContext } from '../../../context'

type CarouselItemViewerToolbarPreviewProps = {}

export const CarouselItemViewerToolbarPreview = (props: CarouselItemViewerToolbarPreviewProps) => {
    //#region Init
    const { currentItem } = useCarouselContext();
    const { srcThumbnail, description } = currentItem;
    //#endregion

    //#region JSX
    const className = getClassname({elementName: 'item-viewer-toolbar-preview'})

    if (!srcThumbnail) return null;
    return (
        <div className={className}>
            <div className={`${className}-image-container`}>
                <img
                    src={srcThumbnail}
                    alt={description}
                />
            </div>
            <div  className={`${className}-image-description`}>
                {/* {description} */}
                <p>
                    Zombie ipsum reversus and something else longer than you'd like oit tkjld
                </p>
            </div>
        </div>
    )
    //#endregion
}