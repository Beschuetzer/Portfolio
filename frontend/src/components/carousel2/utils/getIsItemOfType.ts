import { CarouselItemProps } from "../components/CarouselItem";
import { IMAGE_EXTENSIONS, VIDEO_EXTENSIONS } from "../constants";

export function getIsItemOfType(item: CarouselItemProps | undefined, type: 'video' | 'image' = 'image') {
    const currentItemSrc = item?.srcMain || '';
    const extensions = type === 'image' ? IMAGE_EXTENSIONS : VIDEO_EXTENSIONS;
    if (typeof currentItemSrc === 'object') {
        return type === 'video';
    }
    return !!currentItemSrc?.match(
        getRegexStringFromStringArray(extensions),
    );
}

export function getRegexStringFromStringArray(fileExtensions: string[]) {
    const mapped = fileExtensions.map((ext, index) => {
        let orChar = "|";
        if (index === 0) orChar = "";
        return `${orChar}(.${ext})`;
    });
    
    const result = `.+(${mapped.join("")})$`;
    return result;
}