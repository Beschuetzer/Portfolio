import { ColorScheme } from "../../../styles/constants";
import { SiteNaveItemOrientation, SiteNavItemProps } from "./SiteNavItem";

export type SiteNavStyledProps = {
  buttonradius?: string;
  colorscheme?: ColorScheme;
  isopen?: boolean;
  islast?: boolean;
  orientation?: SiteNaveItemOrientation;
  scrollbarwidth?: string;
  sitenavnavswitchtop?: string;
};

export type SiteNavItem = {
  drownDownItems?: SiteNavItemProps[];
  href?: string;
  isDropdownItem: boolean;
  text: string
  to?: string;
  image?: string;
};