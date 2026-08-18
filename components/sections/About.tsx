import { about } from "@/config/copy";
import { site } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { Frame } from "@/components/ui/Frame";

export function About() {
  return (
    <Section id="a-propos" number={about.number} eyebrow={about.eyebrow} title={about.title}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="max-w-2xl text-lg leading-relaxed text-warm-strong">{about.body}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-red">
                {about.filterTitle.split(".")[0]}.
              </h3>
              <ul className="mt-4 space-y-3">
                {about.is.map((item) => (
                  <li key={item} className="border-t border-line pt-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-warm">
                {about.filterTitle.split(". ")[1]}
              </h3>
              <ul className="mt-4 space-y-3 text-warm-strong">
                {about.isNot.map((item) => (
                  <li key={item} className="border-t border-line pt-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <aside className="lg:col-span-5">
          <Frame>
          {site.photo.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.photo.src}
              alt={site.photo.alt}
              width={640}
              height={800}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full flex-col justify-between border border-dashed border-line bg-paper p-6">
              <p className="font-display text-xs uppercase tracking-[0.18em] text-warm">{site.photo.placeholder}</p>
              <p className="font-display text-5xl font-semibold leading-none tracking-tight">
                {site.fullName.split(" ").map((w) => (
                  <span key={w} className="block">
                    {w}
                  </span>
                ))}
              </p>
              <p className="text-sm text-warm">{about.photoMissing}</p>
            </div>
          )}
          </Frame>
        </aside>
      </div>
    </Section>
  );
}
