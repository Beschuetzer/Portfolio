import React, { useEffect, useState } from 'react'
import { CarouselImage } from '../CarouselImage';
import { CarouselVideo } from '../CarouselVideo';
import { VIDEO_EXTENSIONS } from '../../constants';
import { useCarouselContext } from '../../context'
import { getClassname, getRegexStringFromStringArray } from '../../utils';
import { CarouselItemViewerCloseButton } from './CarouselItemViewerCloseButton';
import { CarouselItemViewerPlayButton } from './CarouselItemViewerPlayButton';
import { CarouselItemViewerPauseButton } from './CarouselItemViewerPauseButton';
import { CarouselItemViewerStopButton } from './CarouselItemViewerStopButton';
import { CarouselItemViewerRestartButton } from './CarouselItemViewerRestartButton';


export const CarouselItemViewer = () => {
    //#region Init
    //todo: needs to be hidden until an item is clicked
    const { currentItemSrc, currentItemProps, currentPage, currentSvgHrefs: closeButtonSvgXlinkHrefRef } = useCarouselContext();
    const [isVisible, setisVisible] = useState(!!currentItemSrc);
    const isVideo = currentItemSrc?.match(
		getRegexStringFromStringArray(VIDEO_EXTENSIONS),
	);
    //#endregion

    //#region Function/Handlers
    
    //#endregion

    //#region Side Fx
    useEffect(() => {
        setisVisible(!!currentItemSrc);
    }, [currentItemSrc])
    //#endregion
    
    //#region JSX
    //todo: need to use stying here instead for smooth transitions?
    const ItemToRender = isVideo ? CarouselVideo : CarouselImage;
    const visibilityStyle = isVisible ? getClassname({modifiedName: 'visible'}) : getClassname({modifiedName: 'hidden'});
    const containerClassname = `${getClassname({elementName: 'item-viewer'})} ${visibilityStyle}`;
    const toolbarClassname = getClassname({elementName: 'item-viewer-toolbar'})
    const toolbarLeftClassname = getClassname({elementName: 'item-viewer-toolbar-left'})
    const toolbarRightClassname = getClassname({elementName: 'item-viewer-toolbar-right'})

    return (
        <section className={containerClassname}>
            <ItemToRender {...currentItemProps}/>
            <div className={toolbarClassname}>
                <div  className={toolbarLeftClassname}>
                    <CarouselItemViewerPlayButton />
                    <CarouselItemViewerPauseButton />
                    <CarouselItemViewerStopButton />
                    <CarouselItemViewerRestartButton />
                </div>
                <div className={toolbarRightClassname}>
                    <CarouselItemViewerCloseButton />
                </div>
            </div>
        </section>
    )
    //#endregion
}
