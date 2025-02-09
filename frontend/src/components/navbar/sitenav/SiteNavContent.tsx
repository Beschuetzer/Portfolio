import React, { useMemo } from "react";
import { styled } from "styled-components";
import { useSiteNav } from "./SiteNavContext";

import { SiteNavStyledProps } from "./types";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { getFontSizeCustom } from "../../../styles/constants";
import { BREAK_POINTS } from "../../../styles/breakpoints";
import { SiteNavDropDownItem } from "./SiteNavDropDownItem";
import { SiteNavDropDown } from "./SiteNavDropDown";
import SiteNavItem from "./SiteNavItem";

type SiteNavContentProps = {};

const ContentContainer = styled.div<SiteNavStyledProps>`
  text-align: center;
  display: flex;
  flex-direction: row;
  transition: all 0.3s ease-in-out;
  transform: ${(props) =>
    props.isopen
      ? "translateX(0) scaleX(1)"
      : `translateX(${getFontSizeCustom(-0.5, props.buttonradius)}) scaleX(0)`};
  transform-origin: left;
  border-left: 1px solid ${(props) => props.colorscheme?.primary1};
  column-gap: 1px;
  border-radius: 0 14rem 14rem 0;
  background-color: ${(props) => props.colorscheme?.primary1};
`;

export function SiteNavContent(props: SiteNavContentProps) {
  const { isOpen, buttonRadius, items } = useSiteNav();
  const colorScheme = useColorScheme();
  const isRelevant = window.innerWidth > parseInt(BREAK_POINTS.navSwitch, 10);

  const itemsToRender = useMemo(() => {
    return items.map((item, index) => {
      console.log({ item, index });
      const isLast = index === items.length - 1;
      if (item.isDropdownItem && item.drownDownItems) {
        return (
          <SiteNavDropDown
            key={index}
            {...item}
            items={item.drownDownItems}
            isLast={isLast}
          />
        );
      }
      return <SiteNavItem key={index} {...item} isLast={isLast} />;
    });
  }, [items]);

  const propsToAdd: SiteNavStyledProps = {
    buttonradius: buttonRadius != null ? buttonRadius : undefined,
    isopen: isOpen != null ? isOpen && isRelevant : undefined,
    colorscheme: colorScheme != null ? colorScheme : undefined,
  };

  return (
    <ContentContainer {...propsToAdd}>
      {itemsToRender}
    </ContentContainer>
  );
}
