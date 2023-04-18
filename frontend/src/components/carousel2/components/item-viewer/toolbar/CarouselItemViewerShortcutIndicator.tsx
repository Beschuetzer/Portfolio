import React, { ReactNode } from 'react'
import { getClassname } from '../../../utils'
import { KeyInput } from '../../../hooks/useKeyboardShortcuts';
import { capitalize } from '../../../../../helpers';

export type CarouselItemViewerShortcutIndicatorProps = {
    children: ReactNode | ReactNode[];
    position?: 'left' | 'center' | 'right';
    shortcuts: KeyInput[];
    actionName: string;
}

const className = getClassname({ elementName: 'item-viewer-shortcut-indicator' });
export const CarouselItemViewerShortcutIndicator = ({
    actionName = '',
    children,
    position = 'center',
    shortcuts = [],
}: CarouselItemViewerShortcutIndicatorProps) => {

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
                result += ', '
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

    if (!actionName || shortcuts.length === 0) return null;
    return (
        <div className={className}>
            <div style={style}>
                <p>
                    {capitalize(actionName)} ({getShortcutsString()})
                </p>
            </div>
            {children}
        </div>
    )
}