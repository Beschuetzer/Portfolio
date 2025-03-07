import { ColorScheme } from "../styles/constants";

export enum HoverEffect {
  rotate = "rotate",
  explode = "explode",
}

export type LayoutStyledProps = {
  backgroundsvg?: string;
  colorscheme?: ColorScheme;
  index?: number;
  isfixed?: string;
  islast?: string;
  isopen?: string;
  ispopupvisible?: string;
  isvisible?: string;
  percentage?: number;
  sitenavright?: string;
  textcolor?: string;
  transformationPercent?: string;
  size?: string;
  svgfillcolor?: string;
  hovereffecttype?: HoverEffect;
  url?: string;
};
