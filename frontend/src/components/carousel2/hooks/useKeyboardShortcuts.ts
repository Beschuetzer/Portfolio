import { useEffect } from "react";
import { stopPropagation } from "../utils/utils";
import { KeyCombination, KeyboardShortcut, ModifierKey } from "../types";

export type UseKeyboardShortcutsInput = {
    keyboardShortcuts: KeyboardShortcut[];
    skipCondition: () => boolean;
}

/**
 *Creates keyboard shortcuts for a component.
 *If {@link UseKeyboardShortcutsInput.skipCondition skipCondition} resolves to `true`, then the listener is not added for that render cycle.
**/
export const useKeyboardShortcuts = (input: UseKeyboardShortcutsInput) => {
    const {
        keyboardShortcuts, 
        skipCondition,
    } = input;
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
            stopPropagation(e);
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
    }, [keyboardShortcuts, shouldSkip, skipCondition])
}