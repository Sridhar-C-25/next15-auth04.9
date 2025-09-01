"use client";
import { useUser } from "@auth0/nextjs-auth0";
export default function Nav() {
  const { user } = useUser();

  if (!user) {
    return (
      <div>
        <a
          href="/auth/login"
          className="text-blue-500 hover:underline inline-block mt-2 ml-2 "
        >
          Login
        </a>
      </div>
    );
  }
  return (
    <div>
      {user?.name}
      <a
        href="/auth/logout"
        className="text-blue-500 hover:underline inline-block mt-2 ml-2 "
      >
        Logout
      </a>
    </div>
  );
}
