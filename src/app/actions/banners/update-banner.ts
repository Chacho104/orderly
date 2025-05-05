"use server";

import { cache } from "react";

import { verifyUserSession } from "@/lib/session";

export const updateBanner = cache(
  async (
    bannerId: string,
    name: string,
    type: string,
    imageUrl: string,
    directLink: string
  ) => {
    // Get auth token from user session
    const authToken = await verifyUserSession();

    // If no auth token, return null and exit function
    if (!authToken) return null;

    // Construct API url
    const url = `${process.env.NEXT_PUBLIC_API_URL}/banners/${bannerId}`;

    // Use trycatch block to send an update request to API
    try {
      // Send a PATCH request to banners API to update a banner
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ name, type, imageUrl, directLink }),
      });

      if (!response.ok) {
        // Await error response from the server and extract error message to show to client
        const errorData = await response.json();
        return errorData.message;
      }

      // Await success response from the server and extract success message to show to client
      const successData = await response.json();

      return successData.message;
    } catch (error) {
      // Catch any other unexpected client side error and console error it
      console.error("Client Error: ", error);
    }
  }
);
