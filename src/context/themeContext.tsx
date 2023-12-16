import { createContext, Dispatch, SetStateAction } from "react";

type ThemeContextValue = {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
