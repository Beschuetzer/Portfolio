import React, { useMemo } from "react";
import { SiteNaveItemOrientation, SiteNavItemProps } from "./SiteNavItem";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./types";
import { useSiteNav } from "./SiteNavContext";
import { itemStyles, siteNavLinkStyles, triangleRotateStyles } from "./styles";
import SiteNavTriangle from "./SiteNavTriangle";

type SiteNavDropDownProps = Pick<SiteNavItemProps, "text"> & {
  isHovering?: string;
};

const DropdownContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
`;

const DropDownItem = styled.div<SiteNavStyledProps>`
  cursor: default;
  ${itemStyles}
  ${siteNavLinkStyles}
   &:hover .triangle {
    ${triangleRotateStyles}
  }
`;


export function SiteNavDropDownItem(props: SiteNavDropDownProps) {
  const { isHovering, text } = props;
  const { isOpen } = useSiteNav();
  const colorScheme = useColorScheme();
  const propsToAdd: SiteNavStyledProps = useMemo(() => ({
    colorscheme: colorScheme != null ? colorScheme : undefined,
    isopen: isOpen ? "true" : undefined,
    orientation: isHovering ? SiteNaveItemOrientation.vertical : SiteNaveItemOrientation.horizontal,
  }), [colorScheme, isHovering, isOpen]);

  return (
    <DropdownContainer {...propsToAdd}>
      <DropDownItem {...propsToAdd}>
        {text}
        <SiteNavTriangle {...propsToAdd} />
      </DropDownItem>
    </DropdownContainer>
  );
}
