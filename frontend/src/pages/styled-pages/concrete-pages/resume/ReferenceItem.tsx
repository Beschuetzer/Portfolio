import { useColorScheme } from "../../../../hooks/useColorScheme";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { ExamplePageLink } from "../../ExamplePageLink";
import { defaultFontSize } from "../../../../styles/constants";

const Item = styled.div<LayoutStyledProps>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: ${defaultFontSize};
  margin-bottom: 0;
  padding-bottom: 0;
`;

export type ReferenceItemProps = {
  email: string;
  href?: string;
  name: string;
  isLast: boolean;
  phone?: string;
  relation: string;
};

export function ReferenceItem(props: ReferenceItemProps) {
  const { email, href, name, isLast, phone, relation } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
    islast: isLast ? "true" : "false",
  };
  return (
    <>
      <Item {...propsToAdd}>
        <ExamplePageLink url={href}>{name}</ExamplePageLink>
      </Item>
      <Item {...propsToAdd}>{phone}</Item>
      <Item {...propsToAdd}>{relation}</Item>
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
