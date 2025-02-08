import React from "react";
import SiteNavItem, { SiteNavItemProps } from "./SiteNavItem";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";
import { useSiteNav } from "./SiteNavContext";

type SiteNavDropDownProps = Pick<SiteNavItemProps, "text">;

export function SiteNavDropDown(props: SiteNavDropDownProps) {
  const { text } = props;
  const { isOpen } = useSiteNav();
  const colorScheme = useColorScheme();

  const DropdownContainer = styled.div<SiteNavStyledProps>`
    display: flex;
    flex-direction: column;
  `;

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme,
    isopen: isOpen,
  };

  return (
    <DropdownContainer { ...propsToAdd }>
      <SiteNavItem text={text} isDropDownItem={true} { ...propsToAdd } />
    </DropdownContainer>
  );
}
