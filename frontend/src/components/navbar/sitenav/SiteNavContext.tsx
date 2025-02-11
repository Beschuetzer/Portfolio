import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { SiteNavProps } from "./SiteNav";

type SiteNavContextProps = {
  buttonRadius: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
} & SiteNavProps;

const SiteNavContext = createContext<SiteNavContextProps | undefined>(
  undefined
);

type SiteNavProviderProps = {
  buttonRadius: string;
  children: ReactNode;
} & SiteNavProps;

export const SiteNavProvider: React.FC<SiteNavProviderProps> = ({
  buttonRadius,
  children,
  items,
  scrollBarWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpenLocal = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <SiteNavContext.Provider
      value={{
        scrollBarWidth,
        items,
        buttonRadius,
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
