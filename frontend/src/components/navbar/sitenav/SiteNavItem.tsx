import React, { HTMLAttributes, useCallback, useMemo } from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./types";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Link } from "react-router-dom";
import { useSiteNav } from "./SiteNavContext";
import { itemStyles, siteNavLinkStyles } from "./styles";

export enum SiteNaveItemOrientation {
  horizontal = "horizontal",
  vertical = "vertical",
}

export type SiteNavItemProps = {
  href?: string;
  image?: string;
  isLast?: boolean;
  itemProps?: Partial<HTMLAttributes<HTMLDivElement>>;
  orientation?: SiteNaveItemOrientation;
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

  &:hover {
    box-shadow: -10px 0 10px hsla(0, 0%, 7%, 0.5);
    /* -webkit-transform: translateX(.56rem) !important; */
    transform: translateX(0.56rem) !important;
    background-color: ${(props) => props.colorscheme?.primary1};

    & .item-link {
      color: ${(props) => props.colorscheme?.primary4};
    }

    & + div {
      border-top: 1px solid transparent;
    }
  }
  transition: background 0.1666666667s ease, transform 0.25s ease,
    box-shadow 0.25s ease, -webkit-transform 0.25s ease;

  ${itemStyles}

  ${(props) =>
    props.orientation === SiteNaveItemOrientation.vertical
      ? `
      border-top: 1px solid ${props.colorscheme?.primary1};
    `
      : ""}
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
  ${siteNavLinkStyles}
`;

const ExternalLink = styled.a<SiteNavStyledProps>`
  ${siteNavLinkStyles}
`;

export function SiteNavItem(props: SiteNavItemProps) {
  const colorScheme = useColorScheme();
  const { isOpen, toggleIsOpen } = useSiteNav();
  const {
    isDropDownItem = false,
    isLast = false,
    itemProps,
    orientation = SiteNaveItemOrientation.horizontal,
    text,
    to = "",
    href = "",
    image = "",
  } = props;

  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      isopen: isOpen != null ? isOpen : undefined,
      islast: isLast != null ? isLast : undefined,
      orientation: orientation,
    }),
    [colorScheme, isOpen, isLast, orientation]
  );

  const onClickLocal = useCallback(() => {
    toggleIsOpen();
  }, [toggleIsOpen]);

  return (
    <Item
      {...propsToAdd}
      isdropdownitem={isDropDownItem}
      image={image}
      {...itemProps}
    >
      <Image {...propsToAdd} src={image} alt={text} className="image" />
      {href ? (
        <ExternalLink
          {...propsToAdd}
          href={href || ""}
          className="item-link"
          onClick={onClickLocal}
        >
          {text}
        </ExternalLink>
      ) : (
        <StyledLink
          {...propsToAdd}
          to={to || ""}
          className="item-link"
          onClick={onClickLocal}
        >
          {text}
        </StyledLink>
      )}
    </Item>
  );
}
