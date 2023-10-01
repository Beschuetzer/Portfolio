import { CarouselItemProps } from "../components/CarouselItem";
import { getIsItemOfType } from "../utils/getIsItemOfType"

const defaults: CarouselItemProps = {
    description: 'test',
    srcMain: '',
}

const pngImageWithEmbeddedVideo: CarouselItemProps = {
    ...defaults,
    srcMain: '/static/media/animations.mp4-thumbnail.e361a5fda5375c96a01a.png',
}
const jpegImageWithEmbeddedVideo: CarouselItemProps = {
    ...defaults,
    srcMain: '/static/media/animations.mp4-thumbnail.e361a5fda5375c96a01a.jpeg',
}
const videoTypeWithEmbeddedImage: CarouselItemProps = {
    ...defaults,
    srcMain: '/static/media/animations.png-thumbnail.e361a5fda5375c96a01a.mp4',
}

describe('getIsItemOfType', () => {
    it('Image - PNG', () => {
        const actual = getIsItemOfType(pngImageWithEmbeddedVideo, 'image');
        expect(actual).toBeTruthy();
    })

    it('Image - jpeg', () => {
        const actual = getIsItemOfType(jpegImageWithEmbeddedVideo, 'image');
        expect(actual).toBeTruthy();
    })

    it('Video - PNG embedded', () => {
        const actual = getIsItemOfType(videoTypeWithEmbeddedImage, 'image');
        expect(actual).toBeFalsy();
    })
})