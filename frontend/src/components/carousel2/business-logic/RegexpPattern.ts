export class RegexpPattern {
    public static hexColor = /^#(([A-Fa-f0-9]{3}){1,2}|[A-Fa-f0-9]{8})$/;
    public static rgbColor = /rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/;
    public static rgbaColor = /rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d+|\d+\.\d+|\.\d+\s*\)/;
    public static splitAtSpaceAndRgb = /(\s|rgba.*?\)$)/;
}