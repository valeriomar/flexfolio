"use client";

import { Toaster } from "sonner";
import useMedia from "use-media";

export default function CustomToaster() {
  const isMobile = useMedia("(max-width: 768px)");

  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast: `
            font-[Poppins] 
            px-6 py-3
            border 
            rounded-full 
            bg-white/30  
            backdrop-blur-md 
            shadow-md
            ${isMobile ? "centered-toast" : ""}
          `,
          title: "text-sm font-semibold",
          description: "text-sm",
        },
        style: {
          background: "rgba(255, 255, 255, 0.3)",
          color: "var(--text)",
          fontFamily: "Poppins",
          borderRadius: "9999px",
          border: "1px solid var(--text)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        },
        duration: 3500,
      }}
    />
  );
}
