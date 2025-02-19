import { useColorScheme } from "../../../../hooks/useColorScheme";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { ExamplePageLink } from "../../ExamplePageLink";

const Relation = styled.div<LayoutStyledProps>``;

export type ReferenceItemProps = {
  email: string;
  href?: string;
  name: string;
  number: number;
  phone?: string;
  relation: string;
};

export function ReferenceItem(props: ReferenceItemProps) {
  const { email, href, name, number, phone, relation } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
  };
  return (
    <>
      <ExamplePageLink url={href}>{name}</ExamplePageLink>
      <Relation>{relation}</Relation>
      <Relation>{phone}</Relation>
      {email ? (

          <ExamplePageLink includeSpaces={false} url={`mailto:${email}`}>
        {email}
      </ExamplePageLink>
    ) : <div/>}
    </>
  );
}
