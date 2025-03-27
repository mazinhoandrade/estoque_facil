"use client";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

import { Button } from "./ui/button";

export const LoggedUser = ({ user }: { user?: string }) => {
  const handleSignOut = () => {
    signOut();
    redirect("/login");
  };
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Olá, {user || "Usuário"}</span>
      {user && (
        <Button variant="secondary" onClick={handleSignOut}>
          Sair
        </Button>
      )}
    </div>
  );
};
