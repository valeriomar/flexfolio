"use client";

import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import AboutMe from "@/components/sections/AboutMe";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Navbar from "@/components/ui/Navbar";
import { useTheme } from "@/components/ui/ThemeProvider";
import themes from "@/data/themes.json";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  const { themeKey } = useTheme();
  const theme = themes[themeKey];
  const [previousKey, setPreviousKey] = useState(themeKey);
  const previousTheme = themes[previousKey];

  const [fadeStyles, api] = useSpring(() => ({
    background: theme.gradient,
    color: theme.text,
    opacity: 1,
    config: { duration: 1000 },
  }));

  useEffect(() => {
    if (themeKey !== previousKey) {
      api.start({
        from: { opacity: 0 },
        to: { opacity: 1 },
        onRest: () => {
          setPreviousKey(themeKey); // actualizar una vez se completó
        },
      });
    }
  }, [themeKey]);


  return (
    <div className="w-full min-h-screen relative">
      {/* Fondo anterior */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: previousTheme.gradient,
          color: theme.text,
        }}
      />

      {/* Fondo nuevo animado encima */}
      <animated.div
        className="absolute inset-0 z-0"
        style={{
          ...fadeStyles,
          background: theme.gradient,
          color: theme.text
        }}
      />

      {/* Contenido */}
      <main className="relative z-10 w-full">
        <Navbar />
        <Hero />
        <AboutMe />
        <Projects />
        <ContactForm />
        <Footer/>
      </main>
    </div>
  );
}
