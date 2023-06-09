import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { capitalize, getClassname, getIsMobile, getShortcutsString } from '../../../utils'
import { KeyInput } from '../../../hooks/useKeyboardShortcuts';
import { CLASSNAME__DISPLAY_NONE } from '../../../constants';

export type CarouselItemViewerShortcutIndicatorProps = {
    actionName: string;
    children: ReactNode | ReactNode[];
    isShortcutVisible?: boolean;
    isVisible?: boolean;
    position?: 'left' | 'center' | 'right';
    shortcuts?: KeyInput[];

    /*
    *This is needed to be able to pass the refs while hiding the button (conditional null rendering doesn't work)
    */
    showButton?: boolean;
}

const TIMEOUT_DURATION = 1000;
const className = getClassname({ elementName: 'item-viewer-shortcut-indicator' });
export const CarouselItemViewerShortcutIndicator = ({
    actionName = '',
    children,
    isShortcutVisible = false,
    isVisible = true,
    position = 'center',
    shortcuts = [],
    showButton = true,
}: CarouselItemViewerShortcutIndicatorProps) => {
    const timeoutRef = useRef<any>(null);
    const [hideShortcut, setHideShortcut] = useState(!isShortcutVisible || !actionName)
    const containerStyle = useMemo(() => !showButton ? {
        display: 'none',
    } as React.CSSProperties : {}, [showButton]);
    const isMobile = getIsMobile();

    const commonStyle = useMemo(() => ({
        zIndex: 1000000000000,
    }), []);
    const shortcutStyle = useMemo(() => position === 'left' ? {
        ...commonStyle,
        left: 0,
        right: 'auto',
        transform: 'translate(0%, -50%)',
    } as React.CSSProperties : position === 'right' ? {
        ...commonStyle,
        right: 0,
        left: 'auto',
        transform: 'translate(0%, -50%)',
    } as React.CSSProperties : {}, [commonStyle, position]);
    const hiddenClassName = useMemo(() => isVisible ? "" : CLASSNAME__DISPLAY_NONE, [isVisible]);

    useEffect(() => {
        setHideShortcut(!isShortcutVisible || !actionName);
        if (isMobile) {
            clearInterval(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setHideShortcut(true);
            }, TIMEOUT_DURATION)
        }
    }, [isMobile, isShortcutVisible, actionName])

    return (
        <div className={`${className} ${hiddenClassName}`} style={containerStyle}>
            {hideShortcut ? null : (
                <div style={shortcutStyle}>
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
}