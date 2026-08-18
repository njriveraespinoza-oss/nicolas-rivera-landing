import { cx } from "@/lib/cx";

type Props = {
  label: string;
  hint?: string;
  className?: string;
};

/**
 * Emplacement identifié pour une preuve réelle future.
 * Ne jamais remplir avec un faux témoignage.
 */
export function ProofSlot({ label, hint, className }: Props) {
  return (
    <aside
      className={cx(
        "border border-dashed border-line bg-paper p-6 md:p-8",
        className,
      )}
      aria-label={`Emplacement prévu : ${label}`}
    >
      <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-warm">
        Emplacement prévu
      </p>
      <p className="mt-2 font-display text-xl font-semibold tracking-tight">{label}</p>
      {hint ? <p className="mt-3 text-base text-warm-strong">{hint}</p> : null}
    </aside>
  );
}
