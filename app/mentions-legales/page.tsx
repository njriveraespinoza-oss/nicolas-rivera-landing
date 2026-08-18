import Link from "next/link";
import { site } from "@/config/site";
import { legal } from "@/config/copy";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: legal.mentionsTitle,
};

function Missing({ label }: { label: string }) {
  return (
    <span className="border border-dashed border-line bg-paper px-1.5 py-0.5 font-display text-xs uppercase tracking-widest text-warm">
      {label} — {legal.missing}
    </span>
  );
}

export default function MentionsPage() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="contenu" className="px-[6vw] py-16 md:py-24">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {legal.mentionsTitle}
          </h1>
          <p className="mt-6 text-warm-strong">
            Cette page décrit l’éditeur du site. Les champs manquants sont signalés clairement et
            doivent être complétés avant toute mise en ligne publique.
          </p>

          <h2 className="mt-12 font-display text-2xl font-semibold">Éditeur</h2>
          <ul className="mt-4 space-y-3">
            <li>Nom : {site.fullName}</li>
            <li>
              Raison sociale : {site.legalEntity ?? <Missing label="[NOM / RAISON SOCIALE]" />}
            </li>
            <li>
              Adresse : {site.legalAddress ?? <Missing label="[ADRESSE_LÉGALE]" />}
            </li>
            <li>
              Statut TVA : {site.vatStatus ?? <Missing label="[STATUT_TVA]" />}
            </li>
            <li>Pays d’établissement : Suisse (marché principal : Suisse romande)</li>
            <li>
              Email :{" "}
              {site.email.publicConfirmed ? (
                <a className="underline" href={`mailto:${site.email.value}`}>
                  {site.email.value}
                </a>
              ) : (
                <>
                  {site.email.value}{" "}
                  <Missing label="[EMAIL] à confirmer comme adresse publique" />
                </>
              )}
            </li>
            <li>Téléphone : {site.phone ?? <Missing label="[TÉLÉPHONE]" />}</li>
          </ul>

          <h2 className="mt-12 font-display text-2xl font-semibold">Hébergement</h2>
          <p className="mt-4 text-warm-strong">
            <Missing label="[HÉBERGEUR]" /> — nom, adresse et contact de l’hébergeur à indiquer
            ici.
          </p>

          <h2 className="mt-12 font-display text-2xl font-semibold">Propriété intellectuelle</h2>
          <p className="mt-4 text-warm-strong">
            Les contenus de ce site (textes, structure, direction artistique) sont la propriété de{" "}
            {site.fullName}, sauf mention contraire. Toute reproduction non autorisée est
            interdite.
          </p>

          <h2 className="mt-12 font-display text-2xl font-semibold">Cadre géographique</h2>
          <p className="mt-4 text-warm-strong">
            Les tarifs affichés sur la page principale sont ceux de la Suisse (CHF). Une variante
            pour l’Union européenne sera publiée séparément. Les règles, devises et habitudes
            commerciales suisses et européennes ne sont pas mélangées.
          </p>

          <p className="mt-12">
            <Link href="/" className="underline underline-offset-4">
              Retour
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
