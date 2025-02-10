import { useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";
import { SiteNavItemInput, SiteNavStyledProps } from "../types";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { dropDownContainerItemStyles } from "../styles";
import { useSiteNav } from "../SiteNavContext";
import SiteNavTriangle from "../SiteNavTriangle";
import {
  SiteNaveItemOrientation,
  SiteNavItem,
  SiteNavItemProps,
} from "../SiteNavItem";

type SiteNavDrawerContextDropDownProps = SiteNavItemInput & {};

const DropDownContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  transition: max-height 0.5s ease;
  padding-bottom: 1px;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2px;
  transition: transform 0.5s ease;
  height: ${(props) => (props.issectionopen === "true" ? "auto" : "0")};
`;

const DropDownContainerItemSubItem = styled.div<SiteNavStyledProps>`
  height: ${(props) => (props.issectionopen === "true" ? "auto" : "0")};
`;

export function SiteNavDrawerContentDropDown(
  props: SiteNavDrawerContextDropDownProps
) {
  const { drownDownItems, text, isDropdownItem } = props;
  const { scrollBarWidth } = useSiteNav();
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const colorScheme = useColorScheme();
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      scrollbarwidth: scrollBarWidth != null ? scrollBarWidth : undefined,
      colorscheme: colorScheme != null ? colorScheme : undefined,
      issectionopen: isSectionOpen.toString(),
    }),
    [colorScheme, isSectionOpen, scrollBarWidth]
  );

  const onConainterItemClick = useCallback(() => {
    setIsSectionOpen((prev) => !prev);
  }, []);

  const onSubItemClick = useCallback((item: SiteNavItemProps) => {
    setIsSectionOpen(false);
  }, []);

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
                onClick={onSubItemClick.bind(null, item)}
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
    <DropDownContainer>
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
      ) : <SiteNavItem {...props} />}
    </DropDownContainer>
  );
}
