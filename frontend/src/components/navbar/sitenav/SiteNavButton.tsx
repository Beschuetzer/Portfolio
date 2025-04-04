import React, { useMemo } from "react";
import styled from "styled-components";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { defaultFontSize, getFontSizeCustom } from "../../../styles/constants";
import { SiteNavStyledProps } from "./types";
import { useSiteNav } from "./SiteNavContext";
import { respond } from "../../../styles/breakpoints";

export const SITE_NAV_BUTTON_OPEN_BORDER_RADIUS_AMOUNT = getFontSizeCustom(0.5);

const StyledNav = styled.button<SiteNavStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary4};
  z-index: 1000;
  width: ${(props) => props.buttonradius};
  height: ${(props) => props.buttonradius};
  border-radius: 50%;
  border-radius: ${(props) =>
    props.isopen === "true"
      ? `${SITE_NAV_BUTTON_OPEN_BORDER_RADIUS_AMOUNT} 0 0 ${SITE_NAV_BUTTON_OPEN_BORDER_RADIUS_AMOUNT}`
      : "50%"};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &:hover .hamburger {
    ${(props) =>
      props.isopen === "true" ? "background-color: transparent;" : ""}
    &::before {
      transform: ${(props) =>
        props.isopen === "true"
          ? `rotate(135deg) translate3d(${defaultFontSize}, -0.1rem, 0)`
          : "translate3d(0, -33%, 0)"};
    }
    &::after {
      transform: ${(props) =>
        props.isopen === "true"
          ? `rotate(-135deg) translate3d(${defaultFontSize}, 0.05rem, 0)`
          : "translate3d(0, 33%, 0)"};
    }
  }

  ${respond.navSwitch`
      border-radius: ${SITE_NAV_BUTTON_OPEN_BORDER_RADIUS_AMOUNT};
      background-color: ${(props: SiteNavStyledProps) =>
        props.isopen === "true"
          ? props.colorscheme?.primary4
          : props.colorscheme?.primary1};
      opacity: ${(props: SiteNavStyledProps) =>
        props.isopen === "true" ? 1 : 0.5};
  `}
`;

const Hamburger = styled.div<SiteNavStyledProps>`
  width: ${(props) =>
    getFontSizeCustom(props.isopen === "true" ? 0.2 : 0.5, props.buttonradius)};
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
      props.isopen === "true"
        ? ` transform: rotate(105deg) translate3d(1.253786rem, 1.536576rem, 0);`
        : ""}
  }

  &::after {
    top: ${getFontSizeCustom(0.75)};
    ${(props) =>
      props.isopen === "true"
        ? ` transform: rotate(-105deg) translate3d(1.353786rem, 0, 0);`
        : ""}
  }

  ${respond.navSwitch`
    background-color: ${(props: SiteNavStyledProps) =>
      props.isopen === "true"
        ? props.colorscheme?.primary1
        : props.colorscheme?.primary4};

    &::before,
    &::after {
      background-color: ${(props: SiteNavStyledProps) =>
        props.isopen === "true"
          ? props.colorscheme?.primary1
          : props.colorscheme?.primary4};
    }
  `}
`;

type SiteNavButtonProps = {
  onClick?: () => void;
};

export const SiteNavButton: React.FC<SiteNavButtonProps> = (
  props: SiteNavButtonProps
) => {
  const { onClick } = props;
  const { isOpen, toggleIsOpen, buttonRadius } = useSiteNav();
  const colorScheme = useColorScheme();

  const onClickLocal = () => {
    onClick && onClick();
    toggleIsOpen();
  };

  const propsToAdd = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      isopen: isOpen === true ? "true" : undefined,
      buttonradius: buttonRadius != null ? buttonRadius : undefined,
    }),
    [colorScheme, isOpen, buttonRadius]
  );

  return (
    <StyledNav onClick={onClickLocal} {...propsToAdd}>
      <Hamburger {...propsToAdd} className="hamburger" />
    </StyledNav>
  );
};
