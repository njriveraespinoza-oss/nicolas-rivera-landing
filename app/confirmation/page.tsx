import Link from "next/link";
import { confirmation } from "@/config/copy";
import { site } from "@/config/site";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalendarCta } from "@/components/sections/CalendarCta";

export const metadata = {
  title: "Candidature reçue",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="contenu" className="px-[6vw] py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="num text-sm">09</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {confirmation.title}
          </h1>
          <p className="mt-6 text-xl text-warm-strong">{confirmation.lead}</p>

          <Block title={confirmation.nextTitle} items={confirmation.next} />
          <Block title={confirmation.prepareTitle} items={confirmation.prepare} />
          <Block title={confirmation.docsTitle} items={confirmation.docs} />

          <section className="mt-12 border-t border-line pt-8">
            <h2 className="font-display text-2xl font-semibold">{confirmation.whenTitle}</h2>
            <p className="mt-3 text-warm-strong">
              {site.responseSla ?? confirmation.whenMissing}
            </p>
          </section>

          <section className="mt-12 border-t border-line pt-8">
            <h2 className="font-display text-2xl font-semibold">{confirmation.calendarTitle}</h2>
            <CalendarCta />
          </section>

          <p className="mt-12">
            <Link href="/" className="font-display text-sm font-semibold uppercase tracking-[0.12em] underline underline-offset-4">
              {confirmation.back}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-12 border-t border-line pt-8">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <ol className="mt-4 space-y-3">
        {items.map((item, i) => (
          <li key={item} className="flex gap-4">
            <span className="num text-sm">{String(i + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
