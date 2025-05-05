import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions/auth/get-current-user";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  // Retrieve user ID from the current user session
  const userId = currentUser?.id;

  // If userId is not found, redirect to the sign-in page
  // This ensures that only authenticated users can access the dashboard
  if (!userId) {
    redirect("/signin");
  }

  // Find the first store. If store exists, direct to dashboard, else keep modal open to create store
  //   const store = currentUser.stores[0];

  return <>{children}</>;
}
