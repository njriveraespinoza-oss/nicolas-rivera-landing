import { cx } from "@/lib/cx";

type Props = {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
};

export function Frame({ children, className, invert }: Props) {
  const line = invert ? "border-ivory/50" : "border-ink";
  return (
    <div className={cx("relative", className)}>
      <span aria-hidden className={cx("pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t", line)} />
      <span aria-hidden className={cx("pointer-events-none absolute -right-px -top-px h-3 w-3 border-r border-t", line)} />
      <span aria-hidden className={cx("pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l", line)} />
      <span aria-hidden className={cx("pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r", line)} />
      {children}
    </div>
  );
}
