// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import AuthForm from "@/components/AuthForm";

// export default function Login() {
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (email: string, password: string) => {
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         router.push("/admin/");
//       } else {
//         const data = await response.json();
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.log(err);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="mx-auto mt-10 max-w-md">
//       <h1 className="mb-6 text-2xl font-bold">Login</h1>
//       <AuthForm onSubmit={handleSubmit} error={error} isLogin />
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="rounded-xl p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
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
          className="w-full rounded bg-primary p-2 text-white"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
