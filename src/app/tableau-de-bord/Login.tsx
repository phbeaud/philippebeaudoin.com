"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function Login() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="mx-auto mt-10 flex max-w-sm flex-col gap-4">
      <label htmlFor="password" className="eyebrow opacity-60">
        Mot de passe
      </label>
      <input id="password" name="password" type="password" required autoFocus className="rounded-full border border-ink/20 bg-white px-5 py-3" />
      <button disabled={pending} className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/85 disabled:opacity-60">
        Entrer
      </button>
      {error && <p className="text-sm text-accent-deep">{error}</p>}
    </form>
  );
}
