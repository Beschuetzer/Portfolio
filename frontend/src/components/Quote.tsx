import React, { HtmlHTMLAttributes, useRef } from "react";
import { LayoutStyledProps } from "../layouts/types";
import styled from "styled-components";
import {
  defaultFontSize,
  fontSizeSix,
  getFontSizeCustom,
} from "../styles/constants";

const Container = styled.figure<LayoutStyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${getFontSizeCustom(2)};
  cursor: pointer;
  text-align: center;
  position: relative;
  color: ${(props) => props.colorscheme?.primary3};

  &:hover {
    opacity: 0.75;
  }

  &:hover::before,
  &:hover::after {
    opacity: 0.5;
    color: ${(props) => props.colorscheme?.primary1};
  }

  &::before,
  &::after {
    color: ${(props) => props.colorscheme?.primary1};
    font-size: 4.272625rem;
    opacity: 0.125;
    padding: 0.896rem;
    position: absolute;
    top: 0;
  }

  &::before {
    content: "“";
    position: absolute;
    left: 0;
    top: 0;
  }

  &::after {
    content: "”";
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const BlockQuote = styled.blockquote<LayoutStyledProps>`
  position: relative;
  font-style: italic;
  font-size: ${fontSizeSix};
  font-family: "New Tegomin", serif;
`;

const Cite = styled.cite<LayoutStyledProps>`
  font-size: ${defaultFontSize};
  font-family: "Merriweather", serif;
`;

type QuoteProps = {
  author: string;
  containerProps?: HtmlHTMLAttributes<HTMLDivElement>;
  text: string;
};

export default function Quote(props: QuoteProps) {
  const { author, containerProps, text } = props;
  const messageRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        messageRef.current?.textContent || ""
      );
    } catch (error) {
      console.error("Failed to copy quote to clipboard: ", error);
    }
  };

  return (
    <Container {...containerProps} onClick={(e: any) => copyToClipboard()}>
      <BlockQuote ref={messageRef}>{text}</BlockQuote>
      <Cite ref={authorRef}>&#8212;{author}</Cite>
    </Container>
  );
}
