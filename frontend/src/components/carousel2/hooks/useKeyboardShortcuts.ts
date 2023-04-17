import { useEffect } from "react";

export enum ModifierKey {
    ctrl = 'ctrl',
    alt = 'alt',
    shift = 'shift',
}
enum AlphanumericKey {
    a = 'a',
    b = 'b',
    c = 'c',
    d = 'd',
    e = 'e',
    f = 'f',
    g = 'g',
    h = 'h',
    i = 'i',
    j = 'j',
    k = 'k',
    l = 'l',
    m = 'm',
    n = 'n',
    o = 'o',
    p = 'p',
    q = 'q',
    r = 'r',
    s = 's',
    t = 't',
    u = 'u',
    v = 'v',
    w = 'w',
    x = 'x',
    y = 'y',
    z = 'z',
}

type KeyboardShortcut = {
    action: () => void;
    key: keyof typeof AlphanumericKey;
    modifier?: keyof typeof ModifierKey;
}

/*
*If Skip condition resolves to true, then handleKeyDown() is short-circuited
*/
export const useKeyboardShortcuts = (keyboardShortcuts: KeyboardShortcut[], skipCondition?: () => boolean) => {
    useEffect(() => {
        function getAreModifiersEqual(modifier: keyof typeof ModifierKey | undefined, isCtrlKeyPressed: boolean, isAltKeyPressed: boolean, isShiftKeyPressed: boolean) {
            if (modifier === undefined || modifier === null) return true;
            if (isCtrlKeyPressed && modifier === 'ctrl') return true;
            if (isShiftKeyPressed && modifier === 'shift') return true;
            if (isAltKeyPressed && modifier === 'alt') return true;
            return false;
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (skipCondition && skipCondition()) return;
            const { key: keyPressed, altKey: isAltKeyPressed, ctrlKey: isCtrlKeyPressed, shiftKey: isShiftKeyPressed } = e;

            const shortcutsToCheck: KeyboardShortcut[] = [];
            for (const keyboardShortcut of keyboardShortcuts) {
                const { key, modifier } = keyboardShortcut;
                const areModifiersEqual = getAreModifiersEqual(modifier, isCtrlKeyPressed, isAltKeyPressed, isShiftKeyPressed);
                const areKeysEqual = key?.toLowerCase() === keyPressed.toLowerCase();

                if (areKeysEqual && areModifiersEqual) {
                    shortcutsToCheck.push(keyboardShortcut);
                }   
            }

            if (shortcutsToCheck.length === 1) {
                const { action } = shortcutsToCheck[0];
                action && action();
            } else {
                for (const shortcut of shortcutsToCheck) {
                    const shortcutHasModifier = !!shortcut?.modifier || false;
                    if (!shortcutHasModifier) continue;
                    const { action } = shortcut;
                    action && action();
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [keyboardShortcuts])
}