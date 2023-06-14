export class Regexs {
    public static hexColor = /^#([abcef0-9]{6}|[abcef0-9]{8})$/;
    public static rgbColor = /rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/;
    public static rgbaColor = /rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d+|\d+\.\d+|\.\d+\s*\)/;
}