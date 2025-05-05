"use server";

import { cache } from "react";

// Server action get a category by id
// No auth check as this targets a public endpoint

export const getCategoryById = cache(async (categoryId: string) => {
  // Construct path to endpoint
  const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`;

  // Use trycatch block to attempt fetching category by given id
  try {
    // Send a GET request to fetch category with provided id
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      // Await error response from server and extract message to show to client
      const errorData = await response.json();
      console.error("Error"), errorData.message;
      return null;
    }

    // Await success response from server and extract category to return to client
    const successData = await response.json();

    return successData.category;
  } catch (error) {
    // Catch any other error and console error it
    console.error("Error:", error);
    return null;
  }
});
