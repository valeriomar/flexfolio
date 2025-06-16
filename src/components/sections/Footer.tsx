"use client";

import { getContent } from "@/lib/getContent";
import { useEffect, useState } from "react";

export default function Footer() {
  const [content, setContent] = useState<any>();

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  if (!content) return null;

  const { authorName } = content.site;

  return (
    <footer
      className="w-full border-t flex justify-center items-center gap-4"
      style={{
        height: 100,
        padding: "1.5rem 2rem",
        fontFamily: "Poppins",
        color: "var(--text)",
      }}
    >
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
        <span>© {new Date().getFullYear()} {authorName}</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
