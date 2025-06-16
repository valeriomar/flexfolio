import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import CustomToaster from "@/components/ui/CustomToaster";
import type { ReactNode } from "react";
import { metadataConfig } from "./layout.config";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadataConfig.title}</title>
        <meta name="description" content={metadataConfig.description} />
        <meta name="keywords" content={metadataConfig.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-transition">
        <ThemeProvider>
          {children}
          <CustomToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
