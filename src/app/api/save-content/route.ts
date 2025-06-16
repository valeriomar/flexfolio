// app/api/save-content/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password, content } = await req.json();

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
            operation: "upsert", 
            key: "content",
            value: content,
          },
        ],
      }),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    console.error("Edge config update failed:", result);
    return NextResponse.json({ error: "Failed to update Edge Config" }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
