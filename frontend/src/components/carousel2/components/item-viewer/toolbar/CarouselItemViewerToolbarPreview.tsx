import { getClassname, getCurrentValue, getShortcutsString } from '../../../utils'
import { LoadingSpinner } from '../../LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../../../constants';
import { CarouselItemProps } from '../../CarouselItem';
import { CarouselItemViewerButtonProps } from '../../../types';
import { KeyInput } from '../../../hooks/useKeyboardShortcuts';
import { useMemo } from 'react';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

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
    const { optionsLogic, stylingLogic } = useBusinessLogic({});
    const { description, srcMain, srcThumbnail } = itemToShow || {};
    //#endregion

    //#region JSX
    const className = useMemo(() => getClassname({ elementName: 'item-viewer-toolbar-preview' }), []);
    const isVisible = useMemo(() => optionsLogic.itemViewerPreviewIsVisible, [optionsLogic.itemViewerPreviewIsVisible]);
    const shortcutString = useMemo(() => getShortcutsString(shortcuts), [shortcuts]);
    const imageJSX = useMemo(() => (
        <div
            style={stylingLogic.carouselItemViewerPreviewImageContainerStyle}
            className={`${className}-image-container`}
        >
            <LoadingSpinner
                type='ring'
                options={{
                    containerLength: 100,
                    radius: 32,
                    width: 4,
                    containerMargin: '0px',
                }}
                description={''}
                show={true}
            />
            <img
                style={stylingLogic.carouselItemViewerPreviewImageStyle}
                className={show ? '' : CLASSNAME__HIDDEN}
                src={srcThumbnail || srcMain}
                alt={description}
                onLoad={() => setIsLoaded(true)}
                onAbort={() => setIsLoaded(false)}
                onSuspend={() => setIsLoaded(false)}
                onBlur={(() => setIsLoaded(false))}
            />
        </div>
    ), [
        className,
        description,
        setIsLoaded,
        show,
        srcMain,
        srcThumbnail,
        stylingLogic.carouselItemViewerPreviewImageContainerStyle,
        stylingLogic.carouselItemViewerPreviewImageStyle
    ]);
    const textJSX = useMemo(() => (
        <div
            style={stylingLogic.carouselItemViewerPreviewImageDescriptionContainerStyle}
            className={`${className}-image-description`}
        >
            <div>
                <div>
                    {actionName.toUpperCase()}
                </div>
                {shortcutString ? (
                    <div>
                        ({shortcutString})
                    </div>
                ) : null}
            </div>
            <p>
                {description || 'No description'}
            </p>
        </div>
    ), [
        actionName,
        className,
        description,
        shortcutString,
        stylingLogic.carouselItemViewerPreviewImageDescriptionContainerStyle
    ]);
    return (
        <div
            style={stylingLogic.carouselItemViewerPreviewStyle}
            className={`${className} ${show && isVisible ? '' : CLASSNAME__HIDDEN}`}
        >
            {optionsLogic.itemViewerPreviewSwapImageAndText ? (
                <>
                    {textJSX}
                    {imageJSX}
                </>
            ) : (
                <>
                    {imageJSX}
                    {textJSX}
                </>
            )}

        </div>
    )
    //#endregion
}