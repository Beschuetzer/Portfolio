import React from 'react'
import { CLASSNAME__NAVIGATION } from '../constants'
import { ArrowButtonDirection, CarouselOptions } from '../types'
import { onArrowButtonClick } from '../utils'
import { CarouselArrowButton } from './CarouselArrowButton'
import { CarouselDots } from './CarouselDots'
import { useBusinessLogic } from '../hooks/useBusinessLogic'
import { CarouselItemProps } from './CarouselItem'

type CarouselNaviagtionProps = {
    currentPage: number;
    items?: CarouselItemProps[];
    numberOfPages: number;
    options: CarouselOptions;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CarouselNavigation = (props: CarouselNaviagtionProps) => {
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