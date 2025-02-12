import { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./sitenav/types";
import {
  BUTTON_WIDTH,
  fontSizeSix,
  getFontSizeCustom,
  SITE_NAV_NAV_SWITCH_TOP,
  SITE_NAV_TOP,
} from "../../styles/constants";
import { capitalize } from "../../helpers";
import { Link } from "react-router-dom";
import { respond } from "../../styles/breakpoints";
import { useColorScheme } from "../../hooks/useColorScheme";
import { navbarHeaderNavSwitchHeightStyles } from "./sitenav/styles";
import { useOnWindowResize } from "../../hooks/useOnWindowResize";

const PaddingOffset = styled.div<
  SiteNavStyledProps & { numberofsections?: number }
>`
  padding-top: 50vh;

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
  top: calc(${SITE_NAV_TOP} * 2 + ${BUTTON_WIDTH});
  z-index: 1000000;
  text-align: center;

  ${respond.navSwitch`
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${(
      props: SiteNavStyledProps
    ) => props.minpixelwidth}, 1fr));
    padding: 0 calc(${BUTTON_WIDTH} + ${SITE_NAV_NAV_SWITCH_TOP});
    ${navbarHeaderNavSwitchHeightStyles}
  `}
`;

const Item = styled(Link)<SiteNavStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary2};
  font-size: ${fontSizeSix};
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  font-weight: bold;
  padding: ${getFontSizeCustom(0.75)} ${getFontSizeCustom(0.75 * 2)};

  &:hover {
    transform: translateY(-0.25vw);
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
      0 -5px 35px hsla(0, 0%, 100%, 0.3);
  }

  ${respond.navSwitch`
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
    }),
    [colorScheme, minPixelWidth]
  );

  const onResize = useCallback(() => {
    setMinPixelWidth(`calc((${window.innerWidth}px - ${BUTTON_WIDTH} * 2 - ${SITE_NAV_NAV_SWITCH_TOP} * 2) / ${sections.length})`);
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
    <PaddingOffset>
      <ContentContainer {...propsToAdd}>
        {sections.map((section: Element, index: number) => (
          <Item key={index} to={`${window.location.pathname}#${section.id}`}>
            {capitalize(section.id)}
          </Item>
        ))}
      </ContentContainer>
    </PaddingOffset>
  );
}
