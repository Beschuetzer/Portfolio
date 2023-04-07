import { getClassname } from '../../../utils'
import { useCarouselContext } from '../../../context'

export enum ToolbarPreviewDirection {
    previous,
    next,
}
type CarouselItemViewerToolbarPreviewProps = {
    direction?: ToolbarPreviewDirection;
    show: boolean;
}

export const CarouselItemViewerToolbarPreview = ({
    direction,
    show,
}: CarouselItemViewerToolbarPreviewProps) => {
    //#region Init
    const { currentItemIndex, currentItems } = useCarouselContext();
    const nextItemIndex = getNextItemIndex();
    const itemToShow = currentItems[nextItemIndex];
    const { srcThumbnail, description, srcMain } = itemToShow || {};
    //#endregion

    //#region Functions/Handlers
    function getNextItemIndex() {
        if (direction === ToolbarPreviewDirection.next) {
            if (currentItemIndex >= (currentItems.length - 1)) return 0;
            return currentItemIndex + 1;
        } else {
            if (currentItemIndex <= 0) return currentItems.length - 1;
            return currentItemIndex - 1;
        }
    }
    //#endregion

    //#region JSX
    const className = getClassname({elementName: 'item-viewer-toolbar-preview'})

    if (!show) return null; 
    return (
        <div className={className}>
            <div className={`${className}-image-container`}>
                <img
                    src={srcThumbnail || srcMain}
                    alt={description}
                />
            </div>
            <div  className={`${className}-image-description`}>
                <p>
                   {description || 'No description'}
                </p>
            </div>
        </div>
    )
    //#endregion
}