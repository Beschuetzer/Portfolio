import React from "react";
import styled from "styled-components";
import { useColorScheme } from "../../../hooks/useColorScheme";
import {
  defaultFontSize,
  fontSizeEleven,
  getFontSizeCustom,
} from "../../../styles/constants";
import { ColorSchemeProp, SiteNavProps } from "./SiteNav";

const StyledNav = styled.button<ColorSchemeProp>`
  position: absolute;
  top: ${defaultFontSize};
  left: ${fontSizeEleven};
  background-color: ${(props) => props.colorScheme.primary4};
  z-index: 1000;
  width: ${fontSizeEleven};
  height: ${fontSizeEleven};
  border-radius: 14rem 0 0 14rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover .hamburger {
    background-color: transparent;
    &::before {
      transform: rotate(135deg) translate(${defaultFontSize}, -0.1rem);
    }
    &::after {
      transform: rotate(-135deg) translate(${defaultFontSize}, 0.05rem);
    }
  }
`;

const Hamburger = styled.div<ColorSchemeProp>`
  width: ${getFontSizeCustom(0.2, fontSizeEleven)};
  height: ${getFontSizeCustom(0.5)};
  background-color: ${(props) => props.colorScheme.primary1};
  position: relative;
  transition: all 0.3s ease-in-out;

  &::before,
  &::after {
    content: "";
    width: ${getFontSizeCustom(0.5, fontSizeEleven)};
    height: ${getFontSizeCustom(0.5)};
    background-color: ${(props) => props.colorScheme.primary1};
    position: absolute;
    transition: all 0.3s ease-in-out;
  }

  &::before,
  &::after {
    left: 0;
  }

  &::before {
    top: ${getFontSizeCustom(-0.75)};
    transform: rotate(105deg) translate(1.253786rem, 1.536576rem);
  }

  &::after {
    top: ${getFontSizeCustom(0.75)};
    transform: rotate(-105deg) translate(1.353786rem);
  }
`;

const Menu = styled.div`
  display: none;
  position: absolute;
  top: 4.27rem;
  left: 4.27rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 999;
`;

export const SiteNavOpen: React.FC<SiteNavProps> = (props: SiteNavProps) => {
  const { onClick } = props;
  const colorScheme = useColorScheme();

  return (
    <StyledNav onClick={() => onClick && onClick()} colorScheme={colorScheme}>
      <Hamburger colorScheme={colorScheme} className="hamburger" />
      <Menu className="menu"></Menu>
    </StyledNav>
  );
  //#endregion
};
