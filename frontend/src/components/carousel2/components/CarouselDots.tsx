import React, { useCallback } from 'react'
import { CarouselItemProps } from './CarouselItem';
import { getClassname, getCurrentValue } from '../utils';
import { CAROUSEL_COLOR_FIVE, CAROUSEL_COLOR_ONE, CAROUSEL_DOT_OPACITY_DEFAULT, CAROUSEL_DOT_HEIGHT_DEFAULT, NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS, CAROUSEL_DOT_WIDTH_DEFAULT } from '../constants';
import { ArrowProps, CarouselElement, CarouselNavigationProps } from '../types';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { StylingLogic } from '../business-logic/StylingLogic';

type CarouselDotsProps = {
    items: CarouselItemProps[];
    style?: React.CSSProperties;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
} & CarouselNavigationProps & Pick<ArrowProps, 'options'>

const DOTS_CLASSNAME = getClassname({ elementName: 'dots' });
export const CarouselDots = ({
    currentPage,
    items,
    numberOfDots = items?.length || NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS - 1,
    options = {},
    setCurrentPage,
}: CarouselDotsProps) => {
    //#region Init
    const { svgHref, style } = options?.styling?.elements?.dots || {};
    const { optionsLogic, stylingLogic } = useBusinessLogic({});
    const defaultColor = optionsLogic.isDefaultItemDisplayLocation ? CAROUSEL_COLOR_ONE : CAROUSEL_COLOR_FIVE;
    const fillColor = stylingLogic.getButtonColor(CarouselElement.dots, defaultColor);
    //#endregion

    //#region Handlers/Functions
    const onDotClick = useCallback((index: number) => {
        if (index === currentPage) return;
        setCurrentPage(index);
    }, [setCurrentPage, currentPage]);
    //#endregion

    //#region JSX
    const useStyles = StylingLogic.getButtonColorStyle(fillColor, 'fill');
    const divStyles = StylingLogic.getButtonColorStyle(fillColor, 'backgroundColor', {
        opacity: CAROUSEL_DOT_OPACITY_DEFAULT,
    });
    const containerHeight = (stylingLogic.getCarouselElementSizeStlye(CarouselElement.dots)?.width || CAROUSEL_DOT_HEIGHT_DEFAULT) as number * 2 / 3;
    const containerWidth = (stylingLogic.getCarouselElementSizeStlye(CarouselElement.dots)?.width || CAROUSEL_DOT_HEIGHT_DEFAULT) as number * 2 / 3;
    const dotContainerSizeStyle = {
        width: CAROUSEL_DOT_WIDTH_DEFAULT + (Math.abs(containerWidth - CAROUSEL_DOT_WIDTH_DEFAULT) / CAROUSEL_DOT_WIDTH_DEFAULT),
        height: containerHeight,
    }
    const dotSizeStyle = {
        width: containerHeight / 4,
        height: containerHeight / 4,
    }

    function renderDots() {
        const dots = [];
        for (let index = 0; index < numberOfDots; index++) {
            const isCurrentPage = index === currentPage;
            const svgToUse = getCurrentValue(svgHref, '');

            const currentDotStyle = isCurrentPage && !!svgToUse ? {
                opacity: 1,
            } : isCurrentPage ? {
                backgroundColor: fillColor || CAROUSEL_COLOR_ONE,
                opacity: 1,
            } : {};

            const currentPageClassname = isCurrentPage ? `${DOTS_CLASSNAME}-current` : '';

            dots.push((
                !!svgToUse ? (
                    <svg key={index} onClick={() => onDotClick(index)} className={currentPageClassname} style={style}>
                        <use
                            style={{ ...useStyles, ...currentDotStyle }}
                            xlinkHref={svgToUse}
                            href={svgToUse}
                        />
                    </svg>
                ) : (
                    <div key={index} style={dotContainerSizeStyle} onClick={() => onDotClick(index)} className={currentPageClassname}>
                        <div style={{ ...divStyles, ...currentDotStyle, ...dotSizeStyle }} />
                    </div>
                )
            ));
        }
        return dots;
    }

    if (numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return null;
    return (
        <div className={DOTS_CLASSNAME}>
            {renderDots()}
        </div>
    )
    //#endregion
}