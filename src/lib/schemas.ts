import { z } from "zod";

// Schema for validating user inputs for signing up and signing in
// Confirms phoneNumber, email, and password are of the required format

// Sign up schema
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password muct contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
});

// Type for the form state: useful for form submission action
export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        phoneNumber?: string[];
        password?: string[];
      };
      authErrors?: string;
      message?: string;
    }
  | undefined;

// Sign in schema
export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password muct contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
});

// Type for the form state: useful for form submission action
export type SigninFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      authErrors?: string;
      message?: string;
    }
  | undefined;
