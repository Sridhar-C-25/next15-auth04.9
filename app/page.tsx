import React from "react";
import { getAuth0Session } from "@/lib/auth0";

export default async function page() {
  const session = await getAuth0Session();
  console.log(session);
  return <div>{session?.user?.name}</div>;
}
