import { CarouselElementTuple } from "../types";
import { getCurrentValue } from "../utils/getCurrentValue"


describe('getCurrentValue', () => {
    let windowSpy: jest.SpyInstance;
    let itemsWithNoGap: CarouselElementTuple<number>;
    let itemsWithGap:  CarouselElementTuple<number>;
    let itemsWithUnknownType:  CarouselElementTuple<number>;
    let itemsWithBooleans:  CarouselElementTuple<boolean>;
    let itemsWithObjects:  CarouselElementTuple<object>;
    let itemBasic: number;
    const defaultNumberValue = -1;
    const defaultBooleanValue = false;
    const defaultObjectValue = {default: true};

    beforeEach(() => {
        windowSpy = jest.spyOn(window, "window", "get");
        itemsWithNoGap = [[4, 500, 'max-width'], [3], [2, 700, 'min-width'], [1, 1200, 'min-width'], [0, 750]];
        itemsWithGap = [[-5, 500, 'max-width'], [1.1], [2.1, 900, 'min-width'], [3.1, 1200, 'min-width'], [4.1, 750]];
        itemsWithUnknownType = [[0.1, 500, 'max-width'], [1.1], [2.1, 900, undefined], [3.1, 1200, 'min-width'], [4.1, 750]];
        itemsWithBooleans = [[true, 500, 'max-width'], [true], [true, 900, undefined], [false, 1200, 'min-width'], [false, 750]];
        itemsWithObjects = [[{key: false}, 500, 'max-width'], [{key: true}], [{key: 1}, 900, undefined], [{key: 2}, 1200, 'min-width'], [{key: 'test'}, 750]];
        itemBasic = 10;
    });

    afterEach(() => {
        windowSpy.mockRestore();
    });

    //#region Core Value Picking
    it('Picks Basic Item', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 751
        }));

        const actual = getCurrentValue(
            itemBasic,
            defaultNumberValue,
            true
        )
        const expected = itemBasic;
        expect(actual).toBe(expected)
    })

    it('Picks Default at gap start', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 751
        }));

        const actual = getCurrentValue(
            itemsWithGap,
            defaultNumberValue,
            true
        )
        const expected = itemsWithGap[1][0]
        expect(actual).toBe(expected)
    })

    it('Picks Default at gap end', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 899
        }));

        const actual = getCurrentValue(
            itemsWithGap,
            defaultNumberValue,
            true
        )
        const expected = itemsWithGap[1][0]
        expect(actual).toBe(expected)
    })

    it('Value Picking Lowest', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 1
        }));

        const actual = getCurrentValue(
            itemsWithNoGap,
            defaultNumberValue,
            true
        )
        const expected = itemsWithNoGap[0][0]
        expect(actual).toBe(expected)
    })

    it('Value Picking - At breakpoint', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 500
        }));

        const actual = getCurrentValue(
            itemsWithNoGap,
            defaultNumberValue,
            true
        )
        const expected = itemsWithNoGap[0][0]
        expect(actual).toBe(expected)
    })

    it('Value Picking - Above breakpoint', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 501
        }));

        const actual = getCurrentValue(
            itemsWithNoGap,
            defaultNumberValue,
            true
        )
        const expected = itemsWithNoGap[itemsWithNoGap.length - 1][0]
        expect(actual).toBe(expected)
    })

    it('Value Picking - 751', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 751
        }));

        const actual = getCurrentValue(
            itemsWithNoGap,
            defaultNumberValue,
            true
        )
        const expected = itemsWithNoGap[2][0]
        expect(actual).toBe(expected)
    })

    it('Value Picking - 1200', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 1200
        }));

        const actual = getCurrentValue(
            itemsWithNoGap,
            defaultNumberValue,
            true
        )
        const expected = itemsWithNoGap[3][0]
        expect(actual).toBe(expected)
    })
    
    it('Max-Width over Min-Width', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 725
        }));

        const actual = getCurrentValue(
            itemsWithNoGap,
            defaultNumberValue,
            true
        )
        const expected = itemsWithNoGap[4][0]
        expect(actual).toBe(expected)
    })

    it('Handles negative numbers', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 1
        }));

        const actual = getCurrentValue(
            itemsWithGap,
            defaultNumberValue,
            true
        )
        const expected = itemsWithGap[0][0]
        expect(actual).toBe(expected)
    })

    it('Handles Booleans - true', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 1
        }));

        const actual = getCurrentValue(
            itemsWithBooleans,
            defaultBooleanValue,
            true
        )
        const expected = itemsWithBooleans[0][0]
        expect(actual).toBe(expected)
    })

    it('Handles Booleans - false', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 750
        }));

        const actual = getCurrentValue(
            itemsWithBooleans,
            !defaultBooleanValue,
            true
        )
        const expected = itemsWithBooleans[itemsWithBooleans.length -1 ][0]
        expect(actual).toBe(expected)
    })

    it('Handles Object Types', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 750
        }));

        const actual = getCurrentValue(
            itemsWithObjects,
            defaultObjectValue,
            true
        )
        const expected = itemsWithObjects[itemsWithObjects.length -1 ][0]
        expect(actual).toBe(expected)
    })
    //#endregion

    //#region Handling Errors
    it('Unknown Types', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 900
        }));

        const actual = getCurrentValue(
            itemsWithUnknownType,
            defaultNumberValue,
            true
        )
        const expected = itemsWithUnknownType[2][0];
        expect(actual).toBe(expected)
    })
    //#endregion

    //#region Handles Fullscreen vs NonFullscreen
    it('Fullscreen Specified - is fullscreen', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 100
        }));

        const actual = getCurrentValue(
            { fullscreen: itemsWithNoGap },
            defaultNumberValue,
            true
        )
        const expected = itemsWithNoGap[0][0]
        expect(actual).toBe(expected)
    })

    it('Fullscreen Specified - is not fullscreen', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 900
        }));

        const actual = getCurrentValue(
            { fullscreen: itemsWithNoGap },
            defaultNumberValue,
            false
        )
        const expected = defaultNumberValue
        expect(actual).toBe(expected)
    })

    it('NonFullscreen Specified - is not fullscreen', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 100
        }));

        const actual = getCurrentValue(
            { nonFullscreen: itemsWithNoGap },
            defaultNumberValue,
            false
        )
        const expected = itemsWithNoGap[0][0]
        expect(actual).toBe(expected)
    })

    it('NonFullscreen Specified - is fullscreen', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 900
        }));

        const actual = getCurrentValue(
            { nonFullscreen: itemsWithNoGap },
            defaultNumberValue,
            true
        )
        const expected = defaultNumberValue;
        expect(actual).toBe(expected)
    })

    it('both specified - is not fullscreen', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 900
        }));

        const actual = getCurrentValue(
            { nonFullscreen: itemsWithNoGap, fullscreen: itemsWithGap },
            defaultNumberValue,
            false
        )
        const expected = itemsWithNoGap[2][0]
        expect(actual).toBe(expected)
    })

    it('both specified - is fullscreen', () => {
        windowSpy.mockImplementation(() => ({
            innerWidth: 900
        }));

        const actual = getCurrentValue(
            { nonFullscreen: itemsWithNoGap, fullscreen: itemsWithGap },
            defaultNumberValue,
            true
        )
        const expected = itemsWithGap[2][0]
        expect(actual).toBe(expected)
    })
    //#endregion
})