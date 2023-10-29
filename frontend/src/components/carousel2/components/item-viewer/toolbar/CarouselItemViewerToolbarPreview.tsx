import { getClassname, getIsVideo, getShortcutsString } from '../../../utils/utils'
import { LoadingSpinner } from '../../LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../../../constants';
import { CarouselItemProps } from '../../CarouselItem';
import { CarouselItemViewerButtonProps, KeyInput } from '../../../types';
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

export const CarouselItemViewerToolbarPreview = (props: CarouselItemViewerToolbarPreviewProps) => {
    //#region Init
    const {
        actionName = '',
        isLoaded,
        itemToShow,
        setIsLoaded,
        shortcuts = [],
        show,
    } = props;
    const { optionsLogic, stylingLogic } = useBusinessLogic();
    const { description, srcMain, srcThumbnail } = itemToShow || {};
    const shouldShowImageJSX = useMemo(() => !!(!getIsVideo(itemToShow) || srcThumbnail), [itemToShow, srcThumbnail]);
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
                src={srcThumbnail || srcMain as string}
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
            <div
                style={stylingLogic.carouselItemViewerPreviewImageDescriptionHeaderStyle}
            >
                <div>
                    {actionName.toUpperCase()}
                </div>
                {shortcutString ? (
                    <div>
                        ({shortcutString})
                    </div>
                ) : null}
            </div>
            <p
                style={stylingLogic.carouselItemViewerPreviewImageDescriptionBodyStyle}
            >
                {description || 'No description'}
            </p>
        </div>
    ), [
        actionName,
        className,
        description,
        shortcutString,
        stylingLogic.carouselItemViewerPreviewImageDescriptionBodyStyle,
        stylingLogic.carouselItemViewerPreviewImageDescriptionContainerStyle,
        stylingLogic.carouselItemViewerPreviewImageDescriptionHeaderStyle,
    ]);

    return (
        <div
            style={stylingLogic.getCarouselItemViewerPreviewStyle(shouldShowImageJSX)}
            className={`${className} ${show && isVisible ? '' : CLASSNAME__HIDDEN}`}
        >
            {optionsLogic.itemViewerPreviewSwapImageAndText ? (
                <>
                    {textJSX}
                    {shouldShowImageJSX ? imageJSX : null}
                </>
            ) : (
                <>
                    {shouldShowImageJSX ? imageJSX : null}
                    {textJSX}
                </>
            )}

        </div>
    )
    //#endregion
}