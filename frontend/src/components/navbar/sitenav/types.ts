import { ColorScheme } from "../../../styles/constants";

export type SiteNavStyledProps = {
  buttonradius?: string;
  colorscheme?: ColorScheme;
  isopen?: boolean;
  islast?: boolean;
  orientation?: "horizontal" | "vertical";
};
