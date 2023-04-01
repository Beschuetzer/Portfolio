import React, { useEffect, useState } from 'react'
import { CarouselImage } from '../CarouselImage';
import { CarouselVideo } from '../CarouselVideo';
import { CLASSNAME__ITEM_VIEWER, VIDEO_EXTENSIONS } from '../../constants';
import { useCarouselContext } from '../../context'
import { getClassname, getRegexStringFromStringArray } from '../../utils';
import { CarouselItemViewerCloseButton } from './CarouselItemViewerCloseButton';
import { CarouselItemViewerPlayButton } from './CarouselItemViewerPlayButton';
import { CarouselItemViewerPauseButton } from './CarouselItemViewerPauseButton';
import { CarouselItemViewerStopButton } from './CarouselItemViewerStopButton';
import { CarouselItemViewerRestartButton } from './CarouselItemViewerRestartButton';
import { CarouselItemViewerSeekBackButton } from './CarouselItemViewerSeekBackButton';
import { CarouselItemViewerSeekForwardButton } from './CarouselItemViewerSeekForwardButton';
import { CarouselItemViewerNextButton } from './CarouselItemViewerNextButton';
import { CarouselItemViewerPreviousButton } from './CarouselItemViewerPreviousButton';
import { CarouselItemViewerToolbar } from './CarouselItemViewerToolbar';

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
    const containerClassname = `${getClassname({elementName: CLASSNAME__ITEM_VIEWER})} ${visibilityStyle}`;
  

    return (
        <section className={containerClassname}>
            <ItemToRender {...currentItemProps}/>
        </section>
    )
    //#endregion
}
