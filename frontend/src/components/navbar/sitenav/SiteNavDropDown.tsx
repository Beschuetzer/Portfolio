import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { SiteNavStyledProps } from "./types";
import { SiteNavItem, SiteNaveItemOrientation, SiteNavItemProps } from "./SiteNavItem";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { useSiteNav } from "./SiteNavContext";
import { SiteNavDropDownItem } from "./SiteNavDropDownItem";
import { getFontSizeCustom } from "../../../styles/constants";
import { SITE_NAV_BORDER_SIZE } from "./styles";

const DropDownContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  position: relative;
  height: 100%;
  border-left: ${SITE_NAV_BORDER_SIZE} solid ${(props) => props.colorscheme?.primary1};

  &:hover > .item-container {
    transform: translate3d(0, 0, 0) scaleY(1);
    opacity: 1;
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
  transform: translate3d(0, ${props => getFontSizeCustom(-1, props.buttonradius)}, 0) scaleY(0);
  transform-origin: top;
  opacity: 0;
  transition: transform .125s ease-in, -webkit-transform .125s ease-in, opacity .125s ease-in;
`;

type SiteNavDropDownProps = {
  isLast?: boolean;
  items: SiteNavItemProps[];
  text: string;
};

export function SiteNavDropDown(props: SiteNavDropDownProps) {
  const colorScheme = useColorScheme();
  const { isOpen, buttonRadius } = useSiteNav();
  const { isLast, items, text } = props;
  const [isHovering, setIsHovering] = useState(false);

  const propsToAdd: SiteNavStyledProps = useMemo(() => ({
    colorscheme: colorScheme != null ? colorScheme : undefined,
    isopen: isOpen != null ? isOpen : undefined,
    islast: isLast != null ? isLast : undefined,
    buttonradius: buttonRadius != null ? buttonRadius : undefined,
  }), [buttonRadius, colorScheme, isOpen, isLast]);

  return (
    <DropDownContainer {...propsToAdd}>
      <SiteNavDropDownItem {...propsToAdd} text={text} isHovering={isHovering}/>
      <DropDownItems {...propsToAdd} className="item-container">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return <SiteNavItem key={index} {...item} isLast={isLast} orientation={SiteNaveItemOrientation.vertical} itemProps={{
            onMouseEnter: () => setIsHovering(true),
            onMouseLeave: () => setIsHovering(false),
          }} isDropDownItem={true}/>
        })}
      </DropDownItems>
    </DropDownContainer>
  );
}
