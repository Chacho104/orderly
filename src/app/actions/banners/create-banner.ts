"use server";

import { cache } from "react";

import { verifyUserSession } from "@/lib/session";

export const createBanner = cache(
  async (
    name: string,
    type: string,
    imageUrl: string | undefined,
    directLink: string
  ) => {
    // Get auth token from user session
    const authToken = await verifyUserSession();

    // If no auth token, return and exit function
    if (!authToken) return null;

    // Construct url to API endpoint for creating banners
    const url = `${process.env.NEXT_PUBLIC_API_URL}/banners`;

    // Use trycatch block to send a create request to API
    try {
      // Send a POST request to create a banner for the store
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name,
          type,
          imageUrl,
          directLink,
        }),
      });

      if (!response.ok) {
        // Await error response from the server and extract error message to show to client
        const errorData = await response.json();
        return errorData.message;
      }

      // Await success response from the server and extract success message to show to client
      const successData = await response.json();

      return successData.message;
    } catch (error: any) {
      // Catch any other unexpected client side error and console error it
      console.error("Client Error:", error);
      return null;
    }
  }
);
