import Link from "next/link";
import { site } from "@/config/site";
import { legal } from "@/config/copy";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: legal.privacyTitle,
};

function Missing({ label }: { label: string }) {
  return (
    <span className="border border-dashed border-line bg-paper px-1.5 py-0.5 font-display text-xs uppercase tracking-widest text-warm">
      {label} — {legal.missing}
    </span>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="contenu" className="px-[6vw] py-16 md:py-24">
        <article className="mx-auto max-w-3xl space-y-8">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {legal.privacyTitle}
          </h1>
          <p className="text-warm-strong">
            Version de travail. Le responsable du traitement et le délai de conservation exacts
            seront précisés avant mise en production. Ce texte ne constitue pas un avis juridique.
          </p>

          <section>
            <h2 className="font-display text-2xl font-semibold">Responsable</h2>
            <p className="mt-3 text-warm-strong">
              {site.fullName}.{" "}
              {site.legalAddress ?? <Missing label="[ADRESSE_LÉGALE]" />}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Données collectées</h2>
            <p className="mt-3 text-warm-strong">
              Via le formulaire de candidature, uniquement : prénom et nom, entreprise, site ou
              profil LinkedIn, situation, résultat recherché, email professionnel, consentement,
              et éventuellement un consentement marketing séparé. Aucun budget n’est demandé à ce
              stade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Finalités</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-warm-strong">
              <li>Qualifier une demande et y répondre.</li>
              <li>Préparer un éventuel entretien.</li>
              <li>
                Envoi de notes occasionnelles — uniquement si le consentement marketing a été
                donné, case non précochée.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Base</h2>
            <p className="mt-3 text-warm-strong">
              Consentement explicite pour le traitement de la candidature. Consentement séparé
              pour le marketing. Selon le cas, mesures précontractuelles à votre demande.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Outils IA et données client</h2>
            <p className="mt-3 text-warm-strong">
              Dans le cadre d’une mission, des documents et conversations peuvent alimenter une
              infrastructure IA personnalisée afin de produire des actifs (contenus, supports).
              Ces sources ne sont pas utilisées comme démonstration publique. Aucune donnée
              confidentielle n’est montrée sur ce site. Le périmètre, les outils et les accès
              sont définis avec vous avant chargement. Pour un secteur réglementé, cela s’évalue
              individuellement — ce n’est pas une garantie juridique.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Cookies et mesure</h2>
            <p className="mt-3 text-warm-strong">
              Aucun traceur non essentiel n’est chargé tant que{" "}
              <Missing label="[OUTIL_ANALYTICS]" /> n’est pas configuré. Lorsqu’un outil de mesure
              sera branché, il ne se chargera qu’après consentement. Un bandeau cookies
              n’apparaît pas aujourd’hui, faute de traceurs.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Conservation et droits</h2>
            <p className="mt-3 text-warm-strong">
              Conservation limitée au suivi de la demande et aux obligations légales.{" "}
              <Missing label="[DURÉE DE CONSERVATION]" />. Vous pouvez demander l’accès, la
              rectification, l’effacement ou la limitation, et retirer un consentement marketing.
              Contact :{" "}
              {site.email.publicConfirmed ? site.email.value : <Missing label="[EMAIL]" />}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Formulaire</h2>
            <p className="mt-3 text-warm-strong">
              Outil actuellement : enregistrement local de démonstration, en attendant{" "}
              <Missing label="[OUTIL_FORMULAIRE]" />.
            </p>
          </section>

          <p>
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
