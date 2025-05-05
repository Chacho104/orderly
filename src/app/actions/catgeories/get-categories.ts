"use server";

import { cache } from "react";

// Server action to get all categories for the store
// Auth token not needed as this targets a public endpoint

export const getCategories = cache(async () => {
  // Construct the url to endpoint
  const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

  // Use trycatch to attempt fetching categories
  try {
    // Send GET request to fetch categories
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      // Await error response from server and extract message to show to client
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return null;
    }

    // Await success response from server and extract banners to return to client
    const successData = await response.json();

    return successData.categories;
  } catch (error) {
    // Catch any other unexpected client side error and console error it
    console.error("Error:", error);
    return null;
  }
});
