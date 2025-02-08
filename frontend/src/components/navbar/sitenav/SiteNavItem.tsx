import React from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";
import { useColorScheme } from "../../../hooks/useColorScheme";
import {
  fontSizeFive,
  fontSizeSeven,
  fontSizeSix,
} from "../../../styles/constants";
import { Link } from "react-router-dom";

export type SiteNavItemProps = {
  href?: string;
  image?: string;
  text: string;
  to?: string;
  isDropDownItem?: boolean;
};

const Item = styled.div<SiteNavStyledProps & { image: string, isdropdownitem: boolean }>`
  background-color: ${(props) => props.colorscheme?.primary4};
  border-left: 0.28rem solid ${(props) => props.colorscheme?.primary1};
  ${props => props.isdropdownitem ? "" : "cursor: pointer;"}
  height: 100%;
  position: relative;
  transition: transform 0.125s ease, background-color 0.125s ease,
    -webkit-transform 0.125s ease;
  width: 100%;

  &:hover .image {
    ${(props) => (props.image ? "opacity: .1;" : "")}
  }
`;

const Image = styled.img<SiteNavStyledProps>`
   left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the entire container */
  object-position: top  ; /* Centers the image within the container */
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const StyledLink = styled(Link)<SiteNavStyledProps>`
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
  const { isDropDownItem = false, text, to = "", href = "", image = "" } = props;

  const propsToAdd = {
    colorscheme: colorScheme !== null ? colorScheme : undefined,
    image,
    isdropdownitem: isDropDownItem
  };

  return (
    <Item {...propsToAdd} >
      <Image {...propsToAdd} src={image} alt={text} className="image" />
      <StyledLink {...propsToAdd} to={href || ""} href={href || ""}>
        {text}
      </StyledLink>
    </Item>
  );
}
