"use server";

import { cache } from "react";
import { redirect } from "next/navigation";
import { verifyUserSession } from "@/lib/session";

// Now we can try get a user from our API using the retrieved token from verifyUserSession

export const getCurrentUser = cache(async () => {
  const authToken = await verifyUserSession();

  if (!authToken) return null;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/user`;

  let redirectPath: string | null = null;

  try {
    // Send GET request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      redirectPath = "/signin";
      return null;
    }
    const user = await response.json();

    return user.user;
  } catch (error: any) {
    console.error("Error:", error);
    return null;
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
});
