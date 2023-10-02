import { ReactNode, forwardRef, useEffect, useRef, useImperativeHandle, useCallback, useLayoutEffect } from 'react'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { useCarouselContext } from '../../../context';
import { useRenderCount } from '../../../hooks/useRenderCountRef';
import { CLASSNAME__ITEM_CONTAINER, ITEM_CONTAINER_HEIGHT_INITIAL, ITEM_CONTAINER_MIN_DEFAULT, USE_RECOMMENDEDED_ASPECT_RATIO_INITIAL } from '../../../constants';
import { getBoundValue, getMostFrequentItem } from '../../../utils/utils';
import { useOnResize } from '../../../hooks/useOnResize';
import { useRecommendedAspectRatio } from '../../../hooks/useRecommendedAspectRatio';

type CarouselItemViewerContainerProps = {
    children: ReactNode | ReactNode[];
    onClick?: (e: MouseEvent) => void;
}

const CURRENT_INTERVAL_INITIAL = 0;
const DATA_POINT_COLLECTION_INTERVAL = 25;
const HAS_CURRENT_ITEM_INDEX_CHANGED_INITIAL = false;
const LAST_VIEWPORT_WIDTH_REF_INITIAL = 0;
const NUMBER_OF_DATA_POINTS = 15;
const RESIZE_TIMEOUT_DURATION = 500;
export const CarouselItemViewerContainer = forwardRef<any, CarouselItemViewerContainerProps>((props, ref) => {
    const {
        children,
        onClick,
    } = props;
    const { currentItemIndex, isFullscreenMode, itemContainerHeight, setItemContainerHeight, items } = useCarouselContext();
    const { stylingLogic, optionsLogic } = useBusinessLogic();
    const heightsRef = useRef<number[]>([]);
    const intervalRef = useRef<any>(-1);
    const resizeTimeOutRef = useRef<any>();
    const hasCurrentItemIndexChangedRef = useRef(HAS_CURRENT_ITEM_INDEX_CHANGED_INITIAL);
    const currentInvervalRef = useRef(CURRENT_INTERVAL_INITIAL);
    const itemContainerRef = useRef<HTMLDivElement>(null);
    const lastViewportWidthRef = useRef(LAST_VIEWPORT_WIDTH_REF_INITIAL);
    const renderCountRef = useRenderCount();
    useImperativeHandle(ref, () => itemContainerRef.current)
    const recommendedAspectRatio = useRecommendedAspectRatio(items);

    //#region Functions
    const setHeightAuto = useCallback(() => {
        if (heightsRef?.current?.length === 0) return;
        // console.log({ heightsRef: heightsRef.current, newHEight: getBoundValue(getMostFrequentItem(heightsRef.current), ITEM_CONTAINER_MIN_DEFAULT, optionsLogic.maxHeight) });
        setItemContainerHeight(Math.ceil(getBoundValue(getMostFrequentItem(heightsRef.current), ITEM_CONTAINER_MIN_DEFAULT, optionsLogic.maxHeight)));
        clearInterval(intervalRef.current);
    }, [optionsLogic.maxHeight, setItemContainerHeight])

    /**
    *@param aspectRatio - a decimal value representing an aspect ratio (e.g. 4:3 => 3/4 => .75)
    **/
    const setHeightBasedOnAspectRatio = useCallback((aspectRatio: number) => {
        const itemContainerWidth = itemContainerRef.current?.getBoundingClientRect().width || 0;

        const subContainer = itemContainerRef.current?.querySelector('div');
        const paddingLeft = parseInt(subContainer?.style.paddingLeft || '20', 10);
        const paddingRight = parseInt(subContainer?.style.paddingRight || '20', 10);
        const availableWidth = itemContainerWidth - paddingLeft - paddingRight;
        if (availableWidth < 0) return false;
        setItemContainerHeight(Math.ceil(availableWidth * aspectRatio));
        return true;
    }, [setItemContainerHeight])

    const startAutoHeightInterval = useCallback(() => {
        const itemViewerAspectRatio = optionsLogic.itemViewerAspectRatio;
        if (!optionsLogic.itemViewerUseRecommendedAspectRatio && itemViewerAspectRatio !== 'auto') {
            setHeightBasedOnAspectRatio(itemViewerAspectRatio)
            return;
        }

        return setInterval(() => {
            // console.log({ itemContainerRef: itemContainerRef.current?.getBoundingClientRect(), currentInvervalRef: currentInvervalRef.current, test: 'test' });
            if (currentInvervalRef.current >= NUMBER_OF_DATA_POINTS || hasCurrentItemIndexChangedRef.current) {
                clearInterval(intervalRef.current);

                // if (Number(itemContainerHeight) > 0) return;
                if (!hasCurrentItemIndexChangedRef.current) {
                    setHeightAuto();
                }
                return;
            }
            currentInvervalRef.current++;
            const heightLocal = itemContainerRef.current?.getBoundingClientRect().height || ITEM_CONTAINER_HEIGHT_INITIAL;
            if (heightLocal === ITEM_CONTAINER_HEIGHT_INITIAL) return;
            heightsRef.current.push(Math.ceil(heightLocal));
        }, DATA_POINT_COLLECTION_INTERVAL)
    }, [
        optionsLogic.itemViewerAspectRatio,
        optionsLogic.itemViewerUseRecommendedAspectRatio,
        setHeightAuto,
        setHeightBasedOnAspectRatio
    ])

    const resetAutoHeight = useCallback(() => {
        if (
            optionsLogic.itemViewerAspectRatio !== 'auto' ||
            optionsLogic.itemViewerUseRecommendedAspectRatio
        ) return;
        heightsRef.current = [];
        currentInvervalRef.current = CURRENT_INTERVAL_INITIAL;
        hasCurrentItemIndexChangedRef.current = HAS_CURRENT_ITEM_INDEX_CHANGED_INITIAL;
        setItemContainerHeight(ITEM_CONTAINER_HEIGHT_INITIAL);
    }, [optionsLogic.itemViewerAspectRatio, optionsLogic.itemViewerUseRecommendedAspectRatio, setItemContainerHeight])

    const setLastViewportWidth = useCallback(() => {
        lastViewportWidthRef.current = window.innerWidth;
    }, [])
    //#endregion

    //#region Side FX
    useEffect(() => {
        if (currentItemIndex !== 0 && !hasCurrentItemIndexChangedRef.current) {
            hasCurrentItemIndexChangedRef.current = true;
            setHeightAuto();
        }
    }, [currentItemIndex, setHeightAuto])

    useLayoutEffect(() => {
        function onResize() {
            clearTimeout(resizeTimeOutRef.current);
            resizeTimeOutRef.current = setTimeout(() => {
                clearInterval(intervalRef.current);
                if (
                    window.innerWidth !== lastViewportWidthRef.current &&
                    optionsLogic.itemViewerAspectRatio === 'auto' &&
                    !optionsLogic.itemViewerUseRecommendedAspectRatio
                ) {
                    intervalRef.current = startAutoHeightInterval();
                } else if (
                    !isFullscreenMode &&
                    (optionsLogic.itemViewerUseRecommendedAspectRatio || optionsLogic.itemViewerAspectRatio !== 'auto')
                ) {
                    setHeightBasedOnAspectRatio(optionsLogic.itemViewerUseRecommendedAspectRatio ? recommendedAspectRatio : optionsLogic.itemViewerAspectRatio as number);
                }
                setLastViewportWidth();
            }, RESIZE_TIMEOUT_DURATION)
        }

        window.addEventListener('resize', onResize);

        if (
            optionsLogic.isDefaultItemDisplayLocation ||
            renderCountRef.current < 0 ||
            window.innerWidth === lastViewportWidthRef.current ||
            isFullscreenMode
        ) {
            clearInterval(intervalRef.current);
            return;
        };
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
            clearInterval(intervalRef.current);
        }
    }, [
        isFullscreenMode,
        itemContainerHeight,
        optionsLogic.isDefaultItemDisplayLocation,
        optionsLogic.itemViewerAspectRatio,
        optionsLogic.itemViewerUseRecommendedAspectRatio,
        recommendedAspectRatio,
        renderCountRef,
        setHeightBasedOnAspectRatio,
        setLastViewportWidth,
        startAutoHeightInterval
    ])

    useOnResize(() => {
        if (isFullscreenMode) return;
        resetAutoHeight();
    })

    useEffect(() => {
        if (optionsLogic.itemViewerUseRecommendedAspectRatio) {
            if (recommendedAspectRatio < USE_RECOMMENDEDED_ASPECT_RATIO_INITIAL) {
                setHeightBasedOnAspectRatio(recommendedAspectRatio);
                return;
            }
        } else {
            intervalRef.current = startAutoHeightInterval();
        }
        return () => clearInterval(intervalRef.current);
    }, [setHeightBasedOnAspectRatio, optionsLogic.itemViewerUseRecommendedAspectRatio, recommendedAspectRatio, setItemContainerHeight, startAutoHeightInterval])
    //#endregion

    return (
        <div
            ref={itemContainerRef}
            style={stylingLogic.getCarouselItemContainerStyle(itemContainerHeight)}
            className={CLASSNAME__ITEM_CONTAINER}
            onClick={onClick as any} >
            {children}
        </div>
    )
});