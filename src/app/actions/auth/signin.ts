// Server action for signing in

"use server";

import { redirect } from "next/navigation";

import { createUserSession } from "@/lib/session";
import { SigninFormSchema, SigninFormState } from "@/lib/schemas";

export async function signin(state: SigninFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
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
  // Call the provider or db to sign in a user...
  // First extract email and password from vaildated data
  const { email, password } = validatedFields.data;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/signin`;

  let redirectPath: string | null = null;

  try {
    // Send POST request
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Return from function if response is not okay and show error message to client
    if (!response.ok) {
      const errorMessage = await response.json();
      return { authError: `${errorMessage.message}` };
    }

    // Parse and handle success response
    const { token } = await response.json();

    await createUserSession(token);

    redirectPath = `/dashboard`;
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
    redirectPath = "/signin";
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}
