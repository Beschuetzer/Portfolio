import React, { useCallback, useMemo } from 'react'
import { CarouselItemProps } from './CarouselItem';
import { CAROUSEL_DOT_OPACITY_DEFAULT, CAROUSEL_DOT_HEIGHT_DEFAULT, NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS, CAROUSEL_DOT_WIDTH_DEFAULT, CLASSNAME__DOTS } from '../constants';
import { ArrowProps, CarouselElement, CarouselNavigationProps } from '../types';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { StylingLogic } from '../business-logic/StylingLogic';

export type CarouselDotsProps = {
    items: CarouselItemProps[];
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    style?: React.CSSProperties;
} & CarouselNavigationProps & Pick<ArrowProps, 'options'>

export const CarouselDots = (props: CarouselDotsProps) => {
    //#region Init
    const {
        currentPage,
        items,
        numberOfDots = items?.length || NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS - 1,
        options = {},
        setCurrentPage,
    } = props;
    const { style, svgHref } = options?.styling?.elements?.dots || {};
    const { optionsLogic, stylingLogic } = useBusinessLogic();
    const defaultColor = optionsLogic.isDefaultItemDisplayLocation ? optionsLogic.theme.colorOne : optionsLogic.theme.colorFive;
    const fillColor = optionsLogic.getButtonColor(CarouselElement.dots, defaultColor);
    //#endregion

    //#region Handlers/Functions
    const onDotClick = useCallback((index: number) => {
        if (index === currentPage) return;
        setCurrentPage(index);
    }, [setCurrentPage, currentPage]);
    //#endregion

    //#region JSX
    const useStyles = useMemo(() => StylingLogic.getColorStyle(fillColor, 'fill'), [fillColor]);
    const divStyles = useMemo(() => StylingLogic.getColorStyle(fillColor, 'backgroundColor', {
        opacity: CAROUSEL_DOT_OPACITY_DEFAULT,
    }), [fillColor]);
    const containerHeight = useMemo(() => (stylingLogic.getCarouselElementSizeStlye(CarouselElement.dots)?.width || CAROUSEL_DOT_HEIGHT_DEFAULT) as number * 2 / 3, [stylingLogic]);
    const containerWidth = useMemo(() => (stylingLogic.getCarouselElementSizeStlye(CarouselElement.dots)?.width || CAROUSEL_DOT_HEIGHT_DEFAULT) as number * 2 / 3, [stylingLogic]);
    const dotContainerSizeStyle = useMemo(() => ({
        width: CAROUSEL_DOT_WIDTH_DEFAULT + (Math.abs(containerWidth - CAROUSEL_DOT_WIDTH_DEFAULT) / CAROUSEL_DOT_WIDTH_DEFAULT),
        height: containerHeight,
    }), [containerHeight, containerWidth]);
    const dotSizeStyle = useMemo(() => ({
        width: containerHeight / 4,
        height: containerHeight / 4,
    }), [containerHeight]);

    const renderDots = useCallback(() => {
        const dots = [];
        for (let index = 0; index < numberOfDots; index++) {
            const isCurrentPage = index === currentPage;
            const svgToUse = optionsLogic.getXlinkHref(svgHref);

            const currentDotStyle = isCurrentPage && !!svgToUse ? {
                opacity: 1,
            } : isCurrentPage ? {
                backgroundColor: fillColor || optionsLogic.theme.colorOne,
                opacity: 1,
            } : {};

            const currentPageClassname = isCurrentPage ? `${CLASSNAME__DOTS}-current` : '';

            dots.push((
                !!svgToUse ? (
                    <svg key={index} onClick={() => onDotClick(index)} className={currentPageClassname}>
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
    }, [
        currentPage,
        divStyles,
        dotContainerSizeStyle,
        dotSizeStyle,
        fillColor,
        numberOfDots,
        onDotClick,
        optionsLogic,
        svgHref,
        useStyles
    ]);

    if (numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return null;
    return (
        <div className={CLASSNAME__DOTS} style={style}>
            {renderDots()}
        </div>
    )
    //#endregion
}