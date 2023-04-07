import React from 'react'
import { getClassname } from '../../../utils'

type CarouselItemViewerToolbarPreviewProps = {}

export const CarouselItemViewerToolbarPreview = (props: CarouselItemViewerToolbarPreviewProps) => {

    //#region JSX
    const className = getClassname({elementName: 'item-viewer-toolbar-preview'})
    return (
        <div className={className}>
            <div>
                Text
            </div>
        </div>
    )
    //#endregion
}