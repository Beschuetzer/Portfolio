import { useEffect, useState } from "react";

import {
  BUTTON_RADIUS,
  ColorScheme,
  defaultFontSize,
  fontSizeEight,
} from "../../../styles/constants";

import { styled } from "styled-components";
import { SiteNavButton } from "./SiteNavButton";
import { SiteNavContent } from "./SiteNavContent";
import { SiteNavProvider } from "./SiteNavContext";
import SiteNavBackground from "./SiteNavBackground";
import { useLocation } from "react-router-dom";
import { getAbsoluteLeftPosition } from "./helpers";
import { respond } from "../../../styles/breakpoints";
import { SiteNavDrawer } from "./SiteNavDrawer";

//todo: create a data structure to hold the site nav items and save them in the context
//todo: finish the site nav drawer
//todo: finish github button
//todo: start ExampleLayout (use grid and have left column house the page nav)
//todo: start ResumeLayout?
//todo: start BridgeLayout?

const SiteNavContainer = styled.header<{ sitenavleft: string }>`
  position: absolute;
  top: ${fontSizeEight};
  left: ${(props) => props.sitenavleft};
  display: flex;

  ${respond.navSwitch`
    top: ${defaultFontSize};
    left: ${defaultFontSize};
    `}
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
  const [siteNavleft, setSiteNavleft] = useState(getAbsoluteLeftPosition());

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
      setSiteNavleft(getAbsoluteLeftPosition());
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
        <SiteNavDrawer />
      </SiteNavContainer>
    </SiteNavProvider>
  );
}
