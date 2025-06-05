import { useColorScheme } from "../../../../hooks/useColorScheme";
import styled, { css } from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { ExamplePageLink } from "../../ExamplePageLink";
import { defaultFontSize } from "../../../../styles/constants";
import { copyClickedElementTextToClipboard } from "../../../../helpers";
import { toast } from "react-toastify";

const itemStyles = css<LayoutStyledProps>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: ${defaultFontSize};
  margin-bottom: 0;
  padding-bottom: 0;
`;

const Item = styled.div<LayoutStyledProps>`
  ${itemStyles}
`;

const ItemCopyable = styled.div<LayoutStyledProps>`
  ${itemStyles}
  cursor: pointer;
  &:hover {
    color: ${(props) => props.colorscheme?.primary1};
    text-decoration: underline;
  }
`;

export type ReferenceItemProps = {
  email: string;
  href?: string;
  isLast: boolean;
  linkedInUrl?: string;
  name: string;
  phone?: string;
  relation: string;
};

export function ReferenceItem(props: ReferenceItemProps) {
  const { email, href, name, isLast, linkedInUrl, phone, relation } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
    islast: isLast ? "true" : "false",
  };

  const handleCopy = (e: React.MouseEvent<HTMLElement>) => {
    if (phone) {
      copyClickedElementTextToClipboard(e);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <>
      <Item {...propsToAdd}>
        <ExamplePageLink url={linkedInUrl || href} includeSpaces={false}>
          {name}
        </ExamplePageLink>
      </Item>
      <ItemCopyable
        {...propsToAdd}
        onClick={handleCopy}
        role="button"
        tabIndex={0}
      >
        {phone}
      </ItemCopyable>
      <ItemCopyable
        {...propsToAdd}
        onClick={handleCopy}
        role="button"
        tabIndex={0}
      >
        {relation}
      </ItemCopyable>
      {email ? (
        <Item {...propsToAdd}>
          <ExamplePageLink includeSpaces={false} url={`mailto:${email}`}>
            {email}
          </ExamplePageLink>
        </Item>
      ) : (
        <Item {...propsToAdd} />
      )}
    </>
  );
}
