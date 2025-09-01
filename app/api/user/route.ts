// import { withAuth } from "@/lib/auth0";

// export const GET = withAuth(async (session, req) => {
//   return new Response(JSON.stringify({ user: session.user }), { status: 200 });
// });

export const GET = async (req: Request) => {
  return new Response(JSON.stringify({}), { status: 200 });
};
