import { site } from "@/config/site";
import { seo } from "@/config/copy";
import { activeLocale } from "@/config";

export function JsonLd() {
  const locale = activeLocale();
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.brandName,
    description: seo.description,
    url: site.domain ? `https://${site.domain}` : undefined,
    areaServed: [
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Place", name: "Suisse romande" },
      { "@type": "Place", name: "Europe" },
    ],
    founder: {
      "@type": "Person",
      name: site.fullName,
    },
    priceRange: locale.currency,
    email: site.email.publicConfirmed ? site.email.value : undefined,
    telephone: site.phone ?? undefined,
    address: site.legalAddress
      ? { "@type": "PostalAddress", streetAddress: site.legalAddress, addressCountry: site.country }
      : undefined,
    sameAs: site.linkedinUrl ? [site.linkedinUrl] : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
