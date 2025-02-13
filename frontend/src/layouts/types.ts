import { ColorScheme } from "../styles/constants";

export enum HoverEffect {
  rotate = "rotate",
  explode = "explode",
}

export type LayoutStyledProps = {
  backgroundsvg?: string;
  colorscheme?: ColorScheme;
  index?: number;
  ispopupvisible?: boolean;
  sitenavright?: string;
  textcolor?: string;
  svgfillcolor?: string;
  hovereffecttype?: HoverEffect;
};
