import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { colors, ColorScheme } from "../styles/constants";

export const useColorScheme = () => {
  const location = useLocation();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    colors?.[location.pathname] || colors.general
  );

  useEffect(() => {
    setColorScheme(colors?.[location.pathname] || colors.general);
  }, [location.pathname]);

  return colorScheme;
};
