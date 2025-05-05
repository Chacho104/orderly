"use server";

import { cache } from "react";

import { verifyUserSession } from "@/lib/session";

// Get user details for a specific user
export const getUserById = cache(async (userId: string) => {
  // Get auth token from user session
  const authToken = await verifyUserSession();

  // If no auth token, return and exit from function
  if (!authToken) return null;

  // Construct url path to API endpoint for getting users by id
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;

  // Use trycatch block to try to get user with given id
  try {
    // Send a GET request to get a dashboard user with userId
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

    // Await success response frp, server and extract user data
    const successData = await response.json();

    return successData.user;
  } catch (error: any) {
    console.error("Error:", error);
    return null;
  }
});
