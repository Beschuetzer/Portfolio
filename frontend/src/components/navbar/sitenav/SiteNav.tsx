import React, { useEffect, useMemo, useState } from "react";

import {
  ColorScheme,
  defaultFontSize,
  fontSizeEight,
  getFontSizeCustom,
} from "../../../styles/constants";

import { styled } from "styled-components";
import { SiteNavButton } from "./SiteNavButton";
import { SiteNavContent } from "./SiteNavContent";
import { SiteNavProvider } from "./SiteNavContext";
import SiteNavBackground from "./SiteNavBackground";
import { useLocation } from "react-router-dom";
import { useOnWindowResize } from "../../../hooks/useOnWindowResize";

const SECTION_WIDTH = 750;

const SiteNavContainer = styled.header<{sitenavleft: string}>`
  position: absolute;
  top: ${fontSizeEight};
  left: ${props => props.sitenavleft};
  display: flex;
`;



export type SiteNavProps = {
  onClick?: () => void;
};

export type SiteNavStyledProps = {
  buttonradius?: string;
  colorscheme?: ColorScheme;
  isopen?: boolean;
  islast?: boolean;
  orientation?: "horizontal" | "vertical";
};

export function SiteNav() {
  const location = useLocation();
  const [siteNavleft, setSiteNavleft] = useState(getFontSizeCustom(2.25));

  useEffect(() => {
    if (!location?.hash) return;
    console.log({ locationHash: location.hash });
    const element = document.getElementById(location.hash?.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location?.hash])

  // const onResize = useMemo(() => {
  //   const middleOfScreen = windowWidth / 2;
  // const middlePosition =(middleOfScreen - SECTION_WIDTH) / 2 - buss;
  // }, [])


  // useOnWindowResize(onResize)

  return (
    <SiteNavProvider>
      <SiteNavContainer sitenavleft={siteNavleft}>
        <SiteNavButton />
        <SiteNavContent />
        <SiteNavBackground />
      </SiteNavContainer>
    </SiteNavProvider>
  );
}
