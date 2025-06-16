// app/api/initialize-content/route.ts

import { NextResponse } from "next/server";
import { DEFAULT_STRUCTURE } from "../../../../lib/default-structure";

export async function POST() {
  try {
    const res = await fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.EDGE_ID}/items`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              operation: "create", // ❗️solo se ejecutará si no existe
              key: "content",
              value: DEFAULT_STRUCTURE,
            },
          ],
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error("Edge config init failed:", data);
      return NextResponse.json({ error: "Failed to initialize content" }, { status: res.status });
    }

    return NextResponse.json({ success: true, initialized: true });
  } catch (error) {
    console.error("Unexpected error while initializing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
