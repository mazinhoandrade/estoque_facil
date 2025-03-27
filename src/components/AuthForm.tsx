import { useState } from "react";

export default function AuthForm({
  onSubmit,
  error,
  isLogin = false,
}: {
  onSubmit: (email: string, password: string, name?: string) => void;
  error: string;
  isLogin?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onSubmit(email, password);
    } else {
      onSubmit(email, password, name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {!isLogin && (
        <div>
          <label className="mb-1 block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>
      )}
      <div>
        <label className="mb-1 block">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
      </div>
      <div>
        <label className="mb-1 block">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-primary py-2 text-white hover:bg-primary/90"
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
}
