import { capitalize, getClassname, getShortcutsString } from '../../../utils'
import { LoadingSpinner } from '../../LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../../../constants';
import { CarouselItemProps } from '../../CarouselItem';
import { CarouselItemViewerButtonProps } from '../../../types';
import { KeyInput } from '../../../hooks/useKeyboardShortcuts';

export enum ToolbarPreviewDirection {
    none,
    previous,
    next,
}
type CarouselItemViewerToolbarPreviewProps = {
    isLoaded: boolean;
    itemToShow: CarouselItemProps;
    setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    shortcuts: KeyInput[];
    show: boolean;
} & Partial<Pick<CarouselItemViewerButtonProps, 'actionName'>>

export const CarouselItemViewerToolbarPreview = ({
    actionName = '',
    isLoaded,
    itemToShow,
    setIsLoaded,
    shortcuts = [],
    show,
}: CarouselItemViewerToolbarPreviewProps) => {
    //#region Init
    const { description, srcMain, srcThumbnail } = itemToShow || {};
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
                    className={isLoaded ? '' : CLASSNAME__HIDDEN}
                    src={srcThumbnail || srcMain}
                    alt={description}
                    onLoad={() => setIsLoaded(true)}
                    onAbort={() => setIsLoaded(false)}
                    onSuspend={() => setIsLoaded(false)}
                    onBlur={(() => setIsLoaded(false))}
                />
            </div>
            <div className={`${className}-image-description`}>
                <div>
                    <div>
                        {actionName.toUpperCase()} 
                    </div>
                    <div>
                        ({getShortcutsString(shortcuts)})
                    </div>
                </div>
                <p>
                    {description || 'No description'}
                </p>
            </div>
        </div>
    )
    //#endregion
}