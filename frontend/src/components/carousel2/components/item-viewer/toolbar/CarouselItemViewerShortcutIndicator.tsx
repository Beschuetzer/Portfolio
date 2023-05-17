import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { capitalize, getClassname, getIsMobile, getShortcutsString } from '../../../utils'
import { KeyInput } from '../../../hooks/useKeyboardShortcuts';

export type CarouselItemViewerShortcutIndicatorProps = {
    actionName: string;
    children: ReactNode | ReactNode[];
    isShortcutVisible?: boolean;
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
    position = 'center',
    shortcuts = [],
    showButton = true,
}: CarouselItemViewerShortcutIndicatorProps) => {
    const timeoutRef = useRef<any>(null);
    const [hideShortcut, setHideShortcut] = useState(!isShortcutVisible || !actionName)
    const containerStyle = !showButton ? {
        display: 'none',
    } as React.CSSProperties : {}
    const isMobile = getIsMobile();

    const commonStyle = {
        zIndex: 1000000000000,
    }
    const shortcutStyle = position === 'left' ? {
        ...commonStyle,
        left: 0,
        right: 'auto',
        transform: 'translate(0%, -50%)',
    } as React.CSSProperties : position === 'right' ? {
        ...commonStyle,
        right: 0,
        left: 'auto',
        transform: 'translate(0%, -50%)',
    } as React.CSSProperties : {};

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
        <div className={className} style={containerStyle}>
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