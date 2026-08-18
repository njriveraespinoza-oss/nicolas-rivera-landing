import Link from "next/link";
import { cx } from "@/lib/cx";

type Variant = "primary" | "secondary" | "ghost" | "invert";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-ivory hover:bg-red focus-visible:outline-red",
  secondary:
    "border border-ink bg-transparent text-ink hover:bg-ink hover:text-ivory",
  ghost:
    "border-b border-ink pb-0.5 text-ink hover:text-red hover:border-red rounded-none px-0",
  invert:
    "bg-ivory text-ink hover:bg-ivory-deep",
};

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  arrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
  arrow,
}: Props) {
  const cls = cx(
    "group inline-flex items-center justify-center gap-2 font-display text-[0.95rem] font-semibold tracking-[0.04em] uppercase",
    variant !== "ghost" && "min-h-12 px-6 py-3",
    "transition-colors duration-300",
    "disabled:cursor-not-allowed disabled:opacity-50",
    styles[variant],
    className,
  );
  const content = (
    <>
      {children}
      {arrow ? (
        <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      ) : null}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
