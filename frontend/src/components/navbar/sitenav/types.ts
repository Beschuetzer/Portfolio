import { ColorScheme } from "../../../styles/constants";
import { SiteNaveItemOrientation, SiteNavItemProps } from "./SiteNavItem";

export type SiteNavStyledProps = {
  buttonradius?: string;
  colorscheme?: ColorScheme;
  islast?: boolean;
  isopen?: boolean;
  ismainitem?: string;
  issectionopen?: string;
  minpixelwidth?: string;
  numberofsections?: number;
  orientation?: SiteNaveItemOrientation;
  scrollbarwidth?: string;
  sitenavleft?: string
  sitenavnavswitchtop?: string;
};

export type SiteNavItemInput = {
  drownDownItems?: SiteNavItemProps[];
  href?: string;
  isDropdownItem: boolean;
  text: string
  to?: string;
  image?: string;
};