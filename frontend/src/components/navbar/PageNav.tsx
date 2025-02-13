import { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./sitenav/types";
import {
  BUTTON_WIDTH,
  fontSizeSix,
  fontSizeTen,
  SITE_NAV_NAV_SWITCH_TOP,
  SITE_NAV_TOP,
} from "../../styles/constants";
import { capitalize, ensureMaxLength } from "../../helpers";
import { Link } from "react-router-dom";
import { respond } from "../../styles/breakpoints";
import { useColorScheme } from "../../hooks/useColorScheme";
import { navbarHeaderNavSwitchHeightStyles } from "./sitenav/styles";
import { useOnWindowResize } from "../../hooks/useOnWindowResize";
import { hexToRgba } from "./sitenav/helpers";

const ITEM_HEIGHT = fontSizeTen;

const PaddingOffset = styled.div<SiteNavStyledProps>`
  ${(props) =>
    props.numberofsections != null
      ? `padding-top: calc(50vh - ${ITEM_HEIGHT} * ${
          props.numberofsections / 2
        } + (calc(${SITE_NAV_TOP} + ${BUTTON_WIDTH}) / 2));`
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
  top: calc(${SITE_NAV_TOP} * 2 + ${BUTTON_WIDTH} - ${ITEM_HEIGHT} / 2.75);
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

const Item = styled(Link)<SiteNavStyledProps>`
  font-size: ${fontSizeSix};
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  font-weight: bold;
  height: ${ITEM_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.25s ease, transform 0.25s ease, text-shadow 0.25s ease;
  color: ${(props) => hexToRgba(props.colorscheme?.primary4, 0.75)};

  &:hover {
    transform: translateY(-0.25vw);
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
      0 -5px 35px hsla(0, 0%, 100%, 0.3);
    color: ${(props) => props.colorscheme?.primary4};
  }

  ${respond.navSwitch`
    font-size: 1.66vw;
    height: auto;
    padding: 0;
  `}
`;

type PageNavProps = {};

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

  console.log({ propsToAdd, sections });

  const onResize = useCallback(() => {
    ////old approach
    // setMinPixelWidth(
    //   `calc((${window.innerWidth}px - ${BUTTON_WIDTH} * 2 - ${SITE_NAV_NAV_SWITCH_TOP} * 2) / ${sections.length})`
    // );
    ////old column style
    // grid-template-columns: repeat(auto-fill, minmax(${(
    //   props: SiteNavStyledProps
    // ) => props.minpixelwidth}, 1fr));

    setMinPixelWidth(`${Math.ceil(sections.length / 2)}`);
  }, [sections.length]);

  useEffect(() => {
    const elementsWithId = Array.from(document.querySelectorAll("[id]"));
    if (!elementsWithId || elementsWithId.length === 0) {
      console.warn("PageNav - No elements with id found");
      return;
    }
    setSections(
      elementsWithId.filter((element) => element.id && element.id !== "root")
    );
  }, []);
  useOnWindowResize(onResize);

  return (
    <PaddingOffset {...propsToAdd}>
      <ContentContainer {...propsToAdd}>
        {sections.map((section: Element, index: number) => (
          <Item
            key={index}
            to={`${window.location.pathname}#${section.id}`}
            {...propsToAdd}
          >
            {ensureMaxLength(capitalize(section.id), 18)}
          </Item>
        ))}
      </ContentContainer>
    </PaddingOffset>
  );
}
