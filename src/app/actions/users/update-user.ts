"use server";

import { cache } from "react";

import { verifyUserSession } from "@/lib/session";

export const updateUser = cache(
  async (
    userId: string,
    name: string,
    email: string,
    phoneNumber: string | undefined,
    role: string,
    permissions: string[],
    newPassword: string | undefined
  ) => {
    // Get auth token from user session
    const authToken = await verifyUserSession();

    // If no auth token, return and exit from function
    if (!authToken) return null;

    // Construct path url to API endpoint for updating users
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;

    // Use trycatch block to try to update user with given user id
    try {
      // Send a PATCH request to update a dashboard user
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          role,
          permissions,
          newPassword,
        }),
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
      return error;
    }
  }
);
