"use client";

import { mechanism } from "@/config/copy";
import { cx } from "@/lib/cx";

type Props = {
  active: number;
  onSelect?: (index: number) => void;
  dark?: boolean;
  compact?: boolean;
};

export function Pipeline({ active, onSelect, dark, compact }: Props) {
  return (
    <ol
      className={cx("pipeline", compact && "pipeline-compact", dark && "pipeline-dark")}
      aria-label="Parcours du système"
    >
      {mechanism.steps.map((step, i) => {
        const done = i < active;
        const current = i === active;
        const inner = (
          <>
            <span className="pipeline-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="pipeline-label">{step.title}</span>
          </>
        );
        return (
          <li key={step.id} className="pipeline-item">
            {i > 0 ? <span className={cx("pipeline-line", (done || current) && "is-on")} aria-hidden /> : null}
            {onSelect ? (
              <button
                type="button"
                className={cx("pipeline-node", current && "is-current", done && "is-done")}
                onClick={() => onSelect(i)}
                aria-current={current ? "step" : undefined}
              >
                {inner}
              </button>
            ) : (
              <div className={cx("pipeline-node", current && "is-current", done && "is-done")}>
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
