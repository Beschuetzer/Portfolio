import React from 'react'
import { CLASSNAME__NAVIGATION } from '../constants'
import { ArrowButtonDirection, CarouselNavigationProps } from '../types'
import { onArrowButtonClick } from '../utils/utils'
import { CarouselArrowButton } from './CarouselArrowButton'
import { CarouselDots, CarouselDotsProps } from './CarouselDots'
import { useBusinessLogic } from '../hooks/useBusinessLogic'

type Props = {
    numberOfPages: number;
} & CarouselNavigationProps & Pick<CarouselDotsProps, 'currentPage' | 'items' | 'options' | 'setCurrentPage'>

export const CarouselNavigation = (props: Props) => {
    const {
        currentPage,
        items,
        numberOfPages,
        options = {},
        setCurrentPage,
    } = props
    const { stylingLogic } = useBusinessLogic();
    return numberOfPages > 1 ? (
            <div style={stylingLogic.navigationStyle} className={CLASSNAME__NAVIGATION}>
                <CarouselArrowButton
                    options={options}
                    currentPage={currentPage}
                    numberOfDots={numberOfPages}
                    direction={ArrowButtonDirection.previous}
                    onClick={() => onArrowButtonClick(
                        ArrowButtonDirection.previous,
                        currentPage,
                        numberOfPages,
                        setCurrentPage,
                    )} />
                <CarouselDots
                    items={items || []}
                    numberOfDots={numberOfPages}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    options={options}
                />
                <CarouselArrowButton
                    options={options}
                    currentPage={currentPage}
                    numberOfDots={numberOfPages}
                    direction={ArrowButtonDirection.next}
                    onClick={() => onArrowButtonClick(
                        ArrowButtonDirection.next,
                        currentPage,
                        numberOfPages,
                        setCurrentPage,
                    )}
                />
            </div>
        ) : null
}

export const CarouselNavigationMemoized = React.memo(CarouselNavigation);