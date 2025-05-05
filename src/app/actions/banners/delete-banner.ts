"use server";

import { cache } from "react";

import { verifyUserSession } from "@/lib/session";

export const deleteBanner = cache(async (bannerId: string) => {
  // Get auth token for user session
  const authToken = await verifyUserSession();

  // If no auth token return and exit function

  if (!authToken) return null;

  // Construct url to banner API

  const url = `${process.env.NEXT_PUBLIC_API_URL}/banners/${bannerId}`;

  // Use trycatch block to send a delete request to banners API
  try {
    // Send a DELETE request to delete the banner with the provided id
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
  } catch (error) {
    // Catch any other unexpected client side error and console error it
    console.error("Client Error: ", error);
  }
});
