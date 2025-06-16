"use client";

import { getContent } from "@/lib/getContent";
import { useTheme } from "../ui/ThemeProvider";
import clsx from "clsx";
import useMedia from "use-media";
import { useEffect, useState } from "react";

export default function Projects() {
  const [content, setContent] = useState<any>();
  const isMobile = useMedia("(max-width: 768px)");
  const { themeKey } = useTheme();

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  // ⛔ Espera a que se cargue el contenido
  if (!content) return null;

  const { projects } = content;

  const projectGroups: any[] = [];
  let currentGroup: any[] = [];

  projects.items.forEach((project: any, index: number) => {
    currentGroup.push(project);
    if (currentGroup.length === 3 || index === projects.items.length - 1) {
      projectGroups.push(currentGroup);
      currentGroup = [];
    }
  });

  return (
    <section
      id="work"
      className="w-screen flex flex-col"
      style={{ background: "transparent", color: "var(--text)" }}
    >
      <h3
        className="section-titles"
        style={{
          paddingInline: 20,
          marginTop: 100,
          fontFamily: "Poppins",
          fontWeight: 800,
        }}
      >
        Portfolio
      </h3>
      {projectGroups.map((group, groupIdx) => (
        <div
          key={groupIdx}
          style={{ paddingInline: 20, paddingBottom: 20 }}
          className="w-full flex flex-col lg:flex-row gap-4 px-6 lg:px-24 py-8"
        >
          {group.map((project: any, idx: number) => {
            const isFirst = idx === 0;
            const isLast = idx === group.length - 1;
            const isSingle = group.length === 1;

            const rounded = isSingle || isMobile
              ? "rounded-3xl"
              : isFirst
              ? "rounded-tl-3xl rounded-bl-3xl"
              : isLast
              ? "rounded-tr-3xl rounded-br-3xl"
              : "";

            return (
              <a
                key={idx}
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "relative flex flex-col flex-1 overflow-hidden border border-white/1 backdrop-blur-xl",
                  "bg-white/35 ",
                  "p-6 sm:p-10 min-h-[300px] justify-between",
                  "shadow-sm hover:shadow-lg transition-shadow duration-800",
                  rounded
                )}
              >
                <div style={{ fontFamily: "Poppins" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <h3
                      style={{ padding: 15, fontWeight: "900" }}
                      className="text-lg font-semibold mb-2"
                    >
                      {project.title}
                    </h3>

                    {/* Múltiples categorías */}
                    {project.categories && Array.isArray(project.categories) && (
                      <div className="flex flex-wrap gap-2 px-4 pb-2 font-[Poppins]">
                        {project.categories.map((category: string, i: number) => (
                          <span
                            key={i}
                            style={{
                              border: "1px solid",
                              borderColor: "var(--text)",
                              padding: "2px",
                              maxHeight: "28px",
                              paddingInline: 6,
                            }}
                            className="text-xs uppercase tracking-wide bg-transparent px-3 py-1 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {project.description && (
                    <p style={{ padding: 15 }} className="text-sm text-[color:var(--subtext)]">
                      {project.description}
                    </p>
                  )}
                </div>

                {/* Imagen */}
                {project.image && (
                  <div className="mt-4" style={{ padding: 15 }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full object-cover rounded-md max-h-48"
                    />
                  </div>
                )}
              </a>
            );
          })}
        </div>
      ))}
    </section>
  );
}
