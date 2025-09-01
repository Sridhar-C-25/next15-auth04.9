import { NextResponse } from "next/server";

// GET
export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello" });
}
