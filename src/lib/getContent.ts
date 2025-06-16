export async function getContent(): Promise<any> {
  // Durante build (no hay window y tampoco hay VERCEL_URL en tiempo de render)
  const isBuildTime = typeof window === "undefined" && !process.env.VERCEL_URL && process.env.NODE_ENV === "production";

  if (isBuildTime) {
    console.warn("getContent() called during build — skipping.");
    return null; // o estructura vacía
  }

  let baseUrl: string;

  if (typeof window !== "undefined") {
    baseUrl = window.location.origin;
  } else {
    baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  }

  const res = await fetch(`${baseUrl}/api/load-content`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch content");

  const json = await res.json();
  return json.content;
}
