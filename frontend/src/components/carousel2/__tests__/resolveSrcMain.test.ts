import { CarouselItemProps } from "../components/CarouselItem";
import { GET_CAROUSEL_VIDEO_DEFAULT, resolveSrcMain } from "../utils/getCarouselVideo";

const defaults: any = {
    description: 'test',
    srcMain: '',
}

const hiResValue = 'highRes';
const loResValue = 'loRes';
const stringValue = 'string';

const stringVersion: CarouselItemProps = {
    ...defaults,
    srcMain: stringValue,
}

const loResOnly: CarouselItemProps = {
    ...defaults,
    srcMain: {
        loRes: loResValue,
    }
}

const hiResOnly: CarouselItemProps = {
    ...defaults,
    srcMain: {
        hiRes: hiResValue,
    }
}

const undefinedVersion: CarouselItemProps = {
    ...defaults,
    srcMain: undefined,
}

const both: CarouselItemProps = {
    ...defaults,
    srcMain: {
        hiRes: hiResValue,
        loRes: loResValue,
    }
}

describe('resolveSrcMain', () => {
    it('Undefined', () => {
        const actual = resolveSrcMain(undefinedVersion.srcMain, false);
        expect(actual).toEqual(GET_CAROUSEL_VIDEO_DEFAULT);
    })
    it('String - prefer low res', () => {
        const actual = resolveSrcMain(stringVersion.srcMain, false);
        expect(actual).toEqual(stringValue);
    })
    it('String - prefer high res', () => {
        const actual = resolveSrcMain(stringVersion.srcMain, true);
        expect(actual).toEqual(stringValue);
    })
    it('loResOnly - prefer low res', () => {
        const actual = resolveSrcMain(loResOnly.srcMain, false);
        expect(actual).toEqual(loResValue);
    })
    it('loResOnly - prefer high res', () => {
        const actual = resolveSrcMain(loResOnly.srcMain, true);
        expect(actual).toEqual(loResValue);
    })
    it('hiResOnly - prefer low res', () => {
        const actual = resolveSrcMain(hiResOnly.srcMain, false);
        expect(actual).toEqual(hiResValue);
    })
    it('hiResOnly - prefer high res', () => {
        const actual = resolveSrcMain(hiResOnly.srcMain, true);
        expect(actual).toEqual(hiResValue);
    })
    it('both - prefer low res', () => {
        const actual = resolveSrcMain(both.srcMain, false);
        expect(actual).toEqual(loResValue);
    })
    it('both - prefer high res', () => {
        const actual = resolveSrcMain(both.srcMain, true);
        expect(actual).toEqual(hiResValue);
    })
})