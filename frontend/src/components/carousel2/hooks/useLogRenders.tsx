import { useEffect } from "react";

export type UseLogRendersInput = {
    componentName: string;
}

export const useLogRenders = (input: UseLogRendersInput) => {
    const { componentName } = input;
    useEffect(() => {
      console.log(`Rerendered: ${componentName}`);
    })
}