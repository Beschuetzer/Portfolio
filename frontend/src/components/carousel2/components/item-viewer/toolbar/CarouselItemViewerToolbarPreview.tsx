import { getClassname } from '../../../utils'
import { useState } from 'react';
import { LoadingSpinner } from '../../LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../../../constants';
import { CarouselItemProps } from '../../CarouselItem';

export enum ToolbarPreviewDirection {
    none,
    previous,
    next,
}
type CarouselItemViewerToolbarPreviewProps = {
    isLoaded: boolean;
    itemToShow: CarouselItemProps;
    setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
}

export const CarouselItemViewerToolbarPreview = ({
    isLoaded,
    itemToShow,
    setIsLoaded,
    show,
}: CarouselItemViewerToolbarPreviewProps) => {
    //#region Init
    const { description, srcMain, srcThumbnail } = itemToShow || {};
    //#endregion

    //#region Functions/Handlers
    
    //#endregion

    //#region Side Fx
    //#endregion

    //#region JSX
    const className = getClassname({ elementName: 'item-viewer-toolbar-preview' })
    return (
        <div className={`${className} ${show ? '' : CLASSNAME__HIDDEN}`}>
            <div className={`${className}-image-container`}>
                <LoadingSpinner
                    type='ring'
                    options={{
                        containerLength: 100,
                        radius: 32,
                        width: 4,
                        containerMargin: '0px',
                    }}
                    description={''}
                    show={!isLoaded}
                />
                <img
                    src={srcThumbnail || srcMain}
                    alt={description}
                    onLoad={() => setIsLoaded(true)}
                    onAbort={() => setIsLoaded(false)}
                    onSuspend={() => setIsLoaded(false)}
                    onBlur={(() => setIsLoaded(false))}
                />
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