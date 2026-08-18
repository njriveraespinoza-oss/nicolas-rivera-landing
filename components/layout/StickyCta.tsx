"use client";

import { useEffect, useState } from "react";
import { nav } from "@/config/copy";
import { Button } from "@/components/ui/Button";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const form = document.getElementById("candidater");
    if (!hero) return;

    const io = new IntersectionObserver(
      (entries) => {
        const heroEntry = entries.find((e) => e.target.id === "hero");
        const formEntry = entries.find((e) => e.target.id === "candidater");
        const pastHero = heroEntry ? !heroEntry.isIntersecting : window.scrollY > 500;
        const formVisible = formEntry?.isIntersecting ?? false;
        setVisible(pastHero && !formVisible);
      },
      { threshold: 0.12 },
    );

    io.observe(hero);
    if (form) io.observe(form);
    return () => io.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 hidden md:block">
      <div className="pointer-events-auto">
        <Button href={nav.ctaHref} arrow className="min-h-11 px-5 py-2 text-[0.72rem] shadow-[0_12px_30px_rgba(17,17,16,0.12)]">
          {nav.cta}
        </Button>
      </div>
    </div>
  );
}
