import React, { useState } from "react";
import styled from "styled-components";
import { useColorScheme } from "../../../hooks/useColorScheme";
import {
  defaultFontSize,
  fontSizeEleven,
  getFontSizeCustom,
} from "../../../styles/constants";
import { ColorSchemeProp, SiteNavProps } from "./SiteNav";
import { useSiteNav } from "./SiteNavContext";

const StyledNav = styled.button<ColorSchemeProp>`
  
  background-color: ${(props) => props.colorScheme.primary4};
  z-index: 1000;
  width: ${fontSizeEleven};
  height: ${fontSizeEleven};
  border-radius: 50%;
  border-radius: ${(props) => (props.isOpen ? "14rem 0 0 14rem" : "50%")};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover .hamburger {
    ${props => props.isOpen ? "background-color: transparent;" : ""}
    &::before {
      transform: ${(props) =>
        props.isOpen
          ? `rotate(135deg) translate(${defaultFontSize}, -0.1rem)`
          : "translateY(-33%)"};
    }
    &::after {
      transform: ${(props) =>
        props.isOpen
          ? `rotate(-135deg) translate(${defaultFontSize}, 0.05rem)`
          : "translateY(33%)"};
    }
  }
`;

const Hamburger = styled.div<ColorSchemeProp>`
  width: ${(props) =>
    getFontSizeCustom(props.isOpen ? 0.2 : 0.5, fontSizeEleven)};
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
    ${(props) =>
      props.isOpen
        ? ` transform: rotate(105deg) translate(1.253786rem, 1.536576rem);`
        : ""}
  }

  &::after {
    top: ${getFontSizeCustom(0.75)};
    ${(props) =>
      props.isOpen
        ? ` transform: rotate(-105deg) translate(1.353786rem);`
        : ""}
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

export const SiteNavButton: React.FC<SiteNavProps> = (props: SiteNavProps) => {
  const { onClick } = props;
  const { isOpen, toggleIsOpen} = useSiteNav();
  const colorScheme = useColorScheme();

  const onClickLocal = () => {
    onClick && onClick();
    toggleIsOpen();
  };

  return (
    <StyledNav onClick={onClickLocal} colorScheme={colorScheme} isOpen={isOpen}>
      <Hamburger
        colorScheme={colorScheme}
        className="hamburger"
        isOpen={isOpen}
      />
      {/* <Menu className="menu"></Menu> */}
    </StyledNav>
  );
  //#endregion
};
