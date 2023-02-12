import React, { ReactNode } from "react";
import { NAVBAR_CLASSNAME } from "./utils";

export enum NavListItemExpandedDirections {
  horizontal, 
  vertical,
} 
type NavListItemExpandedProps = {
  children: ReactNode;
  direction?: NavListItemExpandedDirections;
}

export const NavListItemExpanded: React.FC<NavListItemExpandedProps> = ({
  children,
  direction = NavListItemExpandedDirections.vertical,
}) => {

  return (
    <ul className={`${NAVBAR_CLASSNAME}__${direction === NavListItemExpandedDirections.vertical ? 'dropdown' : 'dropout'}`}>
        {children}
    </ul>
  );
}