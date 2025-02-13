import React, { useMemo } from "react";
import { useColorScheme } from "../../hooks/useColorScheme";
import { SiteNavStyledProps } from "../../components/navbar/sitenav/types";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const LinkInternal = styled(Link)<SiteNavStyledProps>`
  color: ${(props) => props.colorscheme?.primary4};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.colorscheme?.primary3};
  }
`;

const LinkExternal = styled.a<SiteNavStyledProps>``;

type ExamplePageLinkProps = {
  svg: string;
  title: string;
  url: string;
};

export function ExamplePageLink(props: ExamplePageLinkProps) {
  const { svg, title, url } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [colorScheme]
  );
  return <div>ExamplePageLink</div>;
}
