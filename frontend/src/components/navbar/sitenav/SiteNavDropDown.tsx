import React from "react";
import SiteNavItem, { SiteNavItemProps } from "./SiteNavItem";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { styled } from "styled-components";

type SiteNavDropDownProps = Pick<SiteNavItemProps, "text" >;

export function SiteNavDropDown(props: SiteNavDropDownProps) {
  const { text } = props;
  const colorScheme = useColorScheme();

  const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;`
    ;

  return (
    <DropdownContainer>
      <SiteNavItem text={text} isDropDownItem={true} />
    </DropdownContainer>
  )
}
