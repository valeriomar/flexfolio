import { Paintbrush } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";
import themes from "@/data/themes.json";

export function ThemeSelector() {
  const { themeKey, setTheme, allowFrontendThemeSwitch } = useTheme();

  if (!allowFrontendThemeSwitch) return null;

  return (
    <div
      
      className="max-sm:w-auto  max-sm:text-xs rounded-full border max-sm:px-1 max-sm:py-0"
      style={{
        zIndex: 3,
        border: "solid 1px", 
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "transparent",
        padding: "6px 12px",
        color: "var(--text)",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      <Paintbrush size={18} style={{ marginRight: 8 }} />

      <select
        value={themeKey}
        onChange={(e) => setTheme(e.target.value as keyof typeof themes)}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          background: "transparent",
          border: "none",
          outline: "none",
          color: "inherit",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {Object.entries(themes).map(([key, theme]) => (
          <option key={key} value={key} style={{ color: "#000" }}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  );
}
