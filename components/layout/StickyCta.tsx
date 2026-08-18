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
    <div className="pointer-events-none fixed right-0 top-1/3 z-40 hidden xl:block">
      <div className="pointer-events-auto origin-right -rotate-90 translate-x-[42%] translate-y-16">
        <Button href={nav.ctaHref} className="min-h-10 rounded-none px-5 py-2 text-[0.7rem] shadow-sm">
          {nav.cta}
        </Button>
      </div>
    </div>
  );
}
