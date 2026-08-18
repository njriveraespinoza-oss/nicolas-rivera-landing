"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { qualify } from "@/config/copy";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { useLanding } from "@/components/providers/LandingProvider";
import { validateQualify, type QualifyPayload } from "@/lib/qualify";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/cx";

const empty: QualifyPayload = {
  name: "",
  company: "",
  presence: "",
  situation: "",
  outcome: "",
  email: "",
  consent: false,
  marketing: false,
};

export function Qualify() {
  const router = useRouter();
  const { diagnosticResult, highlightedOffer } = useLanding();
  const [data, setData] = useState<QualifyPayload>(empty);
  const [errors, setErrors] = useState<ReturnType<typeof validateQualify>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const started = useRef(false);

  const situationValue = data.situation || diagnosticResult?.headline || "";
  const outcomeValue = data.outcome || diagnosticResult?.firstMove || "";

  function markStart() {
    if (started.current) return;
    started.current = true;
    track("qualification_form_start", {
      prefilled_from_diagnostic: Boolean(diagnosticResult),
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: QualifyPayload = {
      ...data,
      situation: situationValue,
      outcome: outcomeValue,
      offerHint: highlightedOffer ?? data.offerHint ?? diagnosticResult?.offerHint,
      diagnosticSummary: diagnosticResult?.headline,
    };
    const nextErrors = validateQualify(payload);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        if (body?.errors) setErrors(body.errors);
        throw new Error("fail");
      }
      track("qualification_form_submit", {
        situation: payload.situation.slice(0, 80),
        offer_hint: payload.offerHint ?? "",
      });
      router.push("/confirmation");
    } catch {
      setFormError(
        site.email.value
          ? `${qualify.errorGeneric} ${site.email.value}`
          : qualify.errorGeneric,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="candidater" className="border-t border-ink bg-ink px-[6vw] py-16 text-ivory md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-ivory/75">
            {qualify.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">
            {qualify.title}
          </h2>
          <p className="mt-5 text-lg text-ivory/80">{qualify.intro}</p>
          <p className="mt-6 font-serif text-xl italic text-ivory/75">{qualify.filter}</p>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-7" noValidate>
          <Field
            id="name"
            label={qualify.fields.name.label}
            value={data.name}
            placeholder={qualify.fields.name.placeholder}
            error={errors.name}
            onChange={(v) => setData({ ...data, name: v })}
            onFocus={markStart}
            autoComplete="name"
          />
          <Field
            id="company"
            label={qualify.fields.company.label}
            value={data.company}
            placeholder={qualify.fields.company.placeholder}
            error={errors.company}
            onChange={(v) => setData({ ...data, company: v })}
            onFocus={markStart}
            autoComplete="organization"
          />
          <Field
            id="presence"
            label={qualify.fields.presence.label}
            value={data.presence}
            placeholder={qualify.fields.presence.placeholder}
            error={errors.presence}
            onChange={(v) => setData({ ...data, presence: v })}
            onFocus={markStart}
            autoComplete="url"
          />
          <Field
            id="situation"
            label={qualify.fields.situation.label}
            value={situationValue}
            placeholder={qualify.fields.situation.placeholder}
            error={errors.situation}
            onChange={(v) => setData({ ...data, situation: v })}
            onFocus={markStart}
            textarea
          />
          <Field
            id="outcome"
            label={qualify.fields.outcome.label}
            value={outcomeValue}
            placeholder={qualify.fields.outcome.placeholder}
            error={errors.outcome}
            onChange={(v) => setData({ ...data, outcome: v })}
            onFocus={markStart}
            textarea
          />
          <Field
            id="email"
            label={qualify.fields.email.label}
            value={data.email}
            placeholder={qualify.fields.email.placeholder}
            error={errors.email}
            onChange={(v) => setData({ ...data, email: v })}
            onFocus={markStart}
            type="email"
            autoComplete="email"
          />

          <Checkbox
            id="consent"
            checked={data.consent}
            error={errors.consent}
            onChange={(v) => setData({ ...data, consent: v })}
          >
            {qualify.consent}{" "}
            <Link href="/confidentialite" className="underline underline-offset-2">
              {qualify.privacyLink}
            </Link>
            .
          </Checkbox>
          <Checkbox
            id="marketing"
            checked={data.marketing}
            onChange={(v) => setData({ ...data, marketing: v })}
          >
            {qualify.marketing}
          </Checkbox>

          {formError ? (
            <p className="mt-4 text-sm text-red-200" role="alert">
              {formError}
            </p>
          ) : null}

          <div className="mt-8">
            <Button type="submit" variant="invert" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? qualify.submitting : qualify.submit}
            </Button>
          </div>
          <p className="mt-4 text-sm text-ivory/80">{qualify.privacyNote}</p>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  textarea,
  type = "text",
  autoComplete,
  onFocus,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  textarea?: boolean;
  type?: string;
  autoComplete?: string;
  onFocus?: () => void;
}) {
  const cls = cx(
    "mt-2 w-full border bg-ink px-3 py-3 text-ivory placeholder:text-ivory/35",
    error ? "border-red" : "border-ivory/30 focus:border-ivory",
  );
  return (
    <div className="mb-5">
      <label htmlFor={id} className="font-display text-sm font-semibold uppercase tracking-[0.12em]">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          className={cls}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          className={cls}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-200" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Checkbox({
  id,
  checked,
  onChange,
  children,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-ivory"
          aria-invalid={Boolean(error)}
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p className="mt-1 text-sm text-red-200" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
