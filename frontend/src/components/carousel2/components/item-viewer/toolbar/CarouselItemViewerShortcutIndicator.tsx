import React, { ReactNode } from 'react'
import { capitalize, getClassname, getShortcutsString } from '../../../utils'
import { KeyInput } from '../../../hooks/useKeyboardShortcuts';

export type CarouselItemViewerShortcutIndicatorProps = {
    actionName: string;
    children: ReactNode | ReactNode[];
    isShortcutVisible?: boolean;
    shortcutPosition?: 'left' | 'center' | 'right';
    shortcuts: KeyInput[];
}

const className = getClassname({ elementName: 'item-viewer-shortcut-indicator' });
export const CarouselItemViewerShortcutIndicator = ({
    actionName = '',
    children,
    isShortcutVisible = false,
    shortcutPosition: position = 'center',
    shortcuts = [],
}: CarouselItemViewerShortcutIndicatorProps) => {
    const hideShortcut = !isShortcutVisible || !actionName || shortcuts.length === 0;
    const style = position === 'left' ? {
        left: 0,
        right: 'auto',
        transform: 'translate(0%, -50%)',
    } as React.CSSProperties : position === 'right' ? {
        right: 0,
        left: 'auto',
        transform: 'translate(0%, -50%)',
    } as React.CSSProperties : {};

    return (
        <div className={className}>
            {hideShortcut ? null : (
                <div style={style}>
                    <p>
                        {capitalize(actionName)} ({getShortcutsString(shortcuts)})
                    </p>
                </div>
            )}
            {children}
        </div>
    )
}