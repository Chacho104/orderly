"use server";

import { cache } from "react";

import { verifyUserSession } from "@/lib/session";

export const createUser = cache(
  async (
    name: string,
    email: string,
    phoneNumber: string | undefined,
    role: string,
    permissions: string[],
    password: string | undefined
  ) => {
    // Get auth token from user session
    const authToken = await verifyUserSession();

    // If no auth token, return and exit from function
    if (!authToken) return null;

    // Construct url path to API endpoint for creating users

    const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

    // Use trycatch block to try to create a dashboard user
    try {
      // Send a POST request to create a dashboard user
      const response = await fetch(url, {
        method: "POST",
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
          password,
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
      return null;
    }
  }
);
