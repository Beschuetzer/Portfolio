import React, { useCallback } from 'react'
import { CarouselItemProps } from './CarouselItem';
import { getClassname } from '../utils';
import { CAROUSEL_COLOR_FIVE, CAROUSEL_COLOR_ONE, CAROUSEL_DOT_OPACITY_DEFAULT, NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS } from '../constants';
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
    const { itemDisplayLocationLogic, stylingLogic } = useBusinessLogic({});
    const defaultColor = itemDisplayLocationLogic.isDefaultItemDisplayLocation ? CAROUSEL_COLOR_ONE : CAROUSEL_COLOR_FIVE;
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
    function renderDots() {
        const dots = [];
        for (let index = 0; index < numberOfDots; index++) {
            const isCurrentPage = index === currentPage;
            const isSvg = !!svgHref;

            const currentDotStyle = isCurrentPage && isSvg ? {
                opacity: 1,
            } : isCurrentPage ? {
                backgroundColor: fillColor || CAROUSEL_COLOR_ONE,
                opacity: 1,
            } : {};

            const currentPageClassname = isCurrentPage ? `${DOTS_CLASSNAME}-current` : '';

            dots.push((
                isSvg ? (
                    <svg key={index} onClick={() => onDotClick(index)} className={currentPageClassname} style={style}>
                        <use
                            style={{ ...useStyles, ...currentDotStyle }}
                            xlinkHref={svgHref}
                            href={svgHref}
                        />
                    </svg>
                ) : (
                    <div key={index} onClick={() => onDotClick(index)} className={currentPageClassname}>
                        <div style={{ ...divStyles, ...currentDotStyle }} />
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