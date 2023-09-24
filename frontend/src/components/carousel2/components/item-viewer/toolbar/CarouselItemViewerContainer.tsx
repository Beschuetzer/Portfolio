import { ReactNode, forwardRef, useEffect, useRef, useState, useImperativeHandle, useCallback, useLayoutEffect } from 'react'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { useCarouselContext } from '../../../context';
import { useRenderCount } from '../../../hooks/useRenderCountRef';
import { CLASSNAME__ITEM_CONTAINER } from '../../../constants';

type CarouselItemViewerContainerProps = {
    children: ReactNode | ReactNode[];
    onClick?: (e: MouseEvent) => void;
}

const CURRENT_INTERVAL_INITIAL = 0;
const DATA_POINT_COLLECTION_INTERVAL = 200;
const HAS_CURRENT_ITEM_INDEX_CHANGED_INITIAL = false;
const HEIGHT_INITIAL = 0;
const LAST_VIEWPORT_WIDTH_REF_INITIAL = 0;
const NUMBER_OF_DATA_POINTS = 25;
export const CarouselItemViewerContainer = forwardRef<any, CarouselItemViewerContainerProps>((props, ref) => {
    const {
        children,
        onClick,
    } = props;
    const { currentItemIndex, isFullscreenMode } = useCarouselContext();
    const { stylingLogic, optionsLogic } = useBusinessLogic();
    const heightsRef = useRef<number[]>([]);
    const [height, setHeight] = useState(HEIGHT_INITIAL);
    const intervalRef = useRef<any>(-1);
    const hasCurrentItemIndexChangedRef = useRef(HAS_CURRENT_ITEM_INDEX_CHANGED_INITIAL);
    const currentInvervalRef = useRef(CURRENT_INTERVAL_INITIAL);
    const itemContainerRef = useRef<HTMLDivElement>(null);
    const lastViewportWidthRef = useRef(LAST_VIEWPORT_WIDTH_REF_INITIAL);
    const renderCountRef = useRenderCount();
    useImperativeHandle(ref, () => itemContainerRef.current)

    //#region Functions
    const setCurrentMaxHeight = useCallback(() => {
        if (heightsRef?.current?.length === 0) return;
        setHeight(Math.max(...heightsRef.current));
        clearInterval(intervalRef.current)
    }, [])

    const startInterval = useCallback(() => {
        return setInterval(() => {
            // console.log({isFullscreenMode, itemContainerRef: itemContainerRef.current?.getBoundingClientRect(), currentInvervalRef: currentInvervalRef.current, test: 'test' });
            if (currentInvervalRef.current > NUMBER_OF_DATA_POINTS || hasCurrentItemIndexChangedRef.current) {
                clearInterval(intervalRef.current);

                if (!hasCurrentItemIndexChangedRef.current) {
                    setCurrentMaxHeight();
                }
                return;
            }
            currentInvervalRef.current++;
            const heightLocal = itemContainerRef.current?.getBoundingClientRect().height || HEIGHT_INITIAL;
            if (heightLocal === HEIGHT_INITIAL) return;
            heightsRef.current.push(heightLocal);
        }, DATA_POINT_COLLECTION_INTERVAL)
    }, [setCurrentMaxHeight])

    const reset = useCallback(() => {
        heightsRef.current = [];
        currentInvervalRef.current = CURRENT_INTERVAL_INITIAL;
        hasCurrentItemIndexChangedRef.current = HAS_CURRENT_ITEM_INDEX_CHANGED_INITIAL;
        setHeight(HEIGHT_INITIAL);
    }, [])

    const setLastViewportWidth = useCallback(() => {
        lastViewportWidthRef.current = window.innerWidth;
    }, [])
    //#endregion

    //#region Side FX
    useEffect(() => {
        if (currentItemIndex !== 0 && !hasCurrentItemIndexChangedRef.current) {
            hasCurrentItemIndexChangedRef.current = true;
            setCurrentMaxHeight();
        }
    }, [currentItemIndex, setCurrentMaxHeight])

    useLayoutEffect(() => {
        function onResize() {
            setLastViewportWidth();
            if (isFullscreenMode) {
                clearInterval(intervalRef.current);
                return;
            }
            reset();
            clearInterval(intervalRef.current);
            intervalRef.current = startInterval();
        }

        window.addEventListener('resize', onResize);

        if (
            optionsLogic.isDefaultItemDisplayLocation ||
            renderCountRef.current < 0 ||
            window.innerWidth === lastViewportWidthRef.current
        ) return;
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
            clearInterval(intervalRef.current);
        }
    }, [
        isFullscreenMode,
        optionsLogic.isDefaultItemDisplayLocation,
        renderCountRef,
        reset,
        setLastViewportWidth,
        startInterval,
    ]) //need innerwidth as dep here
    //#endregion

    return (
        <div
            ref={itemContainerRef}
            style={stylingLogic.getCarouselItemContainerStyle(height || 'auto')}
            className={CLASSNAME__ITEM_CONTAINER}
            onClick={onClick as any} >
            {children}
        </div>
    )
});