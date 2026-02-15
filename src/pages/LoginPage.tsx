import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export function LoginPage() {
  const { login, rememberedEmail } = useAuth();
  const [email, setEmail] = useState(rememberedEmail);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(Boolean(rememberedEmail));
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const result = login(email.trim(), password, remember);
    if (!result.ok) {
      setError(result.message ?? "Login failed");
      return;
    }
    navigate("/board");
  }

  return (
    <main className="login-layout">
      <section className="card login-card">
        <h1>Task Board Login</h1>
        <p className="hint">Use `intern@demo.com` / `intern123`</p>
        <form onSubmit={onSubmit} className="stack">
          <label className="stack">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="stack">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label className="row">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            Remember me
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}
