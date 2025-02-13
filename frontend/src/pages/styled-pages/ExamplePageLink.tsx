import React, { HtmlHTMLAttributes, ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { linkStyles } from "../../styles/styles";
import { useColorScheme } from "../../hooks/useColorScheme";

const LinkInternal = styled(Link)<LayoutStyledProps>`
  ${linkStyles}
`;

const LinkExternal = styled.a<LayoutStyledProps>`
  ${linkStyles}
`;

type ExamplePageLinkProps = { children: ReactNode | ReactNode[]; url: string };

export function ExamplePageLink(props: ExamplePageLinkProps) {
  const { children, url } = props;
  const colorScheme = useColorScheme();
  const isInternal = useMemo(() => url.startsWith("/"), [url]);
  const propToAdd: LayoutStyledProps & { target: string; rel: string } = {
    colorscheme: colorScheme,
    target: "_blank",
    rel: "noopener noreferrer",
  };

  return isInternal ? (
    <LinkInternal {...propToAdd} to={url.trim()}>
      {children}
    </LinkInternal>
  ) : (
    <LinkExternal {...propToAdd} href={url.trim()}>
      {children}
    </LinkExternal>
  );
}
