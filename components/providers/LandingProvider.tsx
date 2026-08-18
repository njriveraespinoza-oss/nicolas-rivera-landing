"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { OfferId } from "@/config/offers";
import type { DiagnosticResult } from "@/lib/diagnostic";

type LandingState = {
  highlightedOffer: OfferId | null;
  diagnosticResult: DiagnosticResult | null;
  highlightOffer: (id: OfferId) => void;
  setDiagnostic: (result: DiagnosticResult) => void;
};

const LandingContext = createContext<LandingState | null>(null);

export function LandingProvider({ children }: { children: ReactNode }) {
  const [highlightedOffer, setHighlightedOffer] = useState<OfferId | null>(null);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  const highlightOffer = useCallback((id: OfferId) => {
    setHighlightedOffer(id);
  }, []);

  const setDiagnostic = useCallback((result: DiagnosticResult) => {
    setDiagnosticResult(result);
  }, []);

  const value = useMemo(
    () => ({ highlightedOffer, diagnosticResult, highlightOffer, setDiagnostic }),
    [highlightedOffer, diagnosticResult, highlightOffer, setDiagnostic],
  );

  return <LandingContext.Provider value={value}>{children}</LandingContext.Provider>;
}

export function useLanding() {
  const ctx = useContext(LandingContext);
  if (!ctx) throw new Error("useLanding must be used within LandingProvider");
  return ctx;
}
