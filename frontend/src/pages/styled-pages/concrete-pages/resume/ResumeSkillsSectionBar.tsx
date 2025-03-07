import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { ExamplePageBar, ExamplePageBarProps } from "../../ExamplePageBar";

const Container = styled.div<LayoutStyledProps>`
  width: 100%;
  transition: transform 0.5s ease-in-out;
  transform-origin: left;

  ${(props) =>
    props.isvisible === "true"
      ? "transform: translate3d(0,0,0) scaleX(1);"
      : `
    
    transform: translate3d(0,0,0) scaleX(0);`}
`;

type ResumeSkillsSectionBarProps = {
  examplePageBarProps: ExamplePageBarProps;
};

export function ResumeSkillsSectionBar(props: ResumeSkillsSectionBarProps) {
  const { examplePageBarProps } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContainerVisible, setIsContainerVisible] = useState(false);

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
    <Container ref={containerRef} isvisible={String(isContainerVisible)}>
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
