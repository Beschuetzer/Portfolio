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

const Container = styled.div<LayoutStyledProps>`
  position: fixed;
  top: calc(
    ${SITE_NAV_TOP} + ${BUTTON_WIDTH} + ${(props) => props.index || 1} *
      ${defaultFontSize}
  );
  left: ${(props) => props.sitenavright || SITE_NAV_TOP};
  width: ${BUTTON_WIDTH};
  height: ${BUTTON_WIDTH};
`;

const LinkInternal = styled(Link)<LayoutStyledProps>`
  color: ${(props) => props.colorscheme?.primary4};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.colorscheme?.primary3};
  }
`;

const LinkExternal = styled.a<LayoutStyledProps>``;

const Svg = styled.svg<LayoutStyledProps>`
  height: 100%;
  width: 100%;
  transition: fill 0.25s;
  fill: ${(props) => hexToRgba(props.svgfillcolor, 0.75)};

  &:hover {
    fill: ${(props) => hexToRgba(props.svgfillcolor, 1)};
  }
`;

const Title = styled.span<LayoutStyledProps>`
  margin-left: 1rem;
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

  const onResize = useCallback(() => {
    setSiteNavRight(getAbsoluteRightPosition());
  }, [setSiteNavRight]);

  useOnWindowResize(onResize);

  const renderSvg = useCallback(
    () => (
      <Svg {...propsToAdd}>
        <Title {...propsToAdd}>{text}</Title>
        <use xlinkHref={xlinkHref} />
      </Svg>
    ),
    [propsToAdd, text, xlinkHref]
  );

  return (
    <Container {...propsToAdd}>
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
