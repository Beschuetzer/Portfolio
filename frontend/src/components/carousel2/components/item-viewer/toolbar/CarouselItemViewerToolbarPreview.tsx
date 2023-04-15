import { getClassname } from '../../../utils'
import { useCarouselContext } from '../../../context'
import { useState } from 'react';
import { LoadingSpinner } from '../../LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../../../constants';

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
    const [isLoaded, setIsLoaded] = useState(false);
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
    const className = getClassname({ elementName: 'item-viewer-toolbar-preview' })
    return (
        <div className={`${className} ${show ? '' : CLASSNAME__HIDDEN}`}>
            <div className={`${className}-image-container`}>
                <img
                    src={srcThumbnail || srcMain}
                    alt={description}
                    onLoad={() => setIsLoaded(true)}
                />
                {!isLoaded ? <LoadingSpinner type='ring' options={{
                    containerLength: 100,
                    radius: 32,
                    width: 4,
                    containerMargin: '0px',
                }} description={''} show={true} /> : null}
            </div>
            <div className={`${className}-image-description`}>
                <p>
                    {description || 'No description'}
                </p>
            </div>
        </div>
    )
    //#endregion
}