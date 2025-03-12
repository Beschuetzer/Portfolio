import React, { useEffect, useMemo, useState } from "react";
import { getAbsoluteRightPosition } from "./sitenav/helpers";
import { styled } from "styled-components";
import {
  BUTTON_WIDTH,
  fontSizeThree,
  getFontSizeCustom,
} from "../../styles/constants";
import { SiteNavStyledProps } from "./sitenav/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import { SITE_NAV_NAV_SWITCH_TOP } from "../../styles/constants";
import { buttonPlacementStyles } from "./sitenav/styles";
import { GITHUB_URL } from "../constants";
import { respond } from "../../styles/breakpoints";
import { useSiteNav } from "./sitenav/SiteNavContext";

type GithubButtonProps = {};

const Container = styled.a<SiteNavStyledProps & { sitenavright: string }>`
  position: absolute;
  flex-direction: column;
  border-radius: 50%;
  width: ${BUTTON_WIDTH};
  height: ${BUTTON_WIDTH};
  background-color: transparent;
  color: ${(props) => props.colorscheme?.primary1};
  font-weight: 700;
  text-decoration: none;
  font-size: ${fontSizeThree};
  ${buttonPlacementStyles}
  align-items: center;
  justify-content: space-between;
  left: ${(props) => props.sitenavright};
  z-index: 100;
  transition: opacity 0.33s ease;

  &:hover {
    & .svg-front,
    .github-text {
      opacity: 0;
    }
    & .svg-behind {
      opacity: 1;
    }
  }

  ${respond.navSwitch`
      top: ${SITE_NAV_NAV_SWITCH_TOP};
      left: auto;
      right: ${SITE_NAV_NAV_SWITCH_TOP};
      color: ${(props: SiteNavStyledProps) => props.colorscheme?.primary4};

      opacity: ${(props: SiteNavStyledProps)=> props.isopen === 'true' ? 0 : .5};
      &:hover {
        opacity: 1;
      }
  `}
`;

const Text = styled.span`
  padding: ${getFontSizeCustom(0.25)};
  transition: opacity 0.25s ease;
`;

const Svg = styled.svg<SiteNavStyledProps>`
  fill: ${(props) => props.colorscheme?.primary4};
  position: absolute;
  transition: opacity 0.25s ease;
  width: 100%;
  height: 100%;
  z-index: -100;

  ${respond.navSwitch`
    fill: ${(props: SiteNavStyledProps) => props.colorscheme?.primary1};
  `}
`;

const SvgBehind = styled.svg<SiteNavStyledProps>`
  fill: ${(props) => props.colorscheme?.primary4};
  opacity: 0;
  transition: opacity 0.25s ease;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -100;

  ${respond.navSwitch`
    fill: ${(props: SiteNavStyledProps) => props.colorscheme?.primary1};
  `}
`;

const Use = styled.use``;

export function GithubButton(props: GithubButtonProps) {
  const [siteNavRight, setSiteNavRight] = useState(getAbsoluteRightPosition());
  const { isOpen } = useSiteNav();
  const colorScheme = useColorScheme();
  const propsToAdd = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      sitenavnavswitchtop: SITE_NAV_NAV_SWITCH_TOP,
      sitenavright: siteNavRight,
      isopen: isOpen === true ? "true" : undefined,
    }),
    [colorScheme, isOpen, siteNavRight]
  );

  useEffect(() => {
    function onResize() {
      setSiteNavRight(getAbsoluteRightPosition());
    }

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Container {...propsToAdd} href={GITHUB_URL} target="_blank">
      <Text className="github-text">Open</Text>
      <Svg {...propsToAdd} className="svg-front">
        <Use xlinkHref="/sprite.svg#icon-github-with-circle" />
      </Svg>
      <SvgBehind {...propsToAdd} className="svg-behind">
        <Use xlinkHref="/sprite.svg#icon-github" />
      </SvgBehind>
      <Text className="github-text">Github</Text>
    </Container>
  );
}
