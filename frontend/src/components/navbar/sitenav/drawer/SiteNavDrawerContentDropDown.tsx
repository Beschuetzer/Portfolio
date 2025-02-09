import { useMemo } from "react";
import { styled } from "styled-components";
import { SiteNavItem, SiteNavStyledProps } from "../types";
import { fontSizeSix, SCROLL_BAR_WIDTH_IN_REM } from "../../../../styles/constants";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { dropDownContainerItemStyles } from "../styles";

type SiteNavDrawerContextDropDownProps = SiteNavItem & {};

const DropDownContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const DropDownContainerItem = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.colorscheme?.primary4};
  border: 1px solid ${(props) => props.colorscheme?.primary1};
  color: ${(props) => props.colorscheme?.primary1};
  position: relative;
  font-size: ${fontSizeSix};
  ${dropDownContainerItemStyles}
`;

const DropDownContainerItemSubItem = styled.div<SiteNavStyledProps>`
  ${dropDownContainerItemStyles}
`;


export function SiteNavDrawerContentDropDown(
  props: SiteNavDrawerContextDropDownProps
) {
  const { drownDownItems, text, isDropdownItem } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: SiteNavStyledProps = useMemo(() => ({
    scrollbarwidth: `${SCROLL_BAR_WIDTH_IN_REM}rem`,
    colorscheme: colorScheme != null ? colorScheme : undefined,
  }), [colorScheme]);

  return (
    <DropDownContainer>
      <DropDownContainerItem {...propsToAdd}>{text}</DropDownContainerItem>
      {isDropdownItem &&
        drownDownItems?.map((item, index) => {
          return <DropDownContainerItemSubItem key={index} {...propsToAdd}>{item.text}</DropDownContainerItemSubItem>;
        })}
    </DropDownContainer>
  );
}
