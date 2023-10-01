// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArrowButtonDirection, CarouselNavigationOptions } from '../types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CarouselProps } from './Carousel';
import {
    CAROUSEL_ITEM_SPACING_DEFAULT,
    CLASSNAME__GRABBING,
    CURRENT_ITEM_INDEX_INITIAL,
    GET_CURRENT_VALUE_DEFAULT,
    TRANSLATION_AMOUNT_INITIAL
} from '../constants';
import {
    CarouselContextInputProps,
    useCarouselContext
} from '../context';
import {
    getNumberOfItemsThatCanFit,
    getNumberOfPages,
    onArrowButtonClick
} from '../utils/utils';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { StylingCase, useOnSwipe } from '../hooks/useOnSwipe';
import { CarouselItemToRender } from './CarouselItemToRender';
import { CarouselNavigationMemoized } from './CarouselNavigation';
import { CarouselItems } from './CarouselItems';

/**
*Tracks why the translation amount changed.  
*Used to fix issue with translation amount when {@link CarouselNavigationOptions.isLastPageFlush isLastPageFlush} is `true`.
**/
export enum TranslationAmountChange {
    currentItemIndex,
    currentPage,
    isLastPageFlushAdjustment,
    swipe,
    none,
}
type CarouselContentProps = {} & Omit<CarouselProps, 'style' | 'onItemChange'> & Pick<CarouselContextInputProps, 'carouselContainerRef'>;

