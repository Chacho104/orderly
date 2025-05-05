"use server";

import { cache } from "react";

import { verifyUserSession } from "@/lib/session";

export const getUsers = cache(async () => {
  // Get auth token from user session
  const authToken = await verifyUserSession();

  // If no auth token, return and exit from function
  if (!authToken) return null;

  // Construct path url to API endpoint for getting users
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

  // Use trycatch block to try to get users
  try {
    // Send a GET request to get dashboard users
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      // Await error response from server and extract message to show to client
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return null;
    }

    // Await success response from server and extract message to show to client
    const successData = await response.json();

    return successData.users;
  } catch (error: any) {
    console.error("Error:", error);
    return null;
  }
});
