import React from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Link } from "react-router-dom";
import { useSiteNav } from "./SiteNavContext";
import { linkStyles } from "./styles";

export type SiteNavItemProps = {
  href?: string;
  image?: string;
  isLast?: boolean;
  text: string;
  to?: string;
  isDropDownItem?: boolean;
};

const Item = styled.div<
  SiteNavStyledProps & { image: string; isdropdownitem: boolean }
>`
  background-color: ${(props) => props.colorscheme?.primary4};
  border-left: 0.28rem solid ${(props) => props.colorscheme?.primary1};
  ${(props) => (props.isdropdownitem ? "" : "cursor: pointer;")}
  height: 100%;
  position: relative;
  width: 100%;
  border-radius: ${(props) => (props.islast ? "0 14rem 14rem 0" : "0")};
  overflow: hidden;

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
  object-position: top; /* Centers the image within the container */
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const DropDownItem = styled.div<SiteNavStyledProps>`
  cursor: default;
  ${linkStyles}
`;

const StyledLink = styled(Link)<SiteNavStyledProps>`
  ${linkStyles}
`;

const ExternalLink = styled.a<SiteNavStyledProps>`
  ${linkStyles}
`;

const SiteNavTriangle = styled.div<SiteNavStyledProps>`
  border-color: transparent transparent transparent ${(props) => props.colorscheme?.primary1};
  border-style: solid;
  border-width: 0.462rem 0 0.462rem 1.05rem;
  height: 0;
  margin-left: 0.7rem;
  width: 0;
`;

export default function SiteNavItem(props: SiteNavItemProps) {
  const colorScheme = useColorScheme();
  const { isOpen } = useSiteNav();
  const {
    isDropDownItem = false,
    isLast = false,
    text,
    to = "",
    href = "",
    image = "",
  } = props;

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme !== null ? colorScheme : undefined,
    isopen: isOpen,
    islast: isLast,
  };

  return (
    <Item {...propsToAdd} isdropdownitem={isDropDownItem} image={image}>
      <Image {...propsToAdd} src={image} alt={text} className="image" />
      {isDropDownItem ? (
        <>
          <DropDownItem {...propsToAdd}>
            {text}
            <SiteNavTriangle {...propsToAdd} />
          </DropDownItem>
        </>
      ) : href ? (
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
