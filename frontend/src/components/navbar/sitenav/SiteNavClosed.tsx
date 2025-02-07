import React from "react";
import styled from "styled-components";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { ColorScheme } from "../../../styles/constants";

type SiteNavProps = {
    onClick: () => void;
}

type ColorSchemeProp = {
    colorScheme: ColorScheme;
}

const StyledNav = styled.button<ColorSchemeProp>`
  position: absolute;
  top: 4.27rem;
  left: 4.27rem;
  background-color: ${props => props.colorScheme.primary4};
  z-index: 1000;
  width: 4.27rem;
  height: 4.27rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover .hamburger {
    transform: rotate(90deg);
  }

  &:hover .menu {
    display: block;
  }
`;

const Hamburger = styled.div<ColorSchemeProp>`
  width: 1.6rem;
  height: 0.4rem;
  background-color: ${props => props.colorScheme.primary1};
  position: relative;
  transition: all 0.3s ease-in-out;

  &::before,
  &::after {
    content: "";
    width: 1.6rem;
    height: 0.4rem;
    background-color: ${props => props.colorScheme.primary1};
    position: absolute;
    transition: all 0.3s ease-in-out;
  }

  &::before {
    top: -0.6rem;
    left: -0rem;
  }

  &::after {
    top: 0.6rem;
    left: -0rem;
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

export const SiteNavClosed: React.FC<SiteNavProps> = (props: SiteNavProps) => {
    const { onClick } = props;
    const colorScheme = useColorScheme();

  return (
    <StyledNav onClick={() => onClick && onClick()} colorScheme={colorScheme}>
      <Hamburger colorScheme={colorScheme} />
      <Menu>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </Menu>
    </StyledNav>
  );
  //#endregion
};
