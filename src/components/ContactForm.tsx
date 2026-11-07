"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/contact/actions";

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20";
const label = "mb-2 block text-sm font-medium";
const req = <span className="text-accent">*</span>;

function Chips({
  name,
  options,
  required = false,
  defaultValue,
}: {
  name: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, i) => (
        <label key={option} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option}
            required={required && i === 0}
            defaultChecked={option === defaultValue}
            className="peer sr-only"
          />
          <span className="inline-block rounded-full border border-ink/15 bg-white px-4 py-2 text-sm transition peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 hover:border-ink/40">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-6 border-t border-ink/10 pt-8">
      <legend className="flex items-baseline gap-3">
        <span className="eyebrow opacity-60">0{n}</span>
        <span className="font-display text-2xl tracking-tight">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

const initialState: ContactState = { status: "idle" };

export default function ContactForm({ topic }: { topic?: string }) {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="mt-8 rounded-2xl bg-ink p-10 text-paper">
        <p className="font-display text-3xl">Merci, votre demande est bien reçue.</p>
        <p className="mt-3 text-paper/70">Je vous reviens dans les 24 à 48 heures avec une proposition adaptée.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="relative mt-10 grid gap-10">
      <Step n={1} title="Votre intervention">
        <div>
          <p className={label}>Type d&apos;intervention {req}</p>
          <Chips
            name="need"
            required
            defaultValue={topic ? "Conférence" : undefined}
            options={["Conférence", "Formation", "Atelier", "Sur mesure", "À déterminer"]}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="audience" className={label}>
              Clientèle
            </label>
            <select id="audience" name="audience" className={input} defaultValue="">
              <option value="">Choisir</option>
              {["Entreprise", "Éducation", "Santé", "Association ou congrès", "OBNL", "Autre"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="participants" className={label}>
              Nombre approximatif de participants
            </label>
            <input id="participants" name="participants" type="text" inputMode="numeric" className={input} placeholder="Ex. : 40" />
          </div>
        </div>
        <div>
          <p className={label}>Format souhaité</p>
          <Chips name="format" options={["Présentiel", "Virtuel", "À déterminer"]} />
        </div>
        <div>
          <p className={label}>Durée envisagée</p>
          <Chips name="duration" options={["60 min", "90 min", "120 min", "150 min", "Journée complète", "À déterminer"]} />
        </div>
      </Step>

      <Step n={2} title="Votre événement">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className={label}>
              Date
            </label>
            <input id="date" name="date" type="text" className={input} placeholder="Ex. : mars 2027, à confirmer" />
          </div>
          <div>
            <label htmlFor="location" className={label}>
              Lieu
            </label>
            <input id="location" name="location" type="text" className={input} placeholder="Ville ou en ligne" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className={label}>
            Votre événement ou le défi à aborder {req}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className={input}
            defaultValue={topic ? `Je m'intéresse à la conférence « ${topic} ». ` : undefined}
            placeholder="Parlez-moi brièvement de votre événement ou du défi que vous souhaitez aborder"
          />
        </div>
        <div>
          <label htmlFor="budget" className={label}>
            Budget envisagé <span className="font-normal text-muted">(facultatif)</span>
          </label>
          <input id="budget" name="budget" type="text" className={input} />
        </div>
      </Step>

      <Step n={3} title="Vos coordonnées">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>
              Nom complet {req}
            </label>
            <input id="name" name="name" type="text" required autoComplete="name" className={input} />
          </div>
          <div>
            <label htmlFor="organization" className={label}>
              Organisation {req}
            </label>
            <input id="organization" name="organization" type="text" required autoComplete="organization" className={input} />
          </div>
          <div>
            <label htmlFor="email" className={label}>
              Courriel {req}
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={input} />
          </div>
          <div>
            <label htmlFor="phone" className={label}>
              Téléphone
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
          </div>
        </div>
      </Step>

      {/* Champ piège anti-robots, invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Site web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent-deep">
          {state.message}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-accent/20 transition hover:bg-accent-deep disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Envoi en cours…" : "Demander une proposition"}
          {!pending && (
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
        <p className="mt-4 text-xs text-muted">
          Vos renseignements servent uniquement à répondre à votre demande.{" "}
          <Link href="/confidentialite" className="underline underline-offset-4 hover:text-accent">
            Politique de confidentialité
          </Link>
        </p>
      </div>
    </form>
  );
}
