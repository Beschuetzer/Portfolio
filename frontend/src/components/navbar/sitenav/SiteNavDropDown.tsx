import React from "react";
import styled from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";
import SiteNavItem, { SiteNavItemProps } from "./SiteNavItem";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { useSiteNav } from "./SiteNavContext";
import { SiteNavDropDownItem } from "./SiteNavDropDownItem";

const DropDownContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  position: relative;

  &:hover > .item-container {
    transform: translateY(0) scaleY(1);
  }
`;

const DropDownItems = styled.div<SiteNavStyledProps>`
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: -1;
  left: 0;
  right: 0;
  transform: translateY(-100%) scaleY(1);
  transform-origin: bottom;
  transition: transform .125s ease-in, -webkit-transform .125s ease-in;
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
      <DropDownItems {...propsToAdd} className="item-container">
        {items.map((item, index) => (
          <SiteNavItem key={index} {...item} />
        ))}
      </DropDownItems>
    </DropDownContainer>
  );
}
