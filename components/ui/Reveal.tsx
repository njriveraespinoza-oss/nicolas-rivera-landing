"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article" | "header" | "li";
};

export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cx(shown ? "is-revealed" : "will-reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
