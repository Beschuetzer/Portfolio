import React, { useMemo } from "react";
import styled from "styled-components";
import { triangleRotateStyles } from "./styles";
import { SiteNavStyledProps } from "./types";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { useSiteNav } from "./SiteNavContext";
import { SiteNaveItemOrientation as SiteNavItemOrientation } from "./SiteNavItem";

const Triangle = styled.div<SiteNavStyledProps & { ishovering?: boolean }>`
  border-color: transparent transparent transparent
    ${(props) => props.colorscheme?.primary1};
  border-style: solid;
  border-width: 0.462rem 0 0.462rem 1.05rem;
  height: 0;
  margin-left: 0.7rem;
  width: 0;
  transition: transform 0.25s ease, -webkit-transform 0.25s ease;
  ${(props) => (props.ishovering ? triangleRotateStyles : "")}
`;

type SiteNavTriangleProps = {
  orientation?: SiteNavItemOrientation;
};

export default function SiteNavTriangle(props: SiteNavTriangleProps) {
  const { orientation = SiteNavItemOrientation.horizontal } = props;
  const { isOpen } = useSiteNav();
  const colorScheme = useColorScheme();
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      isopen: isOpen ? "true" : undefined,
      ishovering: orientation === SiteNavItemOrientation.vertical,
    }),
    [colorScheme, isOpen, orientation]
  );
  return <Triangle {...propsToAdd} className="triangle" />;
}
