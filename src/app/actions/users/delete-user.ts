"use server";

import { cache } from "react";

import { verifyUserSession } from "@/lib/session";

export const deleteUser = cache(async (userId: string) => {
  // Get auth token from user session
  const authToken = await verifyUserSession();

  // If no auth token, return and exit from function
  if (!authToken) return null;

  // Construct url path to API endpoint for deleting users
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;

  // Use trycatch block to try to delete user with provided userId
  try {
    // Send a DELETE request to delete dashboard user with userId
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      // Await error response from server and extract message to show to client
      const errorData = await response.json();
      return errorData.message;
    }

    // Await success response from server and extract message to show to client
    const successData = await response.json();

    return successData.message;
  } catch (error: any) {
    // Catch any other error and console error it
    console.error("Error:", error);
    return null;
  }
});
