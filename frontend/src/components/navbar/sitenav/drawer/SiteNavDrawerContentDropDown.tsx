import { useMemo, useState } from "react";
import { styled } from "styled-components";
import { SiteNavItem, SiteNavStyledProps } from "../types";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { dropDownContainerItemStyles } from "../styles";
import { useSiteNav } from "../SiteNavContext";
import { fontSizeFive } from "../../../../styles/constants";

type SiteNavDrawerContextDropDownProps = SiteNavItem & {};

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
  flex-direction: column;
  position: relative;
  grid-column: 1 / -1;
  font-weight: 300;
  ${dropDownContainerItemStyles}
`;

const DropDownContainerItemSubItem = styled.div<
  SiteNavStyledProps & { issectionopen?: string }
>`
${dropDownContainerItemStyles}
${props => props.issectionopen === "true" ? `display: flex;` : `display: none;`}
font-size: ${fontSizeFive};
font-weight: 900
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

  return (
    <DropDownContainer>
      <DropDownContainerItem
        {...propsToAdd}
        onClick={() => setIsSectionOpen((current) => !current)}
      >
        {text}
      </DropDownContainerItem>
      {isDropdownItem &&
        drownDownItems?.map((item, index) => {
          return (
            <DropDownContainerItemSubItem
              key={index}
              {...propsToAdd}
              issectionopen={isSectionOpen.toString()}
            >
              {item.text}
            </DropDownContainerItemSubItem>
          );
        })}
    </DropDownContainer>
  );
}
