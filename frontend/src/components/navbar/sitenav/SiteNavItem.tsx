import React, { HTMLAttributes, useCallback, useMemo } from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./types";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Link } from "react-router-dom";
import { useSiteNav } from "./SiteNavContext";
import { itemStyles, SITE_NAV_BORDER_SIZE, siteNavLinkStyles } from "./styles";
import { respond } from "../../../styles/breakpoints";

export enum SiteNaveItemOrientation {
  horizontal = "horizontal",
  vertical = "vertical",
}

export type SiteNavItemProps = {
  href?: string;
  image?: string;
  isMainItem?: boolean;
  isDropDownItem?: boolean;
  isLast?: boolean;
  itemProps?: Partial<HTMLAttributes<HTMLDivElement>>;
  orientation?: SiteNaveItemOrientation;
  text: string;
  to?: string;
};

const Item = styled.div<
  SiteNavStyledProps & { image: string; isdropdownitem: string }
>`
  ${(props) =>
    props.isdropdownitem === "true"
      ? ""
      : `border-left: ${SITE_NAV_BORDER_SIZE} solid ${props.colorscheme?.primary1};`}

  cursor: pointer;
  &:hover .image {
    ${(props) => (props.image ? "opacity: .1;" : "")}
  }

  &:hover {
    box-shadow: -10px 0 10px hsla(0, 0%, 7%, 0.5);
    transform: ${(props) =>
      props.orientation === SiteNaveItemOrientation.vertical
        ? `translate3d(0.56rem, 0, 0);`
        : `translate3d(0, -0.56rem, 0);`}
    background-color: ${(props) => props.colorscheme?.primary1};

    & .item-link {
      color: ${(props) => props.colorscheme?.primary4};
    }
  }
  transition: background 0.1666666667s ease, transform 0.25s ease,
    box-shadow 0.25s ease, -webkit-transform 0.25s ease, border-top .25s ease;

  ${itemStyles}

  ${(props) =>
    props.orientation === SiteNaveItemOrientation.vertical
      ? `
      border-top: ${SITE_NAV_BORDER_SIZE} solid ${props.colorscheme?.primary1};
    `
      : ""}

  ${respond.navSwitch`
    border-left: none;
  `}
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
    isMainItem = false,
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
      ismainitem: isMainItem.toString(),
      isopen: isOpen != null ? isOpen : undefined,
      islast: isLast ? "true" : "false",
      orientation: orientation,
    }),
    [colorScheme, isMainItem, isOpen, isLast, orientation]
  );

  const onClickLocal = useCallback(() => {
    toggleIsOpen();
  }, [toggleIsOpen]);

  return (
    <Item
      {...propsToAdd}
      isdropdownitem={isDropDownItem.toString()}
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
