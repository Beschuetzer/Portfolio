import React from 'react'
import { useColorScheme } from '../../hooks/useColorScheme';

type ExamplePageTitledListProps = {
    items: string[];
    title: string;
}

export function ExamplePageTitledList(props: ExamplePageTitledListProps) {
    const colorScheme = useColorScheme();
    const propsToAdd = {
        colorscheme: colorScheme,
    }
  return (
    <div>ExamplePageTitledList</div>
  )
}