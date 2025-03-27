"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      router.push("/login"); // Redireciona após cadastro
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleRegister} className="rounded-xl p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Registrar</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 w-full rounded border p-2"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
