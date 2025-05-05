// Reusable component to render an introduction to the app in the auth forms
// Expects a message prop from the parent
"use client";

interface AuthHeadlineProps {
  title: string;
  message: string;
}

const AuthHeadline = ({ title, message }: AuthHeadlineProps) => {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <h1 className="text-brand-blue text-2xl font-bold text-center">
        {title}
      </h1>
      <p>{message}</p>
    </div>
  );
};

export default AuthHeadline;
