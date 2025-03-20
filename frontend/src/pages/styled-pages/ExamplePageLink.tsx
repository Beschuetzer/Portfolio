import { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { linkStyles } from "../../styles/styles";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyledPageProps } from "./types";

const LinkInternal = styled(Link)<LayoutStyledProps>`
  ${linkStyles}
`;

const LinkExternal = styled.a<LayoutStyledProps>`
  ${linkStyles}
`;

type ExamplePageLinkProps = StyledPageProps & {
  includeSpaces?: boolean;
  url?: string;
};

export function ExamplePageLink(props: ExamplePageLinkProps) {
  const { children, htmlAttributes, includeSpaces = true, url = "" } = props;
  const colorScheme = useColorScheme();
  const isInternal = useMemo(() => url.startsWith("/"), [url]);
  const propToAdd: LayoutStyledProps & { target: string; rel: string } = {
    colorscheme: colorScheme,
    target: "_blank",
    rel: "noopener noreferrer",
    url: url.trim(),
  };

  if (!url) {
    return <>{children}</>;
  }
  return (
    <>
      {includeSpaces && <>&nbsp;</>}
      {isInternal ? (
        <LinkInternal {...propToAdd} to={url.trim()} {...htmlAttributes}>
          {children}
        </LinkInternal>
      ) : (
        <LinkExternal {...propToAdd} href={url.trim()} {...htmlAttributes}>
          {children}
        </LinkExternal>
      )}
      {includeSpaces && <>&nbsp;</>}
    </>
  );
}
