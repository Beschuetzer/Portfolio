import { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./sitenav/types";
import {
  BUTTON_WIDTH,
  PAGE_NAV_ITEM_HEIGHT,
  SITE_NAV_NAV_SWITCH_TOP,
  SITE_NAV_TOP,
} from "../../styles/constants";
import { respond } from "../../styles/breakpoints";
import { useColorScheme } from "../../hooks/useColorScheme";
import { navbarHeaderNavSwitchHeightStyles } from "./sitenav/styles";
import { useOnWindowResize } from "../../hooks/useOnWindowResize";
import { AUDIO_PLAYER_TOGGLER_CLASSNAME } from "../AudioPlayer/AudioPlayer";
import { PageNavItem } from "./PageNavItem";


const PaddingOffset = styled.div<SiteNavStyledProps>`
  ${(props) =>
    props.numberofsections != null
      ? `padding-top: calc(50vh - ${PAGE_NAV_ITEM_HEIGHT} * ${
          props.numberofsections / 2
        });`
      : ""}

  ${respond.navSwitch`
    padding-top: 0;
  `}
`;

const ContentContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  position: sticky;
  top: calc(${SITE_NAV_TOP} * 2 + ${BUTTON_WIDTH} - ${PAGE_NAV_ITEM_HEIGHT} / 2.75);
  text-align: center;
  user-select: none;

  ${respond.navSwitch`
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    display: grid;
    column-gap: 1vw;
    grid-template-columns: repeat(${(props: SiteNavStyledProps) =>
      props.minpixelwidth}, 1fr);
    margin: 0 calc(${BUTTON_WIDTH} + ${SITE_NAV_NAV_SWITCH_TOP});
    z-index: 1000000;
    ${navbarHeaderNavSwitchHeightStyles}
  `}
`;


type PageNavProps = {};

const IDS_NOT_ALLOWED = ["root", AUDIO_PLAYER_TOGGLER_CLASSNAME];

export function PageNav(props: PageNavProps) {
  const colorScheme = useColorScheme();
  const [sections, setSections] = useState<Element[]>([]);
  const [minPixelWidth, setMinPixelWidth] = useState("187px");
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      minpixelwidth: minPixelWidth,
      numberofsections: sections.length,
    }),
    [colorScheme, minPixelWidth, sections.length]
  );

  const onResize = useCallback(() => {
    setMinPixelWidth(`${Math.ceil(sections.length / 2)}`);
  }, [sections.length]);

  useEffect(() => {
    const elementsWithId = Array.from(document.querySelectorAll("[id]"));
    if (!elementsWithId || elementsWithId.length === 0) {
      console.warn("PageNav - No elements with id found");
      return;
    }
    setSections(
      elementsWithId.filter(
        (element) => element.id && !IDS_NOT_ALLOWED.includes(element.id)
      )
    );
  }, []);
  useOnWindowResize(onResize);

  return (
    <PaddingOffset {...propsToAdd}>
      <ContentContainer {...propsToAdd}>
        {sections.map((section: Element, index: number) => <PageNavItem key={index} section={section}/>)}
      </ContentContainer>
    </PaddingOffset>
  );
}
