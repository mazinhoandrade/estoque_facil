import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Home = () => {
  redirect("/admin");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>click-me</Button>
    </main>
  );
};

export default Home;
