import React, { createContext, useContext, useState, ReactNode } from "react";
import { fontSizeEleven } from "../../../styles/constants";

interface SiteNavContextProps {
  buttonRadius: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const SiteNavContext = createContext<SiteNavContextProps | undefined>(
  undefined
);

export const SiteNavProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpenLocal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SiteNavContext.Provider
      value={{
        buttonRadius: fontSizeEleven,
        isOpen,
        toggleIsOpen: toggleIsOpenLocal,
      }}
    >
      {children}
    </SiteNavContext.Provider>
  );
};

export const useSiteNav = (): SiteNavContextProps => {
  const context = useContext(SiteNavContext);
  if (!context) {
    throw new Error("useSiteNav must be used within a SiteNavProvider");
  }
  return context;
};
