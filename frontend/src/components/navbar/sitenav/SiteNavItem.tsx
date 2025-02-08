import React from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { colors, fontSizeEleven, fontSizeFive, fontSizeSeven, fontSizeSix } from "../../../styles/constants";

type SiteNavItemProps = {};

const Item = styled.div<SiteNavStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary4};
  border-left: 0.28rem solid ${(props) => props.colorscheme?.primary1};
  cursor: pointer;
  height: 100%;
  position: relative;
  transition: transform 0.125s ease, background-color 0.125s ease,
    -webkit-transform 0.125s ease;
  width: 100%;
`;

const Image = styled.img<SiteNavStyledProps>`
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Link = styled.a<SiteNavStyledProps>`
  display: flex;
  align-items: center;
  color: ${(props) => props.colorscheme?.primary1};
  font-size: ${fontSizeSix};
  font-weight: 300;
  height: 100%;
  justify-content: center;
  padding: ${fontSizeFive} ${fontSizeSeven};
  text-decoration: none;
  transition: padding 0.5s ease, opacity 0.25s ease 0.25s;
  width: 100%;
`;

export default function SiteNavItem(props: SiteNavItemProps) {
  const colorScheme = useColorScheme();

  const propsToAdd = {
    colorscheme: colorScheme !== null ? colorScheme : undefined,
  };
  return (
    <Item {...propsToAdd}>
      <Image
        {...propsToAdd}
        src="https://via.placeholder.com/150"
        alt="placeholder"
      />
      <Link {...propsToAdd} href="#">
        Link
      </Link>
    </Item>
  );
}
