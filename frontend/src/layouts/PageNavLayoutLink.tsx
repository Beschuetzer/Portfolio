import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { useColorScheme } from "../hooks/useColorScheme";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import {
  SITE_NAV_TOP,
  BUTTON_WIDTH,
  defaultFontSize,
  SITE_NAV_NAV_SWITCH_TOP,
  ColorScheme,
} from "../styles/constants";
import {
  getAbsoluteRightPosition,
  hexToRgba,
} from "../components/navbar/sitenav/helpers";
import { useOnWindowResize } from "../hooks/useOnWindowResize";
import { HoverEffect, LayoutStyledProps } from "./types";
import {
  pageNavLayoutHeaderMarginTopNavSwitch,
  pageNavLayoutLinkHoverExplodeStyle,
  pageNavLayoutLinkHoverRotateStyle,
  pageNavLayoutLinkStyles,
} from "./styles";
import {
  PAGE_NAV_LAYOUT_LINK_FILL,
  PAGE_NAV_LAYOUT_LINK_TEXT_BACKGROUND_COLOR_OPACITY,
  PAGE_NAV_LAYOUT_LINK_TEXT_COLOR_OPACITY,
} from "./constants";
import { respond } from "../styles/breakpoints";

function getContainerTop(props: LayoutStyledProps) {
  const index = props.index || 0;
  const toBottomOfButton = `calc(${SITE_NAV_TOP} + ${BUTTON_WIDTH})`;
  const spacingToStart = defaultFontSize;
  const interItemSpacing = `calc(${index} * (${spacingToStart} + ${BUTTON_WIDTH}))`;
  return `calc(${spacingToStart} + ${interItemSpacing} + ${toBottomOfButton})`;
}

function getContainerRight(props: LayoutStyledProps) {
  const interItemSpacing = `calc(${props.index} * (${defaultFontSize} + ${BUTTON_WIDTH}))`;
  return `calc(${SITE_NAV_NAV_SWITCH_TOP} + ${interItemSpacing})`;
}

const Container = styled.div<LayoutStyledProps>`
  ${(props) =>
    props.isfixed === "true"
      ? `position: fixed;
    top: ${getContainerTop(props)};
    left: ${props.sitenavright || SITE_NAV_TOP};`
      : "position: relative;"}
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  user-select: none;

  ${(props) =>
    props.hovereffecttype === HoverEffect.rotate
      ? pageNavLayoutLinkHoverRotateStyle
      : pageNavLayoutLinkHoverExplodeStyle}

  ${respond.navSwitch`
    ${(props: LayoutStyledProps) =>
      props.isfixed === "true"
        ? `
          top: ${pageNavLayoutHeaderMarginTopNavSwitch};
          right: ${getContainerRight(props)};
          left: auto;
          position: absolute;
         `
        : ""}
    z-index: 1;
  `}
`;

const LinkInternal = styled(Link)<LayoutStyledProps>`
  ${pageNavLayoutLinkStyles}
`;

const LinkExternal = styled.a<LayoutStyledProps>`
  ${pageNavLayoutLinkStyles}
`;

const Svg = styled.svg<LayoutStyledProps>`
  height: 100%;
  width: 100%;
  fill: ${(props) => hexToRgba(props.svgfillcolor, PAGE_NAV_LAYOUT_LINK_FILL)};
`;

const Use = styled.use`
  height: 100%;
  width: 100%;
`;

const Title = styled.span<LayoutStyledProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: ${(props) =>
    hexToRgba(props.textcolor, PAGE_NAV_LAYOUT_LINK_TEXT_COLOR_OPACITY)};
  background-color: ${(props) =>
    hexToRgba(
      props.colorscheme?.primary1,
      PAGE_NAV_LAYOUT_LINK_TEXT_BACKGROUND_COLOR_OPACITY
    )};
  font-family: Merriweather, serif;
  font-size: ${defaultFontSize};
  font-weight: 900;
  border-radius: 50%;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
  z-index: 10000;
  text-wrap: nowrap;
  text-align: center;
  pointer-events: none;
`;

export type PageNavLayoutLinkProps = {
  index?: number;
  isFixed?: boolean;
  hoverEffectType?: HoverEffect;
  size?: string;
  svg: {
    xlinkHref?: string;
    fill?: string;
    jsx?: (colorScheme: ColorScheme) => ReactNode | ReactNode[];
  };
  title?: {
    color?: string;
    text: string;
  };
  url: string;
};

export function PageNavLayoutLink(props: PageNavLayoutLinkProps) {
  const colorScheme = useColorScheme();
  const {
    hoverEffectType = HoverEffect.explode,
    index = 0,
    isFixed = true,
    size = BUTTON_WIDTH,
    svg,
    title,
    url,
  } = props;
  const { xlinkHref, fill = colorScheme.primary4 } = svg;
  const { color = colorScheme.primary4, text = "" } = title || {};
  const isInternal = useMemo(
    () => url.startsWith("/") && !url.match(/\..+$/gi),
    [url]
  );
  const [siteNavRight, setSiteNavRight] = useState(getAbsoluteRightPosition());
  const propsToAdd: LayoutStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      index: index,
      isfixed: isFixed ? "true" : "false",
      size,
      sitenavright: siteNavRight,
      textcolor: color,
      svgfillcolor: fill,
      hovereffecttype: hoverEffectType,
    }),
    [
      color,
      colorScheme,
      fill,
      hoverEffectType,
      index,
      isFixed,
      siteNavRight,
      size,
    ]
  );

  const onResize = useCallback(() => {
    setSiteNavRight(getAbsoluteRightPosition());
  }, [setSiteNavRight]);

  useOnWindowResize(onResize);

  const renderSvg = useCallback(
    () => (
      <Svg {...propsToAdd}>
        <Use xlinkHref={xlinkHref} />
      </Svg>
    ),
    [propsToAdd, xlinkHref]
  );

  return (
    <Container {...propsToAdd}>
      {title ? <Title {...propsToAdd}>{text}</Title> : null}
      {isInternal ? (
        <LinkInternal {...propsToAdd} to={url.trim()}>
          {svg.jsx ? svg.jsx(colorScheme) : renderSvg()}
        </LinkInternal>
      ) : (
        <LinkExternal
          {...propsToAdd}
          href={url.trim()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {svg.jsx ? svg.jsx(colorScheme) : renderSvg()}
        </LinkExternal>
      )}
    </Container>
  );
}
