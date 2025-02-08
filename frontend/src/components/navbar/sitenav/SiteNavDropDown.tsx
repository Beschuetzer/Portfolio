import React from "react";
import styled from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";
import SiteNavItem, { SiteNavItemProps } from "./SiteNavItem";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { useSiteNav } from "./SiteNavContext";
import { SiteNavDropDownItem } from "./SiteNavDropDownItem";

const DropDownContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DropDownItems = styled.div<SiteNavStyledProps>`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  z-index: -1;
`;

type SiteNavDropDownProps = {
  isLast?: boolean;
  items: SiteNavItemProps[];
  text: string;
};

export function SiteNavDropDown(props: SiteNavDropDownProps) {
  const colorScheme = useColorScheme();
  const { isOpen } = useSiteNav();
  const { isLast, items, text } = props;

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme !== null ? colorScheme : undefined,
    isopen: isOpen,
    islast: isLast,
  };

  return (
    <DropDownContainer {...propsToAdd}>
      <SiteNavDropDownItem {...props} text={text}/>
      <DropDownItems {...propsToAdd}>
        {items.map((item, index) => (
          <SiteNavItem key={index} {...item} />
        ))}
      </DropDownItems>
    </DropDownContainer>
  );
}
