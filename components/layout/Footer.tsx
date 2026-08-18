import Link from "next/link";
import { site } from "@/config/site";
import { footer } from "@/config/copy";
import { activeLocale } from "@/config";

export function Footer() {
  const locale = activeLocale();
  const year = new Date().getFullYear();
  const email = site.email.publicConfirmed ? site.email.value : null;

  return (
    <footer className="border-t border-ink bg-ink px-[6vw] py-14 text-ivory">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-2xl font-semibold">{site.brandName}</p>
          <p className="mt-3 max-w-md font-serif text-xl italic text-ivory/80">{footer.tagline}</p>
        </div>
        <div className="md:col-span-3">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-ivory/75">Contact</p>
          <ul className="mt-3 space-y-2 text-base">
            {email ? (
              <li>
                <a className="hover:text-ivory/70" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            ) : (
              <li className="text-ivory/50">[EMAIL] — à confirmer comme adresse publique</li>
            )}
            {site.phone ? (
              <li>
                <a className="hover:text-ivory/70" href={`tel:${site.phone}`}>
                  {site.phone}
                </a>
              </li>
            ) : (
              <li className="text-ivory/50">[TÉLÉPHONE]</li>
            )}
            {site.linkedinUrl ? (
              <li>
                <a className="hover:text-ivory/70" href={site.linkedinUrl}>
                  LinkedIn
                </a>
              </li>
            ) : (
              <li className="text-ivory/50">[LIEN_LINKEDIN]</li>
            )}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-ivory/75">Légal</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link className="hover:text-ivory/70" href="/mentions-legales">
                {footer.mentions}
              </Link>
            </li>
            <li>
              <Link className="hover:text-ivory/70" href="/confidentialite">
                {footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-ivory/20 pt-6 text-sm text-ivory/80 md:flex-row md:justify-between">
        <p>
          {footer.copyrightPrefix} {year} {site.fullName}
        </p>
        <p className="text-ivory/80">
          {footer.locale} · {locale.legalFrame.split(".")[0]}.
        </p>
        <p className="text-ivory/80">{footer.eu}</p>
      </div>
    </footer>
  );
}
