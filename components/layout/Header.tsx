"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { nav } from "@/config/copy";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/cx";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled ? "border-line bg-ivory/95 backdrop-blur-sm" : "border-transparent bg-ivory",
      )}
    >
      <div className="flex items-center justify-between gap-4 px-[6vw] py-3 md:py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight md:text-xl"
        >
          {site.brandName}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-warm-strong hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={nav.ctaHref} className="min-h-10 px-4 py-2 text-[0.75rem]">
            {nav.cta}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-ink lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? nav.menuClose : nav.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? nav.menuClose : nav.menuOpen}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span className={cx("block h-px w-5 bg-ink transition", open && "translate-y-[4px] rotate-45")} />
            <span className={cx("block h-px w-5 bg-ink transition", open && "opacity-0")} />
            <span className={cx("block h-px w-5 bg-ink transition", open && "-translate-y-[4px] -rotate-45")} />
          </span>
        </button>
      </div>

      {open ? (
        <div id="menu-mobile" className="border-t border-line bg-ivory px-[6vw] py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Navigation mobile">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-display text-2xl font-semibold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button href={nav.ctaHref} className="mt-4 w-full" onClick={() => setOpen(false)}>
              {nav.cta}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
