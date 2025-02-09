import React, { useMemo } from "react";
import { SiteNavItemProps } from "./SiteNavItem";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./types";
import { useSiteNav } from "./SiteNavContext";
import { itemStyles, linkStyles, triangleRotateStyle } from "./styles";

type SiteNavDropDownProps = Pick<SiteNavItemProps, "text"> & {
  isHovering?: boolean;
};

const DropdownContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
`;

const DropDownItem = styled.div<SiteNavStyledProps>`
  cursor: default;
  ${itemStyles}
  ${linkStyles}
   &:hover .triangle {
    ${triangleRotateStyle}
  }
`;

const SiteNavTriangle = styled.div<SiteNavStyledProps & { ishovering?: boolean }>`
  border-color: transparent transparent transparent
    ${(props) => props.colorscheme?.primary1};
  border-style: solid;
  border-width: 0.462rem 0 0.462rem 1.05rem;
  height: 0;
  margin-left: 0.7rem;
  width: 0;
  transition: transform 0.25s ease, -webkit-transform 0.25s ease;
  ${(props) => (props.ishovering ? triangleRotateStyle : "")}
`;

export function SiteNavDropDownItem(props: SiteNavDropDownProps) {
  const { isHovering, text } = props;
  const { isOpen } = useSiteNav();
  const colorScheme = useColorScheme();
  const propsToAdd: SiteNavStyledProps = useMemo(() => ({
    colorscheme: colorScheme != null ? colorScheme : undefined,
    isopen: isOpen != null ? isOpen : undefined,
  }), [colorScheme, isOpen]);

  return (
    <DropdownContainer {...propsToAdd}>
      <DropDownItem {...propsToAdd}>
        {text}
        <SiteNavTriangle {...propsToAdd} ishovering={isHovering != null ? isHovering : undefined} className="triangle" />
      </DropDownItem>
    </DropdownContainer>
  );
}
