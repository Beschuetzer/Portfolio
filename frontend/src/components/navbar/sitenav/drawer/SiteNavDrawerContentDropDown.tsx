import { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { SiteNavItemInput, SiteNavStyledProps } from "../types";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { dropDownContainerItemStyles, itemTransformStyles } from "../styles";
import { useSiteNav } from "../SiteNavContext";
import SiteNavTriangle from "../SiteNavTriangle";
import { SiteNaveItemOrientation, SiteNavItem } from "../SiteNavItem";
import { respond } from "../../../../styles/breakpoints";
import { SITE_NAV_NAV_SWITCH_TOP } from "../../../../styles/constants";
import { defaultFontSize } from "../../../../styles/constants";

type SiteNavDrawerContextItemProps = SiteNavItemInput & { index: number };

type StyledProps = SiteNavStyledProps &
  Pick<SiteNavDrawerContextItemProps, "index">;

const SPACING = defaultFontSize;

const ItemContainer = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: ${SPACING};
  ${itemTransformStyles}
  transform: translateX(${(props) =>
    props.isopen ? "0" : `calc(-100% - ${SITE_NAV_NAV_SWITCH_TOP})`});
  user-select: none;
`;

const ItemContainerItem = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  grid-column: 1 / -1;
  font-weight: 300;
  ${(props) =>
    props.issectionopen === "true"
      ? `margin-bottom: 1px;`
      : ""}

  ${dropDownContainerItemStyles}
`;

const SubItemContainer = styled.div<SiteNavStyledProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2px;
  transition: transform 0.5s ease;
  height: ${(props) => (props.issectionopen === "true" ? "auto" : "0")};
  ${respond.phone`
    grid-template-columns: 1fr 1fr;
    `}
`;

const SubItem = styled.div<StyledProps>`
  height: ${(props) => (props.issectionopen === "true" ? "auto" : "0")};
  ${itemTransformStyles}
  transform: translateX(
    ${(props) =>
    props.issectionopen === "true"
      ? "0"
      : `calc(-${(props.index % 3) + 1}00% - ${SITE_NAV_NAV_SWITCH_TOP} - ${
          props.index % 3
        } * ${SPACING})`}
  );
  ${respond.phone`
    transform: translateX(
      ${(props: StyledProps) =>
        props.issectionopen === "true"
          ? "0"
          : `calc(-${
              (props.index % 2) + 1
            }00% - ${SITE_NAV_NAV_SWITCH_TOP}  - ${
              props.index % 3
            } * ${SPACING})`}
    );
  `}
`;

export function SiteNavDrawerContentItem(props: SiteNavDrawerContextItemProps) {
  const { drownDownItems, text, isDropdownItem, index } = props;
  const { scrollBarWidth, isOpen } = useSiteNav();
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const colorScheme = useColorScheme();
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      scrollbarwidth: scrollBarWidth != null ? scrollBarWidth : undefined,
      colorscheme: colorScheme != null ? colorScheme : undefined,
      issectionopen: isSectionOpen.toString(),
      isopen: isOpen != null ? isOpen : undefined,
    }),
    [colorScheme, isOpen, isSectionOpen, scrollBarWidth]
  );

  const onConainterItemClick = useCallback(() => {
    setIsSectionOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isOpen) return;
    setIsSectionOpen(false);
  }, [isOpen]);

  function renderItems() {
    if (isDropdownItem) {
      return (
        <SubItemContainer {...propsToAdd}>
          {drownDownItems?.map((item, index) => {
            return (
              <SubItem
                key={index}
                {...propsToAdd}
                issectionopen={isSectionOpen.toString()}
                index={index}
              >
                <SiteNavItem {...item} />
              </SubItem>
            );
          })}
        </SubItemContainer>
      );
    }
    return null;
  }

  return (
    <ItemContainer
      {...propsToAdd}
      index={index}
      onClick={(e) => e.stopPropagation()}
    >
      {isDropdownItem ? (
        <>
          <ItemContainerItem {...propsToAdd} onClick={onConainterItemClick}>
            {text}
            <SiteNavTriangle
              orientation={
                isSectionOpen
                  ? SiteNaveItemOrientation.vertical
                  : SiteNaveItemOrientation.horizontal
              }
            />
          </ItemContainerItem>
          {renderItems()}
        </>
      ) : (
        <SiteNavItem {...props} />
      )}
    </ItemContainer>
  );
}
