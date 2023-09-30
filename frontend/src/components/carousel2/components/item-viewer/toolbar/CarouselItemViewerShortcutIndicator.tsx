import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { capitalize, getIsMobile, getShortcutsString } from '../../../utils/utils'
import { CLASSNAME__DISPLAY_NONE, CLASSNAME__ITEM_VIEWER_SHORTCUT_INDICATOR } from '../../../constants';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { KeyInput } from '../../../types';

export type CarouselItemViewerShortcutIndicatorPosition = 'left' | 'center' | 'right';
export type CarouselItemViewerShortcutIndicatorProps = {
    actionName: string;
    children: ReactNode | ReactNode[];
    isShortcutVisible?: boolean;
    isVisible?: boolean;
    position?: CarouselItemViewerShortcutIndicatorPosition;
    shortcuts?: KeyInput[];

    /**
    *This is needed to be able to pass the refs while hiding the button (conditional null rendering doesn't work)
    **/
    showButton?: boolean;
    style?: React.CSSProperties;
}

const TIMEOUT_DURATION = 1000;
export const CarouselItemViewerShortcutIndicator = (props: CarouselItemViewerShortcutIndicatorProps) => {
    const {
        actionName = '',
        children,
        isShortcutVisible = false,
        isVisible = true,
        position = 'center',
        shortcuts = [],
        showButton = true,
        style = {},
    } = props;
    const { stylingLogic } = useBusinessLogic();
    const timeoutRef = useRef<any>(null);
    const [hideShortcut, setHideShortcut] = useState(!isShortcutVisible || !actionName)
    const isMobile = getIsMobile();

    useEffect(() => {
        setHideShortcut(!isShortcutVisible || !actionName);
        if (isMobile) {
            clearInterval(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setHideShortcut(true);
            }, TIMEOUT_DURATION)
        }
    }, [isMobile, isShortcutVisible, actionName])

    //#region JSX
    const hiddenClassName = useMemo(() => isVisible ? "" : CLASSNAME__DISPLAY_NONE, [isVisible]);
    return (
        <div
            className={`${CLASSNAME__ITEM_VIEWER_SHORTCUT_INDICATOR} ${hiddenClassName}`}
            style={{ ...stylingLogic.getCarouselShortcutIndicatorContainerStlye(showButton), ...style }}
        >
            {hideShortcut ? null : (
                <div
                    style={stylingLogic.getCarouselShortcutIndicatorTextStlye(position)}
                >
                    <span>
                        {capitalize(actionName)}
                    </span>
                    {shortcuts.length > 0 ? (
                        <span>
                            &nbsp;({getShortcutsString(shortcuts)})
                        </span>
                    ) : null}
                </div>
            )}
            {children}
        </div>
    )
    //#endregion
}