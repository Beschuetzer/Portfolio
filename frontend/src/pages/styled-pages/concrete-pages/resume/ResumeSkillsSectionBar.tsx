import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { ExamplePageBar, ExamplePageBarProps } from "../../ExamplePageBar";
import { useColorScheme } from "../../../../hooks/useColorScheme";

const Container = styled.div<LayoutStyledProps>`
  position: relative;
  width: 100%;
  transition: transform 0.5s ease-in-out;
  transform-origin: left;
  z-index: -1;

  ${(props) =>
    props.isvisible === "true"
      ? "transform: scaleX(1);"
      : "transform: scaleX(0);"}
`;

type ResumeSkillsSectionBarProps = {
  examplePageBarProps: ExamplePageBarProps;
};

export function ResumeSkillsSectionBar(props: ResumeSkillsSectionBarProps) {
  const { examplePageBarProps } = props;
  const colorScheme = useColorScheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
    isvisible: String(isContainerVisible),
  };

  useEffect(() => {
    const elementRefCopy = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsContainerVisible(true);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is in view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (elementRefCopy) {
        observer.unobserve(elementRefCopy);
      }
    };
  }, []);

  return (
    <Container ref={containerRef} {...propsToAdd}>
      <ExamplePageBar
        {...examplePageBarProps}
        hideLabels
        containerProps={{
          ...examplePageBarProps.containerProps,
          style: {
            ...examplePageBarProps.containerProps?.style,
            marginBottom: 0,
          },
        }}
      />
    </Container>
  );
}
