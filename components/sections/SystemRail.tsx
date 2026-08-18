import { mechanism } from "@/config/copy";

export function SystemRail() {
  const items = [...mechanism.steps, ...mechanism.steps];
  return (
    <div className="system-rail" aria-hidden>
      <div className="system-rail-track">
        {items.map((step, i) => (
          <span key={`${step.id}-${i}`} className="system-rail-item">
            {String((i % mechanism.steps.length) + 1).padStart(2, "0")} {step.title}
            <span className="system-rail-sep"> → </span>
          </span>
        ))}
      </div>
    </div>
  );
}
