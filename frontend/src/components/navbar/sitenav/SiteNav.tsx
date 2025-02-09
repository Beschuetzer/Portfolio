import { useEffect, useState } from "react";

import {
  BUTTON_RADIUS,
  ColorScheme,
  fontSizeEight,
} from "../../../styles/constants";

import { styled } from "styled-components";
import { SiteNavButton } from "./SiteNavButton";
import { SiteNavContent } from "./SiteNavContent";
import { SiteNavProvider } from "./SiteNavContext";
import SiteNavBackground from "./SiteNavBackground";
import { useLocation } from "react-router-dom";
import { getAbsoluteLeftPosition } from "./helpers";

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
      </SiteNavContainer>
    </SiteNavProvider>
  );
}
