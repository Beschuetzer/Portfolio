import React, { useCallback, useMemo, useState } from "react";
import { useColorScheme } from "../hooks/useColorScheme";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import {
  SITE_NAV_TOP,
  BUTTON_WIDTH,
  defaultFontSize,
  SITE_NAV_NAV_SWITCH_TOP,
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

const Container = styled.div<LayoutStyledProps>`
  position: fixed;
  top: ${(props) => getContainerTop(props)};
  left: ${(props) => props.sitenavright || SITE_NAV_TOP};
  width: ${BUTTON_WIDTH};
  height: ${BUTTON_WIDTH};
  user-select: none;

  ${(props) =>
    props.hovereffecttype === HoverEffect.rotate
      ? pageNavLayoutLinkHoverRotateStyle
      : pageNavLayoutLinkHoverExplodeStyle}

  ${respond.navSwitch`
    left: auto;
    right: ${SITE_NAV_NAV_SWITCH_TOP};
    top: ${pageNavLayoutHeaderMarginTopNavSwitch};
    z-index: 1000000;
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
  transform: translate(-50%, -50%);
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
  index: number;
  hoverEffectType?: HoverEffect;
  svg: {
    xlinkHref: string;
    fill?: string;
  };
  title: {
    color?: string;
    text: string;
  };
  url: string;
};

export function PageNavLayoutLink(props: PageNavLayoutLinkProps) {
  const colorScheme = useColorScheme();
  const {
    hoverEffectType = HoverEffect.explode,
    index,
    svg,
    title,
    url,
  } = props;
  const { xlinkHref, fill = colorScheme.primary4 } = svg;
  const { color = colorScheme.primary4, text } = title;
  const isInternal = useMemo(() => url.startsWith("/"), [url]);
  const [siteNavRight, setSiteNavRight] = useState(getAbsoluteRightPosition());
  const propsToAdd: LayoutStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      index: index,
      sitenavright: siteNavRight,
      textcolor: color,
      svgfillcolor: fill,
      hovereffecttype: hoverEffectType,
    }),
    [color, colorScheme, fill, hoverEffectType, index, siteNavRight]
  );

  console.log({ hoverEffectType, index, title, url });

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
      <Title {...propsToAdd}>{text}</Title>
      {isInternal ? (
        <LinkInternal {...propsToAdd} to={url.trim()}>
          {renderSvg()}
        </LinkInternal>
      ) : (
        <LinkExternal
          {...propsToAdd}
          href={url.trim()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderSvg()}
        </LinkExternal>
      )}
    </Container>
  );
}
