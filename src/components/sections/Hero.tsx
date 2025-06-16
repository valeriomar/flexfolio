"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../ui/ThemeProvider";
import { getContent } from "@/lib/getContent";
import themes from "@/data/themes.json";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

export default function Hero() {
  const { themeKey } = useTheme();
  const theme = themes[themeKey];
  const textColor = theme.text || "#fff";

  const [content, setContent] = useState<any>(null);
  const [wmStyle, setWmStyle] = useState({ fontSize: "22vw", letterSpacing: "-0.02em" });

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  useEffect(() => {
    if (!content?.hero?.name) return;

    const firstName = content.hero.name.split(" ")[0];
    const letters = firstName.length;
    const vw = window.innerWidth;
    const coeff = 0.5;
    const rawPx = vw / (letters * coeff);
    const maxPx = vw * 0.24;
    const minPx = vw * 0.12;
    const fontPx = Math.max(Math.min(rawPx, maxPx), minPx);

    let tracking = "-0.06em";
    if (letters <= 4) tracking = `${(4 - letters) * 0.15}em`;

    setWmStyle({ fontSize: `${fontPx}px`, letterSpacing: tracking });

    const updateSize = () => {
      const vw = window.innerWidth;
      const rawPx = vw / (letters * coeff);
      const fontPx = Math.max(Math.min(rawPx, maxPx), minPx);
      setWmStyle({ fontSize: `${fontPx}px`, letterSpacing: tracking });
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [content]);

  if (!content) return null;

  const name = content.hero.name;
  const title = content.hero.title;

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden font-[Poppins] max-sm:h-dvh">
      <div className="landscape-mobile relative h-[90dvh] max-sm:top-[13%] flex z-20 items-center justify-between gap-12 px-8 lg:px-24 left-6 max-sm:left-2 ">
        <div className="whitespace-pre-line flex-shrink-0 lg:max-w-lg">
          <div
            style={{
              padding: "10px",
              paddingInline: 20,
              color: textColor,
              border: "1px solid",
              borderColor: textColor,
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm"
          >
            Available for Work
          </div>
          <h1
            style={{
              marginTop: "15px",
              paddingRight: 20,
              maxWidth: "100vw",
              fontSize: "29px",
              color: textColor,
            }}
            className="font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <Button
            style={{ marginTop: 15, color: textColor, fontStyle: "italic" }}
            variant="primary"
            size="lg"
            className="gap-2 self-start"
          >
            See my works <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="hero-name-animated-wrapper inset-0 flex items-end justify-center pointer-events-none select-none">
          <div
            className="hero-name-animated animate-marquee whitespace-nowrap uppercase text-center"
            style={{
              fontSize: wmStyle.fontSize,
              fontStyle: "italic",
              letterSpacing: wmStyle.letterSpacing,
              fontWeight: 900,
              color: textColor,
              lineHeight: 1.7,
            }}
          >
            <span style={{ paddingInline: 25 }} className="mr-12 ml-12">
              {name} &nbsp; {name} &nbsp; {name} &nbsp; {name} &nbsp; {name} &nbsp;
              {name} &nbsp; {name} &nbsp;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
