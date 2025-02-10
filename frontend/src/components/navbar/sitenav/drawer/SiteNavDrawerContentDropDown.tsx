import { useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";
import { SiteNavItemInput, SiteNavStyledProps } from "../types";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { dropDownContainerItemStyles } from "../styles";
import { useSiteNav } from "../SiteNavContext";
import SiteNavTriangle from "../SiteNavTriangle";
import { SiteNaveItemOrientation, SiteNavItem, SiteNavItemProps } from "../SiteNavItem";

type SiteNavDrawerContextDropDownProps = SiteNavItemInput & {};

const DropDownContainer = styled.div<SiteNavStyledProps>`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1px;
  padding-bottom: 1px;
  transition: max-height 0.5s ease;
`;

const DropDownContainerItem = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  grid-column: 1 / -1;
  font-weight: 300;
  ${dropDownContainerItemStyles}
`;

const DropDownContainerItemSubItem = styled.div<
  SiteNavStyledProps & { issectionopen?: string }
>`
  transform: scale(${(props) => (props.issectionopen === "true" ? "1" : "0")});
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
    }),
    [colorScheme, scrollBarWidth]
  );

const onConainterItemClick = useCallback(() => {
    setIsSectionOpen((prev) => !prev);
  }, []);

  const onSubItemClick = useCallback((item: SiteNavItemProps) => {
    setIsSectionOpen(false);
  }, []);

  return (
    <DropDownContainer>
      <DropDownContainerItem
        {...propsToAdd}
        onClick={(onConainterItemClick)}
      >
        {text}
        {isDropdownItem ? (
          <SiteNavTriangle
            orientation={
              isSectionOpen
                ? SiteNaveItemOrientation.vertical
                : SiteNaveItemOrientation.horizontal
            }
          />
        ) : null}
      </DropDownContainerItem>
      {isDropdownItem &&
        drownDownItems?.map((item, index) => {
          return (
            <DropDownContainerItemSubItem
              key={index}
              {...propsToAdd}
              issectionopen={isSectionOpen.toString()}
              onAbort={onSubItemClick.bind(null, item)}
            >
              <SiteNavItem {...item} />
            </DropDownContainerItemSubItem>
          );
        })}
    </DropDownContainer>
  );
}
