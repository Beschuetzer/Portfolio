import React, { PropsWithChildren } from 'react'
import { StylingLogic } from '../business-logic/StylingLogic';

type CarouselModalChildContainerProps = {
    key: number;
    textContainerStyles: React.CSSProperties | undefined;
} & PropsWithChildren;

export const CarouselModalChildContainer = (props: CarouselModalChildContainerProps) => {
    const {
        children,
        key,
        textContainerStyles,
    } = props;

    return (
        <div key={key} style={{ ...StylingLogic.getCarouselModalChildStyle(index), ...textContainerStyles }}>
            {children}
        </div>
    )
}