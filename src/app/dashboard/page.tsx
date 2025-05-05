import { getCurrentUser } from "../actions/auth/get-current-user";

const Dashboard = async () => {
  const currentUser = await getCurrentUser();
  return (
    <main>
      <h1>{`Welcome, ${currentUser.name}`}</h1>
    </main>
  );
};

export default Dashboard;
