import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public/agents.md");
  try {
    const content = await fs.readFile(filePath, "utf8");
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (e) {
    return new NextResponse("Not Found", { status: 404 });
  }
}
