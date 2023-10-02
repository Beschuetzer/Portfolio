import React, { ReactNode } from 'react'
import { CarouselTitleOptions as CarouselContainerOptions } from '../types'
import { CAROUSEL_ITEM_SPACING_DEFAULT, CAROUSEL_SPACING_UNIT, CLASSNAME__CAROUSEL_CONTAINER } from '../constants';

type CarouselTitleContainerProps = {
    children: ReactNode | ReactNode[];
    container?: CarouselContainerOptions;
}

export const CarouselContainer = (props: CarouselTitleContainerProps) => {
    const { container, children } = props;
    const { tag: Tag = 'h4', text, style, textStyle } = container || {};

    return (
        <div style={style} className={CLASSNAME__CAROUSEL_CONTAINER}>
            {!!text ? (
                <Tag style={{ padding: `${CAROUSEL_ITEM_SPACING_DEFAULT}${CAROUSEL_SPACING_UNIT} 0`, textStyle }}>{text}</Tag>
            ) : null}
            {children}
        </div>
    );
}