import { createContext, useContext } from "react";
import { THEME_CONFIG } from "../constants/AppConfig";

export const ThemeContext = createContext(THEME_CONFIG);

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  const toggleNavColapse = () => (theme.navCollapsed = !theme.navCollapsed);
  return { theme, toggleNavColapse };
};
