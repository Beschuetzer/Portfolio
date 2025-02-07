import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { colors } from "../styles/constants";

export const useColorScheme = () => {
  const location = useLocation();
  const [colorScheme, setColorScheme] = useState(
    (colors as any)?.[location.pathname] || colors.general
  );

  useEffect(() => {
    setColorScheme((colors as any)?.[location.pathname] || colors.general);
  }, [location.pathname]);

  return colorScheme;
};
