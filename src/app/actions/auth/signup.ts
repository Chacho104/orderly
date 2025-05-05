// Server action for signing in

"use server";

import { redirect } from "next/navigation";

import { createUserSession } from "@/lib/session";
import { SignupFormSchema, SignupFormState } from "@/lib/schemas";

export async function signup(state: SignupFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  // Helps avoid unnecessary calls to authentication provider's API
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // Call the provider or db to create a user...
  const { name, email, password } = validatedFields.data;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/signup`;

  let redirectPath: string | null = null;

  try {
    // Send POST request
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    // Return from function if response is not okay and show error message to client
    if (!response.ok) {
      const errorMessage = await response.json();
      return { authError: `${errorMessage.message}` };
    }

    // Parse and handle success response
    const { token } = await response.json();

    // Create a user session that utilizes the token sent back from the server
    await createUserSession(token);

    redirectPath = `/dashboard`;
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
    redirectPath = "/signup";
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}
