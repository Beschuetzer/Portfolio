import React, { ReactNode } from 'react'
import { capitalize, getClassname, getShortcutsString } from '../../../utils'
import { KeyInput } from '../../../hooks/useKeyboardShortcuts';

export type CarouselItemViewerShortcutIndicatorProps = {
    actionName: string;
    children: ReactNode | ReactNode[];
    isShortcutVisible?: boolean;
    shortcutPosition?: 'left' | 'center' | 'right';
    shortcuts?: KeyInput[];
}

const className = getClassname({ elementName: 'item-viewer-shortcut-indicator' });
export const CarouselItemViewerShortcutIndicator = ({
    actionName = '',
    children,
    isShortcutVisible = false,
    shortcutPosition: position = 'center',
    shortcuts = [],
}: CarouselItemViewerShortcutIndicatorProps) => {
    const hideShortcut = !isShortcutVisible || !actionName;

    const commonStyle = {
        zIndex: 1000000000000,
    }
    const style = position === 'left' ? {
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

    return (
        <div className={className}>
            {hideShortcut ? null : (
                <div style={style}>
                    <span>
                        {capitalize(actionName)}
                    </span>
                    {shortcuts.length > 0 ? (
                        <span>
                            ({getShortcutsString(shortcuts)})
                        </span>
                    ) : null}
                </div>
            )}
            {children}
        </div>
    )
}