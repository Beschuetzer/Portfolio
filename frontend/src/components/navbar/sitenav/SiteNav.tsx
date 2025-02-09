import { useEffect, useState } from "react";

import {
  BUTTON_RADIUS,
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
import { SiteNavDrawer } from "./drawer/SiteNavDrawer";
import { SiteNavItem } from "./types";

export const SITE_NAV_NAV_SWITCH_TOP = defaultFontSize;

const SiteNavContainer = styled.header<{ sitenavleft: string }>`
  position: absolute;
  top: ${fontSizeEight};
  left: ${(props) => props.sitenavleft};
  display: flex;

  ${respond.navSwitch`
    top: ${SITE_NAV_NAV_SWITCH_TOP};
    left: ${SITE_NAV_NAV_SWITCH_TOP};
    `}
`;

export type SiteNavProps = {
  items: SiteNavItem[]
};

export function SiteNav(props: SiteNavProps) {
  const { items } = props;
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
    <SiteNavProvider buttonRadius={BUTTON_RADIUS} items={items}>
      <SiteNavContainer sitenavleft={siteNavleft}>
        <SiteNavButton />
        <SiteNavContent />
        <SiteNavBackground />
        <SiteNavDrawer />
      </SiteNavContainer>
    </SiteNavProvider>
  );
}
