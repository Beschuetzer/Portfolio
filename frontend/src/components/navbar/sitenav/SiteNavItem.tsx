import React, { HTMLAttributes, useCallback, useMemo } from "react";
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

  ${itemStyles}

  ${(props) =>
    props.orientation === SiteNaveItemOrientation.vertical
      ? `
      border-top: 1px solid ${props.colorscheme?.primary1};
      transition: background .1666666667s ease, transform .25s ease,box-shadow .25s ease,-webkit-transform .25s ease;
      &:hover {
        box-shadow: -10px 0 10px hsla(0, 0%, 7%, 0.5);
        /* -webkit-transform: translateX(.56rem) !important; */
        transform: translateX(0.56rem) !important;
        background-color: ${props.colorscheme?.primary1};


        & .item-link {
          color: ${props.colorscheme?.primary4};
        }

        & + div {
          border-top: 1px solid transparent;
        }
      }
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
  ${linkStyles}
`;

const ExternalLink = styled.a<SiteNavStyledProps>`
  ${linkStyles}
`;

export default function SiteNavItem(props: SiteNavItemProps) {
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

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme !== null ? colorScheme : undefined,
    isopen: isOpen,
    islast: isLast,
    orientation: orientation,
  };

  const onClickLocal = useCallback(() => {
    toggleIsOpen();
  }, [toggleIsOpen]);

  return (
    <Item {...propsToAdd} isdropdownitem={isDropDownItem} image={image} {...itemProps}>
      <Image {...propsToAdd} src={image} alt={text} className="image" />
      {href ? (
        <ExternalLink {...propsToAdd} href={href || ""} className="item-link" onClick={onClickLocal}>
          {text}
        </ExternalLink>
      ) : (
        <StyledLink {...propsToAdd} to={to || ""} className="item-link" onClick={onClickLocal}>
          {text}
        </StyledLink>
      )}
    </Item>
  );
}
