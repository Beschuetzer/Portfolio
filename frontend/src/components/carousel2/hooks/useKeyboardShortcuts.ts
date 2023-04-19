import { useEffect } from "react";

export enum ModifierKey {
    ctrl = 'ctrl',
    alt = 'alt',
    shift = 'shift',

}
export enum ValidKey {
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
    arrowLeft = 'arrowLeft',
    arrowUp = 'arrowUp',
    arrowDown = 'arrowDown',
    arrowRight = 'arrowRight',
    escape = 'escape',
    spacebar = ' ',
}

type KeyCombination = [ModifierKey, ValidKey];
export type KeyInput = ValidKey | KeyCombination;
type KeyboardShortcut = {
    action: () => void;
    keys: KeyInput[];
}

/*
*If Skip condition resolves to true, then the listener is not added for that render cycle
*/
export const useKeyboardShortcuts = (keyboardShortcuts: KeyboardShortcut[], skipCondition?: () => boolean) => {
    const shouldSkip = skipCondition && skipCondition();

    useEffect(() => {
        function getAreModifiersEqual(modifier: (keyof typeof ModifierKey) | undefined, isCtrlKeyPressed: boolean, isAltKeyPressed: boolean, isShiftKeyPressed: boolean) {
            if (
                (modifier === undefined || modifier === null) &&
                !isAltKeyPressed &&
                !isCtrlKeyPressed &&
                !isShiftKeyPressed
            ) return true;
            if (isCtrlKeyPressed && modifier === 'ctrl') return true;
            if (isShiftKeyPressed && modifier === 'shift') return true;
            if (isAltKeyPressed && modifier === 'alt') return true;
            return false;
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (shouldSkip) return;

            let { key: keyPressed, altKey: isAltKeyPressed, ctrlKey: isCtrlKeyPressed, shiftKey: isShiftKeyPressed } = e;
            for (const keyboardShortcut of keyboardShortcuts) {
                const { keys, action } = keyboardShortcut;

                for (const key of keys) {
                    const isKeyArray = Array.isArray(key);
                    const keyToUse = isKeyArray ? key?.[1] : key;
                    const modifierToUse = isKeyArray ? (key as KeyCombination)?.[0] : undefined;
                    const areKeysEqual = keyPressed.toLowerCase() === keyToUse.toLowerCase();

                    if (!areKeysEqual) continue;

                    const areModifiersEqual = getAreModifiersEqual(modifierToUse, isCtrlKeyPressed, isAltKeyPressed, isShiftKeyPressed);
                    if (areKeysEqual && areModifiersEqual) {
                        action && action();
                        return;
                    }
                }


            }
        }

        if (shouldSkip) return;
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [keyboardShortcuts, skipCondition])
}