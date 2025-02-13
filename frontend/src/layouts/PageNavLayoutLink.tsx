import React, { useMemo } from "react";
import { useColorScheme } from "../hooks/useColorScheme";
import { SiteNavStyledProps } from "../components/navbar/sitenav/types";
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

const Svg = styled.svg<SiteNavStyledProps>`
  height: 100%;
  width: 100%;
`;

const Title = styled.span<SiteNavStyledProps>`
  margin-left: 1rem;
`;

export type PageNavLayoutLinkProps = {
  svg: {
    xlinkHref: string;
    fill?: string;
  };
  title: {
    color?: string;
    text: string;
  };
  url: string;
};

export function PageNavLayoutLink(props: PageNavLayoutLinkProps) {
  const colorScheme = useColorScheme();
  const { svg, title, url } = props;
  const { xlinkHref, fill = colorScheme.primary4 } = svg;
  const { color: titleFill = colorScheme.primary4, text } = title;
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [colorScheme]
  );
  const isInternal = useMemo(() => url.startsWith("/"), [url]);
  const TagToUse = isInternal ? LinkInternal : LinkExternal;
  return (
    <TagToUse {...propsToAdd} to={url.trim()} href={url.trim()}>
      <Svg {...propsToAdd} fill={fill}>
        <Title {...propsToAdd} color={titleFill}>{text}</Title>
        <use xlinkHref={xlinkHref} />
      </Svg>
    </TagToUse>
  );
}
