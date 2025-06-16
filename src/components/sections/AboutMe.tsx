"use client";

import { useTheme } from "../ui/ThemeProvider";
import { getContent } from "@/lib/getContent";
import { useEffect, useMemo, useState } from "react";
import {
  SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects, SiAdobepremierepro, SiAdobeindesign,
  SiFigma, SiBlender, SiCinema4D, SiSketch, SiAdobexd, SiFramer,
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3, SiJavascript, SiTypescript,
  SiPython, SiGithub, SiGit, SiVite, SiWebpack, SiPostman, SiJirasoftware, SiSlack,
  SiNotion, SiBootstrap, SiSass, SiGimp, SiInkscape, SiAffinitydesigner,
  SiAffinityphoto, SiUnrealengine, SiUnity, SiNetlify, SiVercel, SiDocker,
  SiFirebase, SiMongodb, SiMysql, SiNodedotjs
} from "react-icons/si";
import {
  FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaYoutube,
  FaGithub as FaGithubIcon, FaTiktok, FaDribbble, FaBehance,
} from "react-icons/fa";
import themes from "@/data/themes.json";

export default function AboutMe() {
  const [content, setContent] = useState<any>(null);
  const { themeKey } = useTheme();
  const theme = themes[themeKey];

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  const isLong = useMemo(() => {
    if (!content?.aboutMe?.bio) return false;
    return content.aboutMe.bio.split(" ").length > 200;
  }, [content]);

  const [part1, part2] = useMemo(() => {
    if (!content?.aboutMe?.bio) return ["", ""];
    const bio = content.aboutMe.bio;
    const words = bio.split(" ");
    if (words.length <= 200) return [bio, ""];
    const mid = Math.floor(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  }, [content]);

  if (!content) return null;

  const { aboutMe } = content;
  const { name, surname, bio, photo, socials, tools = {}, languages } = aboutMe;

  const toolIcons: { [key: string]: any } = {
    Photoshop: <SiAdobephotoshop />, Illustrator: <SiAdobeillustrator />, AfterEffects: <SiAdobeaftereffects />, PremierePro: <SiAdobepremierepro />, Indesign: <SiAdobeindesign />,
    Figma: <SiFigma />, Blender: <SiBlender />, Cinema4D: <SiCinema4D />, Sketch: <SiSketch />, XD: <SiAdobexd />, Framer: <SiFramer />,
    React: <SiReact />, NextJS: <SiNextdotjs />, Tailwind: <SiTailwindcss />, HTML: <SiHtml5 />, CSS: <SiCss3 />,
    JavaScript: <SiJavascript />, TypeScript: <SiTypescript />, Python: <SiPython />,
    GitHub: <SiGithub />, Git: <SiGit />, Vite: <SiVite />, Webpack: <SiWebpack />, Postman: <SiPostman />,
    Jira: <SiJirasoftware />, Slack: <SiSlack />, Notion: <SiNotion />, Bootstrap: <SiBootstrap />, Sass: <SiSass />,
    GIMP: <SiGimp />, Inkscape: <SiInkscape />, AffinityDesigner: <SiAffinitydesigner />, AffinityPhoto: <SiAffinityphoto />,
    Unreal: <SiUnrealengine />, Unity: <SiUnity />, Netlify: <SiNetlify />, Vercel: <SiVercel />, Docker: <SiDocker />,
    Firebase: <SiFirebase />, MongoDB: <SiMongodb />, MySQL: <SiMysql />, NodeJS: <SiNodedotjs />
  };

  const iconMap = {
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    facebook: FaFacebook,
    youtube: FaYoutube,
    github: FaGithubIcon,
    tiktok: FaTiktok,
    dribbble: FaDribbble,
    behance: FaBehance,
  };

  return (
    <section
      id="about"
      className="w-screen flex flex-col text-center px-4 sm:px-8 min-h-screen"
      style={{ backgroundColor: "transparent", color: "var(--text)", alignItems: "flex-start", minHeight: "500px" }}
    >
      <h3 className="section-titles" style={{ paddingInline: 20, marginTop: 100, fontFamily: "Poppins", fontWeight: 800 }}>
        About Me
      </h3>

      <div style={{ paddingInline: 20, alignItems: "flex-start" }} className="mt-12 flex flex-col gap-4">
        <h2 style={{ fontWeight: "600", fontSize: "1.8em" }} className="text-4xl font-bold font-[Poppins]">
          {name} {surname}
        </h2>

        <div className="flex gap-4 mt-4">
          {Object.entries(iconMap).map(([key, Icon]) =>
            socials[key] ? (
              <a key={key} href={socials[key]} target="_blank" rel="noopener noreferrer">
                <Icon className="h-5 w-5 hover:text-[var(--primary)] transition" />
              </a>
            ) : null
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full px-8 mt-12 gap-6">
          {/* Text Columns */}
          <div className="flex flex-col md:flex-row gap-6 basis-3/4">
            <p style={{ textAlign: "justify" }} className="text-[color:var(--subtext)] font-[Poppins] text-base leading-relaxed md:w-1/2">
              <img src={photo} alt={`${name} ${surname}`} className="shape-image" />
              {part1}
            </p>
            {part2 && (
              <p style={{ textAlign: "justify" }} className="text-[color:var(--subtext)] font-[Poppins] text-base leading-relaxed md:w-1/2">
                {part2}
              </p>
            )}
          </div>

          {/* Tools Column */}
          <div style={{ textAlign: "left", fontFamily: "Poppins", fontWeight: "600", fontSize: "1.4em" }} className="basis-1/4">
            <h3 style={{ marginBottom: 40, fontStyle: "italic" }} className="text-xl font-semibold mb-1">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-5 text-3xl">
              {Object.entries(tools).map(([tool, enabled]) =>
                enabled ? <div key={tool} title={tool}>{toolIcons[tool]}</div> : null
              )}
            </div>

            {languages && (
              <div style={{ marginTop: "30px" }} className="mt-12">
                <h3 className="text-xl font-semibold italic mb-10">Languages</h3>
                <div className="space-y-3">
                  {Object.entries(languages).map(([lang, level]: any) => (
                    <div key={lang}>
                      <span className="font-medium">{lang}</span>
                      <div className="flex gap-2 mt-1 text-xs">
                        <span className="bg-muted px-2 py-1 rounded-md font-light">
                          Spoken: <span className="font-bold">{level.spoken}</span>
                        </span>
                        <span className="bg-muted px-2 py-1 rounded-md font-light">
                          Written: <span className="font-bold">{level.written}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
