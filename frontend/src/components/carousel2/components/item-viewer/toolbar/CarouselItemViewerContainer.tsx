import { ReactNode, forwardRef, useEffect, useRef, useState, useImperativeHandle, useCallback } from 'react'
import { getClassname } from '../../../utils'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { useCarouselContext } from '../../../context';

type CarouselItemViewerContainerProps = {
    children: ReactNode | ReactNode[];
    onClick?: () => void;
}

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
    const [shouldSetHeight, setShouldSetHeight] = useState(false);
    const intervalRef = useRef<any>(-1);
    const hasCurrentItemIndexChangedRef = useRef(false);
    const currentInvervalRef = useRef(0);
    const itemContainerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => itemContainerRef.current)

    //#region Functions
    const setCurrentMaxHeight = useCallback(() => {
        if (heightsRef?.current?.length === 0) return;
        setHeight(Math.max(...heightsRef.current));
        setShouldSetHeight(false);
        clearInterval(intervalRef.current)
    }, [])
    //#endregion

    //#region Side FX
    useEffect(() => {
        if (currentItemIndex !== 0 && !hasCurrentItemIndexChangedRef.current) {
            hasCurrentItemIndexChangedRef.current = true;
            setCurrentMaxHeight();
        }
    }, [currentItemIndex, setCurrentMaxHeight])

    useEffect(() => {
        if (optionsLogic.isDefaultItemDisplayLocation) return;
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (currentInvervalRef.current > NUMBER_OF_DATA_POINTS || hasCurrentItemIndexChangedRef.current) {
                clearInterval(intervalRef.current);
                if (!hasCurrentItemIndexChangedRef.current) {
                    setShouldSetHeight(true);
                }
                return;
            }
            currentInvervalRef.current++;
            const heightLocal = itemContainerRef.current?.getBoundingClientRect().height || HEIGHT_INITIAL;
            // console.log({ itemContainerRef: itemContainerRef.current?.getBoundingClientRect(), heightLocal, currentInvervalRef: currentInvervalRef.current });
            if (heightLocal === HEIGHT_INITIAL) return;
            heightsRef.current.push(heightLocal);
        }, DATA_POINT_COLLECTION_INTERVAL)

        return () => clearInterval(intervalRef.current);
    }, [currentItemIndex, optionsLogic.isDefaultItemDisplayLocation])

    useEffect(() => {
        if (!shouldSetHeight) return;
        setCurrentMaxHeight();
    }, [shouldSetHeight, setCurrentMaxHeight])
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