import { useMemo } from "react";
import { useSiteNav } from "../SiteNavContext";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { SiteNavStyledProps } from "../types";
import { styled } from "styled-components";
import { SiteNavDrawerContentItem } from "./SiteNavDrawerContentDropDown";
import { SITE_NAV_NAV_SWITCH_TOP } from "../../../../styles/constants";

const ContentContainer = styled.div<SiteNavStyledProps>`
  text-align: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  padding-top: calc(
    calc(${(props) => props.sitenavnavswitchtop} * 2) +
      ${(props) => `${props.buttonradius}`}
  );
  padding-left: ${(props) => props.sitenavnavswitchtop};
  padding-right: calc(${(props) => props.scrollbarwidth});
`;

type SiteNavDrawerContentProps = {};

export default function SiteNavDrawerContent(props: SiteNavDrawerContentProps) {
  const colorScheme = useColorScheme();
  const { items, buttonRadius, scrollBarWidth, toggleIsOpen } = useSiteNav();

  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      buttonradius: buttonRadius != null ? buttonRadius : undefined,
      colorscheme: colorScheme != null ? colorScheme : undefined,
      sitenavnavswitchtop: SITE_NAV_NAV_SWITCH_TOP,
      scrollbarwidth: scrollBarWidth != null ? scrollBarWidth : undefined,
    }),
    [buttonRadius, colorScheme, scrollBarWidth]
  );

  const itemsToRender = useMemo(() => {
    return items.map((item, index) => {
      return <SiteNavDrawerContentItem key={index} {...item} index={index} />;
    });
  }, [items]);

  return (
    <ContentContainer {...propsToAdd} onClick={() => toggleIsOpen()}>
      {itemsToRender}
    </ContentContainer>
  );
}
