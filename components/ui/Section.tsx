import { cx } from "@/lib/cx";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  id: string;
  number?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export function Section({ id, number, eyebrow, title, intro, children, className, dark }: Props) {
  return (
    <section
      id={id}
      className={cx(
        "relative border-t border-line px-[6vw] py-16 md:py-24 lg:py-28",
        dark ? "bg-ink text-ivory" : "bg-ivory text-ink",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        {(number || eyebrow || title) && (
          <Reveal as="header" className="mb-10 max-w-3xl md:mb-14">
            <div className="mb-4 flex items-baseline gap-4">
              {number ? <span className="num text-sm">{number}</span> : null}
              {eyebrow ? (
                <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-warm">
                  {eyebrow}
                </p>
              ) : null}
            </div>
            {title ? (
              <h2 className="font-display text-3xl font-semibold leading-[1.12] tracking-tight md:text-5xl">
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p className={cx("mt-5 max-w-2xl text-lg leading-relaxed", dark ? "text-ivory/80" : "text-warm-strong")}>
                {intro}
              </p>
            ) : null}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