const WINDOW_RESIZE_DEBOUNCE_INTERVAL = 100;
export const CarouselContent = (props: CarouselContentProps) => {
    //#region Init
    const {
        carouselContainerRef,
        items,
        options,
    } = props;
    const { currentItemIndex, numberOfPages, setNumberOfPages, isFullscreenMode, setIsFullscreenMode, currentPage, setCurrentPage } = useCarouselContext();
    const {
        optionsLogic,
        stylingLogic,
    } = useBusinessLogic();
    const hasCalculatedNumberOfDotsRef = useRef(false);
    const hasCalculatedItemSpacingRef = useRef(false);
    const resizeWindowDebounceRef = useRef<any>();
    const translationAmountDifferenceRef = useRef(0);
    const itemsContainerInnerRef = useRef<HTMLDivElement>(null);
    const previousCurrentItemIndexRef = useRef(CURRENT_ITEM_INDEX_INITIAL);
    const translationAmountChangeRef = useRef<TranslationAmountChange>(TranslationAmountChange.none);
    const isLastPage = useMemo(() => currentPage + 1 === numberOfPages, [currentPage, numberOfPages]);
    const [hasForcedRender, setHasForcedRender] = useState(false); //used to force layout calculation initially
    const [interItemSpacing, setInterItemSpacing] = useState(optionsLogic.getThumbnailSpacing());
    const [translationAmount, setTranslationAmount] = useState(TRANSLATION_AMOUNT_INITIAL);
    useOnSwipe({
        element: itemsContainerInnerRef.current as HTMLElement,
        isDisabled: optionsLogic.isNavigationSwipingDisabled,
        maxClickThreshold: optionsLogic.navigationMaxClickThreshold,
        swipeHandlers: {
            left: {
                callback: () => {
                    if (optionsLogic.isWrappingDisabled && currentPage === 0) {
                        return;
                    };
                    onArrowButtonClick(
                        ArrowButtonDirection.previous,
                        currentPage,
                        numberOfPages,
                        setCurrentPage,
                    )
                },
            },
            right: {
                callback: () => {
                    if (optionsLogic.isWrappingDisabled && currentPage === (numberOfPages - 1)) {
                        return;
                    };
                    onArrowButtonClick(
                        ArrowButtonDirection.next,
                        currentPage,
                        numberOfPages,
                        setCurrentPage,
                    )
                },
            },
            onMoveWhenGrabbing(xDiff, yDiff) {
                translationAmountChangeRef.current = TranslationAmountChange.swipe;
                setTranslationAmount((current) => {
                    const offset = xDiff;
                    if (optionsLogic.isWrappingDisabled && current <= 0 && offset >= 0) return current;
                    if (optionsLogic.isWrappingDisabled && currentPage === (numberOfPages - 1) && offset <= 0) return current;
                    return current - offset;
                });
            },
        },
        handleStyleChanges: (styleCase: StylingCase, element: HTMLElement) => {
            if (!element || numberOfPages <= 1) return;
            if (styleCase === 'start') {
                document.body.classList.add(CLASSNAME__GRABBING);
                element.classList.add(CLASSNAME__GRABBING)
            } else {
                document.body.classList.remove(CLASSNAME__GRABBING);
                element.classList.remove(CLASSNAME__GRABBING)
            }
        }
    })
    //#endregion

    //#region Functions/Handlers
    const getInterItemSpacing = useCallback(() => {
        //if there is itemSpacing is defined, the dynamic behavior is disabled
        if (options?.thumbnail?.spacing !== undefined) {
            const currentItemSpacing = optionsLogic.getThumbnailSpacing(GET_CURRENT_VALUE_DEFAULT);
            if (currentItemSpacing >= GET_CURRENT_VALUE_DEFAULT) return currentItemSpacing;
        }
        const { numberOfWholeItemsThatCanFit, containerWidth, itemSize } = getNumberOfItemsThatCanFit(
            items.length, carouselContainerRef?.current as HTMLElement, stylingLogic, optionsLogic
        );
        const numberOfGaps = numberOfWholeItemsThatCanFit - 1;
        const remainingSpace = containerWidth - (numberOfWholeItemsThatCanFit * itemSize);
        //numberOfGaps logic needed to prevent crashing at smaller viewport, since divide by <= 0 
        const newInterItemSpacing = (remainingSpace / (numberOfGaps <= 0 ? 1 : numberOfGaps));
        return newInterItemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT;
    }, [options?.thumbnail?.spacing, items.length, carouselContainerRef, stylingLogic, optionsLogic]);

    const doTranslationAmountCommon = useCallback(() => {
        const interItemSpacingToUse = optionsLogic.getThumbnailSpacingBasedOnThumbnailPositioning(interItemSpacing);
        const isDefaultCase = options?.thumbnail?.spacing === undefined && optionsLogic.thumbnailPositioning === undefined;
        const { numberOfWholeItemsThatCanFit, containerWidth, itemSize } = getNumberOfItemsThatCanFit(
            items.length, carouselContainerRef?.current as HTMLElement, stylingLogic, optionsLogic
        );
        const defaultAmount = interItemSpacingToUse + containerWidth;

        if (isDefaultCase) {
            translationAmountDifferenceRef.current = containerWidth + interItemSpacing;
        } else if (interItemSpacingToUse !== undefined && interItemSpacingToUse >= 0) {
            if (interItemSpacingToUse === 0) {
                translationAmountDifferenceRef.current = numberOfWholeItemsThatCanFit * itemSize;
            }
            else if (!translationAmountDifferenceRef.current) {
                translationAmountDifferenceRef.current = numberOfWholeItemsThatCanFit * itemSize + (numberOfWholeItemsThatCanFit) * interItemSpacingToUse
            }
        } else if (numberOfWholeItemsThatCanFit <= 1) {
            translationAmountDifferenceRef.current = containerWidth;
        } else {
            translationAmountDifferenceRef.current = defaultAmount;
        }

        return { numberOfWholeItemsThatCanFit, containerWidth, itemSize };
    }, [
        carouselContainerRef,
        interItemSpacing,
        items.length,
        options?.thumbnail?.spacing,
        optionsLogic,
        stylingLogic
    ])

    const getLastPageOffset = useCallback((numberOfWholeItemsThatCanFit: number, itemSize: number) => {
        let offset = 0;
        if (numberOfPages > 1 && currentPage === numberOfPages - 1 && items?.length > 0) {
            const numberOfAlreadyDisplayedItems = currentPage * numberOfWholeItemsThatCanFit;
            const numberOfRemainingItems = items.length - numberOfAlreadyDisplayedItems;
            const widthOfRemainingSpaces = numberOfRemainingItems * optionsLogic.getThumbnailSpacingBasedOnThumbnailPositioning(interItemSpacing);
            const widthOfRemainingItems = numberOfRemainingItems * itemSize;
            offset = (translationAmountDifferenceRef.current - (widthOfRemainingSpaces + widthOfRemainingItems))
        }
        return offset;
    }, [currentPage, interItemSpacing, items.length, numberOfPages, optionsLogic])

    const getTranslationAmountByCurrentPage = useCallback(() => {
        doTranslationAmountCommon();
        return currentPage * translationAmountDifferenceRef.current;
    }, [currentPage, doTranslationAmountCommon]);

    const getTranslationAmountByCurrentItemIndex = useCallback(() => {
        const { numberOfWholeItemsThatCanFit } = doTranslationAmountCommon();
        const newCurrentPage = Math.floor(currentItemIndex / numberOfWholeItemsThatCanFit);
        setCurrentPage(newCurrentPage);
        return newCurrentPage * translationAmountDifferenceRef.current;
    }, [currentItemIndex, setCurrentPage, doTranslationAmountCommon]);

    const setNumberOfDotsToDisplay = useCallback(() => {
        const newNumberOfPages = getNumberOfPages(
            carouselContainerRef?.current as HTMLElement, items.length, stylingLogic, optionsLogic
        );
        setNumberOfPages && setNumberOfPages(newNumberOfPages);
        if (currentPage >= newNumberOfPages) {
            setCurrentPage(newNumberOfPages - 1);
        }
    }, [carouselContainerRef, items.length, stylingLogic, optionsLogic, setNumberOfPages, currentPage, setCurrentPage])
    //#endregion

    //#region Side Fx
    //have to reset hasCalculatedItemSpacingRef if the dependencies for the getInterItemSpacing callback change
    useEffect(() => {
        hasCalculatedItemSpacingRef.current = false;
    }, [options?.thumbnail, carouselContainerRef, hasCalculatedItemSpacingRef])

    useEffect(() => {
        if (!hasForcedRender) return setHasForcedRender(true);
        else if (hasCalculatedItemSpacingRef.current) return;
        hasCalculatedItemSpacingRef.current = true;
        setInterItemSpacing(getInterItemSpacing());
    }, [hasForcedRender, setHasForcedRender, setInterItemSpacing, getInterItemSpacing, hasCalculatedItemSpacingRef])

    useEffect(() => {
        if (hasCalculatedNumberOfDotsRef.current) return;
        setNumberOfDotsToDisplay();
        hasCalculatedNumberOfDotsRef.current = true;
    }, [hasCalculatedNumberOfDotsRef, setNumberOfDotsToDisplay])

    useEffect(() => {
        function handleResize() {
            clearTimeout(resizeWindowDebounceRef.current);
            resizeWindowDebounceRef.current = setTimeout(() => {
                translationAmountDifferenceRef.current = 0;
                setNumberOfDotsToDisplay();
                setInterItemSpacing(getInterItemSpacing());
            }, WINDOW_RESIZE_DEBOUNCE_INTERVAL)
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [setNumberOfDotsToDisplay, setInterItemSpacing, getInterItemSpacing, getTranslationAmountByCurrentPage, setCurrentPage])

    //Tracking the itemViewer item and moving the corresponding carousel to match the page the item is on
    useEffect(() => {
        if (
            (!isFullscreenMode && optionsLogic.isDefaultItemDisplayLocation) ||
            items?.length <= 0 ||
            (optionsLogic.autoChangePage === false)
        ) {
            return;
        }
        if (previousCurrentItemIndexRef.current === currentItemIndex) {
            return
        }

        const { numberOfWholeItemsThatCanFit } = getNumberOfItemsThatCanFit(
            items.length, carouselContainerRef?.current as HTMLElement, stylingLogic, optionsLogic
        );
        const currentNthItem = currentItemIndex + 1;
        const isNextItemClick = getIsNextItemClick();
        const lastItemInViewIndex = currentPage * numberOfWholeItemsThatCanFit + numberOfWholeItemsThatCanFit;
        const firstItemInViewIndex = currentPage * numberOfWholeItemsThatCanFit + 1;
        // console.log({ currentNthItem, lastItemInViewIndex, isNextItemClick, currentPage, numberOfWholeItemsThatCanFit, previousCurrentItemIndexRef: previousCurrentItemIndexRef.current, itemsLEngth: items.length});
        if (isNextItemClick) {
            if (currentNthItem === 1 && previousCurrentItemIndexRef.current === items.length - 1) {
                setCurrentPage(0);
            }
            else if (currentNthItem > lastItemInViewIndex) {
                setCurrentPage(currentPage + 1);
            }
        } else {
            if (currentNthItem >= items.length) {
                setCurrentPage(numberOfPages - 1);
            }
            else if (currentNthItem < firstItemInViewIndex) {
                setCurrentPage(currentPage - 1);
            }
        }

        previousCurrentItemIndexRef.current = currentItemIndex;

        function getIsNextItemClick() {
            if (previousCurrentItemIndexRef.current === 0 && currentNthItem === items.length) return false;
            else if (previousCurrentItemIndexRef.current === items.length - 1 && currentItemIndex === 0) return true;
            return previousCurrentItemIndexRef.current < currentItemIndex;
        }
    }, [
        carouselContainerRef,
        currentPage,
        items,
        optionsLogic,
        stylingLogic,
        numberOfPages,
        currentItemIndex,
        previousCurrentItemIndexRef,
        isFullscreenMode,
        setCurrentPage,
    ])

    //need to track the previous item index whenever an item is opened
    //needed for the above useEffect to work correctly
    useEffect(() => {
        previousCurrentItemIndexRef.current = currentItemIndex;
    }, [items, currentItemIndex])

    //resetting state when exiting full screen via esc key
    useEffect(() => {
        function handleFullscreenChange() {
            //@ts-ignore
            const wasFullscreen = !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement;
            if (wasFullscreen) {
                setIsFullscreenMode(false);
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        }
    }, [setIsFullscreenMode])

    //updating translation amount
    useEffect(() => {
        if (!optionsLogic.autoChangePage || translationAmountChangeRef?.current !== TranslationAmountChange.currentPage) return;
        translationAmountChangeRef.current = TranslationAmountChange.currentItemIndex;
        const newTranslationAmount = getTranslationAmountByCurrentItemIndex();
        setTranslationAmount(newTranslationAmount);
    }, [optionsLogic.autoChangePage, getTranslationAmountByCurrentItemIndex])

    useEffect(() => {
        if (!optionsLogic.autoChangePage && translationAmountChangeRef?.current === TranslationAmountChange.currentItemIndex) return;
        translationAmountChangeRef.current = TranslationAmountChange.currentPage;
        const newTranslationAmount = getTranslationAmountByCurrentPage();
        setTranslationAmount(newTranslationAmount);
    }, [getTranslationAmountByCurrentPage, optionsLogic.autoChangePage])

    //adjusting the translation amount based on isLastPageFlush
    useEffect(() => {
        if (!optionsLogic.isLastPageFlush) return;
        const { numberOfWholeItemsThatCanFit, itemSize } = getNumberOfItemsThatCanFit(
            items.length, carouselContainerRef?.current as HTMLElement, stylingLogic, optionsLogic
        );
        let offset = getLastPageOffset(numberOfWholeItemsThatCanFit, itemSize);
        if (offset > 0) {
            translationAmountChangeRef.current = TranslationAmountChange.isLastPageFlushAdjustment;
            setTranslationAmount((current) => current - offset);
        }
    }, [carouselContainerRef, currentPage, getLastPageOffset, items.length, optionsLogic, stylingLogic])
    //#endregion

    //#region JSX
    return (
        <>
            {optionsLogic.isItemDisplayLocationAbove ? (
                <CarouselItemToRender />
            ) : null}
            <CarouselItems
                ref={itemsContainerInnerRef}
                interItemSpacing={interItemSpacing}
                translationAmount={translationAmount}
                isLastPage={isLastPage}
                translationAmountChangeRef={translationAmountChangeRef}
                items={items}
            />
            <CarouselNavigationMemoized
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                options={options || {}}
                setCurrentPage={setCurrentPage}
                items={items} numberOfDots={0} />
            {optionsLogic.isItemDisplayLocationBelow ? (
                <CarouselItemToRender />
            ) : null}
        </>
    )
    //#endregion
}