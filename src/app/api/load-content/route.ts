// app/api/load-content/route.ts

import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export async function GET() {
  try {
    const content = await get("content");

    return NextResponse.json({
      content: content ?? null, // si no existe, retorna null
    });
  } catch (error) {
    console.error("Unexpected error while loading content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
