import React from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Link } from "react-router-dom";
import { useSiteNav } from "./SiteNavContext";
import { itemStyles, linkStyles } from "./styles";

export enum SiteNaveItemOrientation {
  horizontal = "horizontal",
  vertical = "vertical",
}

export type SiteNavItemProps = {
  href?: string;
  image?: string;
  isLast?: boolean;
  orientation?: SiteNaveItemOrientation
  text: string;
  to?: string;
  isDropDownItem?: boolean;
};

const Item = styled.div<
  SiteNavStyledProps & { image: string; isdropdownitem: boolean }
>`
  cursor: pointer;
  &:hover .image {
    ${(props) => (props.image ? "opacity: .1;" : "")}
  }

  ${itemStyles}
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
  object-position: top; /* Centers the image within the container */
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const StyledLink = styled(Link)<SiteNavStyledProps>`
  ${linkStyles}
`;

const ExternalLink = styled.a<SiteNavStyledProps>`
  ${linkStyles}
`;

export default function SiteNavItem(props: SiteNavItemProps) {
  const colorScheme = useColorScheme();
  const { isOpen } = useSiteNav();
  const {
    isDropDownItem = false,
    isLast = false,
    orientation = SiteNaveItemOrientation.horizontal,
    text,
    to = "",
    href = "",
    image = "",
  } = props;

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme !== null ? colorScheme : undefined,
    isopen: isOpen,
    islast: isLast,
    orientation: orientation,
  };

  return (
    <Item {...propsToAdd} isdropdownitem={isDropDownItem} image={image}>
      <Image {...propsToAdd} src={image} alt={text} className="image" />
      {href ? (
        <ExternalLink {...propsToAdd} href={href || ""}>
          {text}
        </ExternalLink>
      ) : (
        <StyledLink {...propsToAdd} to={to || ""}>
          {text}
        </StyledLink>
      )}
    </Item>
  );
}
