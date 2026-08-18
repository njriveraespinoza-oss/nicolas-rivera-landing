"use client";

import { confirmation } from "@/config/copy";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export function CalendarCta() {
  if (!site.calendarUrl) {
    return (
      <p className="mt-3 text-warm-strong">
        {confirmation.calendarMissing}{" "}
        <span className="font-display text-sm uppercase tracking-widest text-warm">[LIEN_CALENDRIER]</span>
      </p>
    );
  }

  return (
    <div className="mt-5">
      <Button
        href={site.calendarUrl}
        onClick={() => track("calendar_open", { location: "confirmation" })}
      >
        {confirmation.calendarCta}
      </Button>
    </div>
  );
}
