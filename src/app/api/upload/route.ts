import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const blob = await put(file.name, file.stream(), {
    access: "public",
    addRandomSuffix: true, // 👈 esta línea soluciona el problema
  });

  return NextResponse.json(blob);
}
