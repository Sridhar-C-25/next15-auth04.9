import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { headers } from "next/headers";

export function getAuth0Client(origin: string) {
  return new Auth0Client({
    appBaseUrl: origin,
    logoutStrategy: "v2",
    session: {
      inactivityDuration: 30,
    },
  });
}

export function getAuth0Session(req?: Request) {
  try {
    const reqLike = { headers: headers() } as unknown as Request;
    const proto = reqLike.headers.get("x-forwarded-proto") || "http";
    const host =
      reqLike.headers.get("x-forwarded-host") || reqLike.headers.get("host");
    const origin = `${proto}://${host}`;
    if (!req) {
      return getAuth0Client(origin).getSession();
    }
    const auth0 = getAuth0Client(origin);
    return auth0.getSession({ headers: req.headers } as any);
  } catch (error) {
    return null;
  }
}
