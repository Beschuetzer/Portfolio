import React, { useMemo } from "react";
import { useSiteNav } from "../SiteNavContext";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { SiteNavDropDown } from "../SiteNavDropDown";
import SiteNavItem from "../SiteNavItem";
import { SiteNavStyledProps } from "../types";
import { styled } from "styled-components";
import { getFontSizeCustom } from "../../../../styles/constants";

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

type SiteNavDrawerContentProps = {};

export default function SiteNavDrawerContent(props: SiteNavDrawerContentProps) {
  const colorScheme = useColorScheme();
  const { items } = useSiteNav();

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme != null ? colorScheme : undefined,
  };

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

  return <ContentContainer {...propsToAdd}>{itemsToRender}</ContentContainer>;
}
