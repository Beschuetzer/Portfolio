import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ensureMaxLength, getHeaderName } from "../../helpers";
import { respond, BREAK_POINTS } from "../../styles/breakpoints";
import {
  fontSizeFive,
  getFontSizeCustom,
  fontSizeFour,
  PAGE_NAV_ITEM_HEIGHT,
} from "../../styles/constants";
import { getTextShadowPageNavStyle } from "../../styles/styles";
import { hexToRgba } from "./sitenav/helpers";
import { SiteNavStyledProps } from "./sitenav/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useOnWindowResize } from "../../hooks/useOnWindowResize";

const Item = styled(Link)<SiteNavStyledProps>`
  font-size: ${fontSizeFive};
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  font-weight: bold;
  height: ${PAGE_NAV_ITEM_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.25s ease, transform 0.25s ease, text-shadow 0.25s ease;
  color: ${(props) => hexToRgba(props.colorscheme?.primary4, 0.75)};

  &:hover {
    transform: translate3d(0, ${getFontSizeCustom(-0.25)}, 0);
    ${getTextShadowPageNavStyle(-2)}
    color: ${(props) => props.colorscheme?.primary4};
  }

  ${respond.navSwitch`
    font-size: ${fontSizeFour};
    height: auto;
    padding: 0;
    color: ${(props: SiteNavStyledProps) =>
      hexToRgba(props.colorscheme?.primary1, 0.75)};

    &:hover {
      color: ${(props: SiteNavStyledProps) => props.colorscheme?.primary1};
    }
  `}
`;

type PageNavItemProps = {
  section: Element;
};

export function PageNavItem(props: PageNavItemProps) {
  const { section } = props;
  const colorScheme = useColorScheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [colorScheme]
  );

  useOnWindowResize(() => {
    setWindowWidth(window.innerWidth);
  });

  return (
    <Item to={`${window.location.pathname}#${section.id}`} {...propsToAdd}>
      {ensureMaxLength(
        getHeaderName(section.id),
        windowWidth > parseInt(BREAK_POINTS.navSwitch, 10) ? 25 : 18
      )}
    </Item>
  );
}
