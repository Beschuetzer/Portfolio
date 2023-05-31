import { ReactNode, forwardRef, useEffect, useRef, useState, useImperativeHandle, useCallback, useLayoutEffect } from 'react'
import { getClassname } from '../../../utils'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { useCarouselContext } from '../../../context';

type CarouselItemViewerContainerProps = {
    children: ReactNode | ReactNode[];
    onClick?: () => void;
}

const CURRENT_INTERVAL_INITIAL = 0;
const HAS_CURRENT_ITEM_INDEX_CHANGED_INITIAL = false;
const HEIGHT_INITIAL = 0;
const DATA_POINT_COLLECTION_INTERVAL = 50;
const NUMBER_OF_DATA_POINTS = 25;
export const CarouselItemViewerContainer = forwardRef<any, CarouselItemViewerContainerProps>(({
    children,
    onClick,
}, ref) => {
    const { currentItemIndex } = useCarouselContext();
    const { stylingLogic, optionsLogic } = useBusinessLogic({});
    const heightsRef = useRef<number[]>([]);
    const [height, setHeight] = useState(HEIGHT_INITIAL);
    const intervalRef = useRef<any>(-1);
    const hasCurrentItemIndexChangedRef = useRef(HAS_CURRENT_ITEM_INDEX_CHANGED_INITIAL);
    const currentInvervalRef = useRef(CURRENT_INTERVAL_INITIAL);
    const itemContainerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => itemContainerRef.current)

    //#region Functions
    const setCurrentMaxHeight = useCallback(() => {
        if (heightsRef?.current?.length === 0) return;
        setHeight(Math.max(...heightsRef.current));
        clearInterval(intervalRef.current)
    }, [])

    const startInterval = useCallback(() => {
        return setInterval(() => {
            // console.log({ itemContainerRef: itemContainerRef.current?.getBoundingClientRect(), currentInvervalRef: currentInvervalRef.current });
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
    //#endregion

    //#region Side FX
    useLayoutEffect(() => {
        reset();
    }, [window.innerWidth, reset]) //need innerwidth as dep here

    useEffect(() => {
        if (currentItemIndex !== 0 && !hasCurrentItemIndexChangedRef.current) {
            hasCurrentItemIndexChangedRef.current = true;
            setCurrentMaxHeight();
        }
    }, [currentItemIndex, setCurrentMaxHeight])

    useEffect(() => {
        if (optionsLogic.isDefaultItemDisplayLocation) return;
        clearInterval(intervalRef.current);
        intervalRef.current = startInterval();

        return () => clearInterval(intervalRef.current);
    }, [currentItemIndex, optionsLogic.isDefaultItemDisplayLocation, startInterval, window.innerWidth]) //need innerwidth as dep here
    //#endregion

    return (
        <div
            ref={itemContainerRef}
            style={stylingLogic.getCarouselItemContainerStyle(height || 'auto')}
            className={getClassname({ elementName: 'item-container' })}
            onClick={onClick} >
            {children}
        </div>
    )
});