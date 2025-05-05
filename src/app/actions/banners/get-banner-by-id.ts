"use server";

import { cache } from "react";

// Get banner details for a specific banner
// Auth token not needed as this is a pulic endpoint
export const getBannerById = cache(async (bannerId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/banners/${bannerId}`;

  try {
    // Send a GET request to get banner with passed in bannerId
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      // Await error response from server and extract message to show to client
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return null;
    }

    // Await success response from server and extract banner fetched
    const successData = await response.json();

    return successData.banner;
  } catch (error: any) {
    // Catch any other unexpected client side error and console error it
    console.error("Error:", error);
    return null;
  }
});
