// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getAuth0Client } from "./lib/auth0";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const origin = `${proto}://${host}`;
  const auth0 = getAuth0Client(origin);
  // 1️⃣  Public whitelist
  if (pathname === "/api/demo") return;

  // 2️⃣  Protected API routes
  if (pathname.startsWith("/api")) {
    const session = await auth0.getSession(req);
    console.log(session, "session");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next(); // let handler run
  }
  // 3️⃣  Pages – normal SDK flow
  return await auth0.middleware(req).catch((error) => {
    console.log("error", error?.code);
    if (error?.code === "ERR_JWE_INVALID") {
      // delete session
      const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      res.cookies.delete("__session");
      return res;
    }
    return NextResponse.next();
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/api",
  ],
};
