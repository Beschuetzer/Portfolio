import { useEffect, useState } from "react";

import {
  BUTTON_RADIUS,
  ColorScheme,
  fontSizeEight,
  getFontSizeCustom,
  SCROLL_BAR_WIDTH_IN_REM,
  SECTION_WIDTH_IN_PIXELS,
} from "../../../styles/constants";

import { styled } from "styled-components";
import { SiteNavButton } from "./SiteNavButton";
import { SiteNavContent } from "./SiteNavContent";
import { SiteNavProvider } from "./SiteNavContext";
import SiteNavBackground from "./SiteNavBackground";
import { useLocation } from "react-router-dom";

const SiteNavContainer = styled.header<{ sitenavleft: string }>`
  position: absolute;
  top: ${fontSizeEight};
  left: ${(props) => props.sitenavleft};
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

function getAbsoluteLeft() {
  return `calc(((calc(${
    window.innerWidth
  }px + ${SCROLL_BAR_WIDTH_IN_REM}rem) - ${SECTION_WIDTH_IN_PIXELS}px) / 4) - ${getFontSizeCustom(
    0.5,
    BUTTON_RADIUS
  )})`;
}

export function SiteNav() {
  const location = useLocation();
  const [siteNavleft, setSiteNavleft] = useState(getAbsoluteLeft());

  useEffect(() => {
    if (!location?.hash) return;
    console.log({ locationHash: location.hash });
    const element = document.getElementById(location.hash?.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location?.hash]);

  useEffect(() => {
    function onResize() {
      setSiteNavleft(getAbsoluteLeft());
    }

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <SiteNavProvider buttonRadius={BUTTON_RADIUS}>
      <SiteNavContainer sitenavleft={siteNavleft}>
        <SiteNavButton />
        <SiteNavContent />
        <SiteNavBackground />
      </SiteNavContainer>
    </SiteNavProvider>
  );
}
