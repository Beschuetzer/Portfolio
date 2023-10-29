import { CarouselItemSourceMain } from "../components/CarouselItem";

export const GET_CAROUSEL_VIDEO_DEFAULT = '';
const PREFER_HIGH_RES_DEFAULT = false;
/**
*Resolves the srcMain value.
@param preferHighRes - defaults to `false`.
**/
export function resolveSrcMain(srcMain: CarouselItemSourceMain, preferHighRes = PREFER_HIGH_RES_DEFAULT) {
    if (typeof srcMain === 'string') {
        return srcMain;
    }

    if (preferHighRes) return srcMain?.hiRes || srcMain?.loRes|| GET_CAROUSEL_VIDEO_DEFAULT;
    return srcMain?.loRes || srcMain?.hiRes|| GET_CAROUSEL_VIDEO_DEFAULT;
}