import React from "react";
import styled from "styled-components";
import { useColorScheme } from "../../../hooks/useColorScheme";
import {
  defaultFontSize,
  getFontSizeCustom,
} from "../../../styles/constants";
import { SiteNavStyledProps, SiteNavProps } from "./SiteNav";
import { useSiteNav } from "./SiteNavContext";

const StyledNav = styled.button<SiteNavStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary4};
  z-index: 1000;
  width: ${props => props.buttonradius};
  border-radius: 50%;
  border-radius: ${(props) => (props.isopen ? "14rem 0 0 14rem" : "50%")};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover .hamburger {
    ${props => props.isopen ? "background-color: transparent;" : ""}
    &::before {
      transform: ${(props) =>
        props.isopen
          ? `rotate(135deg) translate(${defaultFontSize}, -0.1rem)`
          : "translateY(-33%)"};
    }
    &::after {
      transform: ${(props) =>
        props.isopen
          ? `rotate(-135deg) translate(${defaultFontSize}, 0.05rem)`
          : "translateY(33%)"};
    }
  }
`;

const Hamburger = styled.div<SiteNavStyledProps>`
  width: ${(props) =>
    getFontSizeCustom(props.isopen ? 0.2 : 0.5, props.buttonradius)};
  height: ${getFontSizeCustom(0.5)};
  background-color: ${(props) => props.colorscheme?.primary1};
  position: relative;
  transition: all 0.3s ease-in-out;

  &::before,
  &::after {
    content: "";
    width: ${(props) => getFontSizeCustom(0.5, props.buttonradius)};
    height: ${getFontSizeCustom(0.5)};
    background-color: ${(props) => props.colorscheme?.primary1};
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
      props.isopen
        ? ` transform: rotate(105deg) translate(1.253786rem, 1.536576rem);`
        : ""}
  }

  &::after {
    top: ${getFontSizeCustom(0.75)};
    ${(props) =>
      props.isopen
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
  const { isOpen, toggleIsOpen, buttonRadius} = useSiteNav();
  const colorScheme = useColorScheme();

  const onClickLocal = () => {
    onClick && onClick();
    toggleIsOpen();
  };

  const propsToAdd = {
    colorscheme: colorScheme != null ? colorScheme : undefined,
    isopen: isOpen != null ? isOpen : undefined,
    buttonradius: buttonRadius != null ? buttonRadius : undefined,
  };

  return (
    <StyledNav onClick={onClickLocal} {...propsToAdd}>
      <Hamburger 
        {...propsToAdd}
        className="hamburger"
      />
    </StyledNav>
  );
};
