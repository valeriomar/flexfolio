"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSpring, animated } from "@react-spring/web";
import themes from "@/data/themes.json";
import { getContent } from "@/lib/getContent";

// Types
export type ThemeKey = keyof typeof themes;
interface ThemeContextType {
  themeKey: ThemeKey;
  setTheme: (key: ThemeKey) => void;
  allowFrontendThemeSwitch: boolean;
}

// Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<any>(null); // ✅ AQUÍ ahora está correcto

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  // Evitar errores mientras no se carga el content
  const themeSettings = content?.themeSettings || {};
  const defaultTheme: ThemeKey = themeSettings.defaultTheme || "arcticSun";
  const allowFrontendThemeSwitch: boolean =
    themeSettings.allowFrontendThemeSwitch ?? true;

  const [themeKey, setThemeKey] = useState<ThemeKey>(defaultTheme);
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>(defaultTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [{ opacity }, api] = useSpring(() => ({ opacity: 1 }));

  useEffect(() => {
    if (!allowFrontendThemeSwitch) return;
    const stored =
      typeof window !== "undefined"
        ? (sessionStorage.getItem("themeKey") as ThemeKey | null)
        : null;

    if (stored && themes[stored]) {
      setThemeKey(stored);
      setCurrentThemeKey(stored);
    }
  }, []);

  const applyTheme = (key: ThemeKey) => {
    const theme = themes[key];
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--subtext", theme.subtext ?? theme.text);
  };

  useEffect(() => {
    applyTheme(themeKey);
  }, [themeKey]);

  useEffect(() => {
    if (!themeKey || !currentThemeKey || themeKey === currentThemeKey) return;

    setIsTransitioning(true);
    applyTheme(themeKey);
    api.start({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1000 } });

    const timeout = setTimeout(() => {
      setCurrentThemeKey(themeKey);
      setIsTransitioning(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [themeKey]);

  const value: ThemeContextType = {
    themeKey,
    setTheme: (key: ThemeKey) => {
      if (!allowFrontendThemeSwitch) return;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("themeKey", key);
      }
      setThemeKey(key);
    },
    allowFrontendThemeSwitch,
  };

  const currentTheme = themes[currentThemeKey];
  const nextTheme = themes[themeKey];

  return (
    <ThemeContext.Provider value={value}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* Current theme background */}
        <animated.div
          style={{
            opacity: isTransitioning ? opacity.to((o) => 1 - o) : 1,
            backgroundImage: currentTheme.gradient,
            backgroundColor: currentTheme.background,
            color: currentTheme.text,
            position: "absolute",
            inset: 0,
            zIndex: 0,
            transition: "color 1s ease",
          }}
        />

        {/* Transition layer */}
        {isTransitioning && (
          <animated.div
            style={{
              opacity,
              backgroundImage: nextTheme.gradient,
              backgroundColor: nextTheme.background,
              color: nextTheme.text,
              position: "absolute",
              inset: 0,
              zIndex: 1,
              transition: "color 1s ease",
            }}
          />
        )}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
