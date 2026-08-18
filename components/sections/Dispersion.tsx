import { dispersion } from "@/config/copy";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Dispersion() {
  return (
    <Section
      id="probleme"
      number={dispersion.number}
      eyebrow={dispersion.eyebrow}
      title={dispersion.title}
      intro={dispersion.intro}
    >
      <div className="grid border border-ink md:grid-cols-2">
        <Reveal as="article" className="border-b border-ink p-6 md:border-b-0 md:border-r md:p-8">
          <div className="scatter mb-6" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} style={{ animationDelay: `${i * 120}ms` }} />
            ))}
          </div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-warm">
            {dispersion.left.label}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold">{dispersion.left.title}</h3>
          <ul className="mt-8 space-y-4">
            {dispersion.left.items.map((item) => (
              <li key={item} className="border-t border-line pt-4 text-warm-strong">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal as="article" delay={80} className="bg-ink p-6 text-ivory md:p-8">
          <div className="hub mb-6" aria-hidden>
            <span className="hub-core" />
          </div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-ivory/80">
            {dispersion.right.label}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold">{dispersion.right.title}</h3>
          <ul className="mt-8 space-y-4">
            {dispersion.right.items.map((item) => (
              <li key={item} className="border-t border-ivory/20 pt-4 text-ivory/90">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <p className="mt-10 max-w-3xl font-serif text-2xl italic leading-snug">{dispersion.cost}</p>
    </Section>
  );
}
