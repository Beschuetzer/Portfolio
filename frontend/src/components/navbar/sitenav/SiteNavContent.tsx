import React, { useMemo } from "react";
import { styled } from "styled-components";
import { useSiteNav } from "./SiteNavContext";

import { SiteNavStyledProps } from "./types";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { getFontSizeCustom } from "../../../styles/constants";
import { BREAK_POINTS } from "../../../styles/breakpoints";
import { SiteNavDropDown } from "./SiteNavDropDown";
import { SiteNaveItemOrientation, SiteNavItem } from "./SiteNavItem";

type SiteNavContentProps = {};

const ContentContainer = styled.div<SiteNavStyledProps>`
  text-align: center;
  display: flex;
  flex-direction: row;
  transition: all 0.3s ease-in-out;
  transform: ${(props) =>
    props.isopen === 'true'
      ? "translate3d(0, 0, 0) scaleX(1)"
      : `translate3d(${getFontSizeCustom(
          -0.5,
          props.buttonradius
        )}, 0, 0) scaleX(0)`};
  transform-origin: left;
  border-radius: 0 14rem 14rem 0;
  user-select: none;
`;

export function SiteNavContent(props: SiteNavContentProps) {
  const { isOpen, buttonRadius, items } = useSiteNav();
  const colorScheme = useColorScheme();
  const isRelevant = window.innerWidth > parseInt(BREAK_POINTS.navSwitch, 10);

  const itemsToRender = useMemo(() => {
    return items.map((item, index) => {
      const isLast = index === items.length - 1;
      return item.isDropdownItem && item.drownDownItems ? (
        <SiteNavDropDown
          {...item}
          key={index}
          items={item.drownDownItems}
          isLast={isLast}
        />
      ) : (
        <SiteNavItem
          {...item}
          key={index}
          isLast={isLast}
          orientation={SiteNaveItemOrientation.horizontal}
        />
      );
    });
  }, [items]);

  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      buttonradius: buttonRadius != null ? buttonRadius : undefined,
      isopen: isOpen && isRelevant ? "true" : undefined,
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [buttonRadius, colorScheme, isOpen, isRelevant]
  );

  return <ContentContainer {...propsToAdd}>{itemsToRender}</ContentContainer>;
}
