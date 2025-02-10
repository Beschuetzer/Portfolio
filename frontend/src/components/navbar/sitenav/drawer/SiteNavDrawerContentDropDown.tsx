import { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { SiteNavItemInput, SiteNavStyledProps } from "../types";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { dropDownContainerItemStyles } from "../styles";
import { useSiteNav } from "../SiteNavContext";
import SiteNavTriangle from "../SiteNavTriangle";
import {
  SiteNaveItemOrientation,
  SiteNavItem,
} from "../SiteNavItem";
import { respond } from "../../../../styles/breakpoints";

type SiteNavDrawerContextDropDownProps = SiteNavItemInput & { index: number };

const DropDownContainer = styled.div<
  SiteNavStyledProps & Pick<SiteNavDrawerContextDropDownProps, "index">
>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 1px;
  transition: transform 0.5s ease;
  transition-delay: ${(props) =>
    props.isopen ? `${props.index * 0.05 + 0}s` : "0"};
  transform: translateX(${(props) => (props.isopen ? "0" : "-100%")});
`;

const DropDownContainerItem = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  grid-column: 1 / -1;
  font-weight: 300;
  ${dropDownContainerItemStyles}
`;

const DropDownContainerItemSubItemContainer = styled.div<SiteNavStyledProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2px;
  transition: transform 0.5s ease;
  height: ${(props) => (props.issectionopen === "true" ? "auto" : "0")};
  ${respond.phone`
    grid-template-columns: 1fr 1fr;
    `}
`;

const DropDownContainerItemSubItem = styled.div<SiteNavStyledProps>`
  height: ${(props) => (props.issectionopen === "true" ? "auto" : "0")};
`;

export function SiteNavDrawerContentDropDown(
  props: SiteNavDrawerContextDropDownProps
) {
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
        <DropDownContainerItemSubItemContainer {...propsToAdd}>
          {drownDownItems?.map((item, index) => {
            return (
              <DropDownContainerItemSubItem
                key={index}
                {...propsToAdd}
                issectionopen={isSectionOpen.toString()}
              >
                <SiteNavItem {...item} />
              </DropDownContainerItemSubItem>
            );
          })}
        </DropDownContainerItemSubItemContainer>
      );
    }
    return null;
  }

  return (
    <DropDownContainer {...propsToAdd} index={index}>
      {isDropdownItem ? (
        <>
          <DropDownContainerItem {...propsToAdd} onClick={onConainterItemClick}>
            {text}
            <SiteNavTriangle
              orientation={
                isSectionOpen
                  ? SiteNaveItemOrientation.vertical
                  : SiteNaveItemOrientation.horizontal
              }
            />
          </DropDownContainerItem>
          {renderItems()}
        </>
      ) : (
        <SiteNavItem {...props} />
      )}
    </DropDownContainer>
  );
}
