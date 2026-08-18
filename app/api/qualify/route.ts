import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { validateQualify, type QualifyPayload } from "@/lib/qualify";

export async function POST(request: Request) {
  let body: QualifyPayload;
  try {
    body = (await request.json()) as QualifyPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const errors = validateQualify(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const record = {
    receivedAt: new Date().toISOString(),
    formTool: site.formTool,
    name: body.name.trim(),
    company: body.company.trim(),
    presence: body.presence.trim(),
    situation: body.situation.trim(),
    outcome: body.outcome.trim(),
    email: body.email.trim().toLowerCase(),
    consent: true,
    marketing: Boolean(body.marketing),
    offerHint: body.offerHint ?? null,
    diagnosticSummary: body.diagnosticSummary ?? null,
  };

  if (!site.formTool) {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "submissions.jsonl"),
      `${JSON.stringify(record)}\n`,
      "utf8",
    );
  }

  return NextResponse.json({ ok: true });
}
