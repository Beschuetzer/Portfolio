import React, { useCallback, useMemo, useState } from "react";
import { useColorScheme } from "../hooks/useColorScheme";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import {
  SITE_NAV_TOP,
  BUTTON_WIDTH,
  defaultFontSize,
} from "../styles/constants";
import {
  getAbsoluteRightPosition,
  hexToRgba,
} from "../components/navbar/sitenav/helpers";
import { useOnWindowResize } from "../hooks/useOnWindowResize";
import { LayoutStyledProps } from "./types";
import { pageNavLayoutLinkStyles } from "./styles";
import { PAGE_NAVE_LAYOUT_LINK_ON_HOVER_FILL } from "./constants";

const Container = styled.div<LayoutStyledProps>`
  position: fixed;
  top: calc(
    ${SITE_NAV_TOP} + ${BUTTON_WIDTH} +
      (${(props) => (props.index || 0) + 1} * ${defaultFontSize})
  );
  left: ${(props) => props.sitenavright || SITE_NAV_TOP};
  width: ${BUTTON_WIDTH};
  height: ${BUTTON_WIDTH};
  user-select: none;

  &:hover {
    & > * > svg {
      fill: ${(props) => hexToRgba(props.svgfillcolor, PAGE_NAVE_LAYOUT_LINK_ON_HOVER_FILL)};
    }
    & > span {
      transform: rotate(270deg) translate(25%, calc(${BUTTON_WIDTH} / 4));
    }
  }
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
  transition: fill 0.25s;
  fill: ${(props) => hexToRgba(props.svgfillcolor, 0.25)};
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
  color: ${(props) => props.textcolor};
  background-color: ${(props) => hexToRgba(props.colorscheme?.primary1, 0.1)};
  font-family: Merriweather, serif;
  font-size: ${defaultFontSize};
  font-weight: 900;
  border-radius: 50%;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
  z-index: 10000;
  transition: transform 0.125s;
`;

export type PageNavLayoutLinkProps = {
  index: number;
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
  const { index, svg, title, url } = props;
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
    }),
    [color, colorScheme, fill, index, siteNavRight]
  );

  console.log({ index, title, url });

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
