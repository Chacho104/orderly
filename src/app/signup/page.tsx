// The sign up page

"use client";

import Link from "next/link";

import { useActionState, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import Container from "@/components/ui/container";
import AuthHeadline from "@/components/ui/auth-headline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signup } from "../actions/auth/signup";

const Signup = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  const [showPassword, setShowPassword] = useState(false);

  // To ensure form data persists in case of unsuccessful form submission
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="w-full h-screen flex items-center justify-center">
      <form
        action={action}
        className="w-full max-w-96 space-y-4 shadow-xl p-6 pb-12 rounded-md dark:border-[1px]"
      >
        <AuthHeadline
          title="Orderly E-commerce"
          message="Sign up to continue"
        />
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            required
            className="p-2 rounded-md focus:outline-none border-[1px] focus:border-black transition-all duration-300"
          />
        </div>
        {state?.errors?.name && (
          <p className="text-red text-xs">{state.errors.name}</p>
        )}
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            autoComplete="email"
            required
            className="p-2 rounded-md focus:outline-none border-[1px] focus:border-black transition-all duration-300"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-red text-xs">{state.errors.email}</p>
        )}
        <div className="flex flex-col gap-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
            className="p-2 rounded-md focus:outline-none border-[1px] focus:border-black transition-all duration-300"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "72%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            disabled={pending}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
        {state?.errors?.password && (
          <div className="text-red text-xs">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <Button
          disabled={pending}
          type="submit"
          variant="outline"
          className="border-1 bg-brand-orange py-2 px-4 rounded-md cursor-pointer"
        >
          {pending ? "Signing Up..." : "Sign Up"}
        </Button>
        {state?.authError && (
          <p className="text-red-500 text-sm">{state.authError}</p>
        )}
        <div className="flex items-center gap-x-1 text-sm text-neutral-500">
          <p>Already have an account?</p>
          <Link
            href={"/signin"}
            className="hover:text-black hover:underline hover:underline-offset-2 transition-all duration-300"
          >
            Sign in here
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Signup;
