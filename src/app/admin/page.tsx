import { Suspense } from "react";

import { Dashboard } from "@/src/components/dashboard";

export const Home = async () => {
  const response = await fetch('http://localhost:3000/api/products');
  const Products = await response.json();
  return (
    <main className="min-h-screen items-center mb-20">
      <Suspense
        fallback={
          <div className="my-2 grid grid-cols-2 p-2 md:grid-cols-4 lg:grid-cols-6">
            <div className="animate-pulse rounded-lg bg-slate-200"></div>
          </div>
        }
      >
      <h1 className="mx-2 text-2xl font-bold">Dashboard</h1>
      <Dashboard Products={Products} />
      </Suspense>
    </main>
  );
};

export default Home;
