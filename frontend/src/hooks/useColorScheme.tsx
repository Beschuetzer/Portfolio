import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { COLORS, ColorScheme } from "../styles/constants";

export const useColorScheme = () => {
  const location = useLocation();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    COLORS?.[location.pathname] || COLORS.general
  );

  useEffect(() => {
    setColorScheme(COLORS?.[location.pathname] || COLORS.general);
  }, [location.pathname]);

  return colorScheme;
};
