import { CLASSNAME_ROOT } from "./constants";
type GetClassname = {
    elementName?: string;
    modifiedName?: string;
}
export function getClassname( {elementName, modifiedName }: GetClassname) {
    return `${CLASSNAME_ROOT}${elementName ? `__${elementName}` : ``}${modifiedName ? `--${modifiedName}` : ``}`;
}

export function getRegexStringFromStringArray(fileExtensions: string[]) {
    const mapped = fileExtensions.map((ext, index) => {
        let orChar = "|";
        if (index === 0) orChar = "";
        return `${orChar}(.${ext})`;
    });
    const result = ".+" + mapped.join("") + "$";
    return result;
}