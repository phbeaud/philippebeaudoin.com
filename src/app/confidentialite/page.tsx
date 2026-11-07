import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment philippebeaudoin.com recueille, utilise et protège vos renseignements personnels, conformément à la Loi 25 du Québec.",
  alternates: { canonical: "/confidentialite" },
};

// Mettre à jour cette date à chaque changement de la politique
const UPDATED = "6 novembre 2026";
const EMAIL = "phbeaudoin@outlook.com";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Responsable de la protection des renseignements personnels",
    body: (
      <p>
        Philippe Beaudoin est responsable de la protection des renseignements personnels recueillis par ce site. Pour
        toute question, demande ou plainte : <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ou 819.349.8334.
      </p>
    ),
  },
  {
    title: "Ce que nous recueillons, et pourquoi",
    body: (
      <>
        <h3>Formulaire de demande de proposition</h3>
        <p>
          Votre nom, votre organisation, votre courriel, votre téléphone (facultatif) et les détails de votre événement
          (type d&apos;intervention, auditoire, nombre de participants, format, durée, date, lieu, budget et message).
          Ils servent uniquement à répondre à votre demande et à préparer une proposition. Ils sont transmis par courriel
          à Philippe Beaudoin et ne sont pas conservés sur le site.
        </p>
        <h3>Rapport du test des styles par courriel</h3>
        <p>
          Si vous demandez votre rapport, votre courriel, votre prénom (facultatif) et votre résultat servent à vous
          l&apos;envoyer. Avec votre consentement, exprimé en cochant la case prévue, ils sont aussi transmis à Philippe
          Beaudoin. Si vous cochez la case de l&apos;infolettre, il pourra vous écrire à l&apos;occasion; vous pouvez
          vous désabonner en tout temps.
        </p>
        <h3>Statistiques anonymes du test des styles</h3>
        <p>
          Lorsque vous faites le test, les renseignements suivants sont enregistrés sans votre nom, votre courriel ni
          votre adresse IP : votre profil et vos scores, vos réponses aux questions facultatives (tranche d&apos;âge,
          rôle, secteur), la date, le type d&apos;appareil, le site d&apos;où vous venez et une région approximative
          déduite de votre connexion Internet. Ils servent à produire des statistiques globales, par exemple la
          répartition des styles selon les générations. Ils ne permettent pas de vous identifier.
        </p>
        <h3>Dans votre navigateur</h3>
        <p>
          Vos réponses au test et votre prénom sont gardés dans votre propre navigateur, pour que vous puissiez reprendre
          le test ou revoir votre profil. Vous pouvez les effacer en tout temps avec le bouton « Refaire le test » ou en
          vidant les données du site dans votre navigateur. Ce site n&apos;utilise aucun témoin publicitaire ni outil de
          suivi d&apos;un tiers.
        </p>
      </>
    ),
  },
  {
    title: "Consentement",
    body: (
      <p>
        En nous transmettant vos renseignements par un formulaire, vous consentez à leur utilisation aux fins décrites
        ci-dessus, et seulement à ces fins. Vous pouvez retirer votre consentement en tout temps en écrivant à{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Ce site s&apos;adresse à des adultes et à des professionnels : une
        personne de moins de 14 ans ne devrait pas y transmettre son courriel.
      </p>
    ),
  },
  {
    title: "Fournisseurs et hébergement hors du Québec",
    body: (
      <>
        <p>Pour fonctionner, le site fait appel aux fournisseurs suivants :</p>
        <ul>
          <li>Vercel : hébergement du site (États-Unis);</li>
          <li>Resend : envoi des courriels (États-Unis);</li>
          <li>Neon : base de données des statistiques anonymes (États-Unis);</li>
          <li>Microsoft Outlook : réception des demandes et des avis.</li>
        </ul>
        <p>
          Ces fournisseurs traitent les renseignements seulement pour rendre leur service, selon leurs propres mesures
          de sécurité. Les renseignements peuvent donc être conservés à l&apos;extérieur du Québec, où ils sont soumis aux
          lois locales. Seuls les renseignements nécessaires leur sont transmis, et aucun n&apos;est vendu ni loué.
        </p>
      </>
    ),
  },
  {
    title: "Conservation et sécurité",
    body: (
      <p>
        Les demandes et les rapports sont conservés le temps nécessaire pour répondre et assurer le suivi de la relation
        professionnelle, puis supprimés. Les statistiques anonymes peuvent être conservées sans limite de durée,
        puisqu&apos;elles ne permettent pas d&apos;identifier une personne. L&apos;accès au tableau des statistiques est
        protégé par mot de passe et réservé à Philippe Beaudoin. En cas d&apos;incident de confidentialité présentant un
        risque de préjudice sérieux, les personnes concernées et la Commission d&apos;accès à l&apos;information seront
        avisées, comme le prévoit la loi.
      </p>
    ),
  },
  {
    title: "Vos droits",
    body: (
      <>
        <p>Vous pouvez en tout temps :</p>
        <ul>
          <li>demander l&apos;accès aux renseignements personnels que nous détenons à votre sujet;</li>
          <li>en demander la correction ou la suppression;</li>
          <li>retirer votre consentement ou vous désabonner de l&apos;infolettre.</li>
        </ul>
        <p>
          Écrivez à <a href={`mailto:${EMAIL}`}>{EMAIL}</a> : nous répondrons dans un délai de 30 jours. Si vous
          n&apos;êtes pas satisfait de la réponse, vous pouvez porter plainte à la{" "}
          <a href="https://www.cai.gouv.qc.ca/" target="_blank" rel="noopener noreferrer">
            Commission d&apos;accès à l&apos;information du Québec
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function Confidentialite() {
  return (
    <>
      <PageHero
        eyebrow="Confidentialité"
        title={
          <>
            Vos renseignements, <em className="italic text-accent">protégés</em>.
          </>
        }
        intro="Ce que ce site recueille, pourquoi, et comment exercer vos droits, conformément à la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25)."
      />
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:px-8">
        <p className="eyebrow opacity-60">Dernière mise à jour : {UPDATED}</p>
        <div className="mt-10 space-y-14 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-accent [&_h3]:mt-6 [&_h3]:font-semibold [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-7 [&_p]:text-ink/80 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-ink/80">
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="font-display text-3xl tracking-tight">
                <span className="eyebrow mr-3 align-middle text-sm opacity-50">0{i + 1}</span>
                {s.title}
              </h2>
              {s.body}
            </div>
          ))}
        </div>
        <p className="mt-16 text-sm text-muted">
          Une question sur cette politique?{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-accent">
            Écrivez-nous
          </Link>
          .
        </p>
      </section>
    </>
  );
}
