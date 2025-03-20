import { HtmlHTMLAttributes, useRef, useState } from "react";
import { LayoutStyledProps } from "../layouts/types";
import styled from "styled-components";
import {
  defaultFontSize,
  fontSizeFour,
  fontSizeNine,
  getFontSizeCustom,
} from "../styles/constants";
import { useColorScheme } from "../hooks/useColorScheme";
import { paragraphMarginTop } from "../styles/styles";

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
  color: ${(props) => props.colorscheme?.primary1};
  transition: opacity 0.25s ease-in-out;
  ${paragraphMarginTop}

  &:hover > *:not(:first-child) {
    opacity: 0.75;
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }

  &::before,
  &::after {
    transition: opacity 0.25s ease-in-out;
    font-size: ${fontSizeNine};
    opacity: 0.125;
    position: absolute;
    top: 0;
  }

  &::before {
    content: "“";
    left: 0;
  }

  &::after {
    content: "”";
    right: 0;
  }
`;

const BlockQuote = styled.blockquote<LayoutStyledProps>`
  position: relative;
  font-style: italic;
  font-size: ${fontSizeFour};
  font-family: "New Tegomin", serif;
`;

const Cite = styled.cite<LayoutStyledProps>`
  font-size: ${defaultFontSize};
  font-family: "Merriweather", serif;
`;

const Popup = styled.div<LayoutStyledProps>`
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.colorscheme?.primary1};
  color: ${(props) => props.colorscheme?.primary4};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.ispopupvisible === 'true' ? 1 : 0)};
  transition: opacity 0.25s ease-in-out;
  font-size: ${fontSizeFour};
  z-index: 1000;
  border-radius: ${getFontSizeCustom(0.5)};
`;

type QuoteProps = {
  author: string;
  containerProps?: HtmlHTMLAttributes<HTMLDivElement>;
  text: string;
};

const COPY_MESSAGE_TIMEOUT = 1000;

export function Quote(props: QuoteProps) {
  const { author, containerProps, text } = props;
  const colorScheme = useColorScheme();
  const messageRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const [popupMessage, setPopupMessage] = useState("");
  const isVisibleTimeout = useRef<any>(null);

  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme != null ? colorScheme : undefined,
    ispopupvisible: popupMessage.length > 0 ? "true" : "false",
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        messageRef.current?.textContent || ""
      );
      setPopupMessage("Copied Quote to Clipboard!");
    } catch (error) {
      setPopupMessage("Failed to Copy Quote to Clipboard...");
    } finally {
      isVisibleTimeout.current && clearTimeout(isVisibleTimeout.current);
      isVisibleTimeout.current = setTimeout(() => {
        setPopupMessage("");
      }, COPY_MESSAGE_TIMEOUT);
    }
  };

  return (
    <Container
      {...containerProps}
      {...propsToAdd}
      onClick={(e: any) => copyToClipboard()}
    >
      <Popup {...propsToAdd}>{popupMessage}</Popup>
      <BlockQuote ref={messageRef} {...propsToAdd}>
        {text}
      </BlockQuote>
      <Cite ref={authorRef} {...propsToAdd}>
        &#8212;{author}
      </Cite>
    </Container>
  );
}
