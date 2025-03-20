import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type CodeDisplayerProps = {
  styleProps?: SyntaxHighlighterProps;
  code: string;
  language?: string;
}

export const CodeDisplayer = (props: CodeDisplayerProps) => {
  const { code, language = "javascript", styleProps } = props;
  return (
    //@ts-ignore
    <SyntaxHighlighter style={dark} language={language} wrapLines={true} {...styleProps}>
      {code}
    </SyntaxHighlighter>
  );
};