import { Dashboard } from "@/src/components/dashboard";

export const Home = () => {
  return (
    <main className="min-h-screen items-center mb-20">
      <h1 className="mx-2 text-2xl font-bold">Dashboard</h1>
      <Dashboard />
    </main>
  );
};

export default Home;
