import { useMemo, useState } from "react";
import { styled } from "styled-components";
import { SiteNavItem, SiteNavStyledProps } from "../types";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { dropDownContainerItemStyles } from "../styles";
import { useSiteNav } from "../SiteNavContext";

type SiteNavDrawerContextDropDownProps = SiteNavItem & {};

const DropDownContainer = styled.div<SiteNavStyledProps>`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1px;

`;

const DropDownContainerItem = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  grid-column: 1 / -1;
  ${dropDownContainerItemStyles}
`;

const DropDownContainerItemSubItem = styled.div<SiteNavStyledProps>`
  ${dropDownContainerItemStyles}
`;

export function SiteNavDrawerContentDropDown(
  props: SiteNavDrawerContextDropDownProps
) {
  const { drownDownItems, text, isDropdownItem } = props;
  const {scrollBarWidth} = useSiteNav();
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const colorScheme = useColorScheme();
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      scrollbarwidth: scrollBarWidth != null ? scrollBarWidth : undefined,
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [colorScheme, scrollBarWidth]
  );

  return (
    <DropDownContainer>
      <DropDownContainerItem
        {...propsToAdd}
        onClick={() => setIsSectionOpen((current) => !current)}
      >
        {text}
      </DropDownContainerItem>
      {isSectionOpen && isDropdownItem &&
        drownDownItems?.map((item, index) => {
          return (
            <DropDownContainerItemSubItem key={index} {...propsToAdd}>
              {item.text}
            </DropDownContainerItemSubItem>
          );
        })}
    </DropDownContainer>
  );
}
