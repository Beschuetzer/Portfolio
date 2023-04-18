import React, { ReactNode } from 'react'
import { getClassname } from '../../../utils'
import { KeyInput } from '../../../hooks/useKeyboardShortcuts';
import { capitalize } from '../../../../../helpers';

export type CarouselItemViewerShortcutIndicatorProps = {
    actionName: string;
    children: ReactNode | ReactNode[];
    isShortcutVisible?: boolean;
    position?: 'left' | 'center' | 'right';
    shortcuts: KeyInput[];
}

const className = getClassname({ elementName: 'item-viewer-shortcut-indicator' });
export const CarouselItemViewerShortcutIndicator = ({
    actionName = '',
    children,
    isShortcutVisible = false,
    position = 'center',
    shortcuts = [],
}: CarouselItemViewerShortcutIndicatorProps) => {
    const hideShortcut = !isShortcutVisible || !actionName || shortcuts.length === 0;

    function getShortcutsString() {
        let result = "";
        for (let i = 0; i < shortcuts.length; i++) {
            const shortcut = shortcuts[i];
            const isLastItem = i === shortcuts.length - 1;
            if (Array.isArray(shortcut)) {
                result += shortcut.join(' + ');
            } else {
                result += shortcut;

            }

            if (!isLastItem) {
                result += ' or '
            }
        }

        return result;
    }

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
                        {capitalize(actionName)} ({getShortcutsString()})
                    </p>
                </div>
            )}
            {children}
        </div>
    )
}