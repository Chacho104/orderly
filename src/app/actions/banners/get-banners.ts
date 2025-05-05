"use server";

import { cache } from "react";

// Get all banners in the store
// Auth token not needed as this is a pulic endpoint
export const getBanners = cache(async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/banners`;

  try {
    // Send a GET request to get banners
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      // Await error response from server and extract message to show to client
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return null;
    }

    // Await success data from server and extract banners to return to client
    const successData = await response.json();

    return successData.banners;
  } catch (error: any) {
    // Catch any other unexpected client side error and console error it
    console.error("Error:", error);
    return null;
  }
});
