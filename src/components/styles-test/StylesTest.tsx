"use client";

import { useEffect, useRef } from "react";
import { mountStylesTest } from "./engine";
import { sendStylesReport } from "@/app/test-styles/actions";
import "./styles-test.css";

// Le test vit dans son propre conteneur : le moteur gère ses écrans et se nettoie au démontage
export default function StylesTest() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return mountStylesTest(ref.current, { sendReport: sendStylesReport });
  }, []);

  return <div ref={ref} className="st-app" aria-live="polite" />;
}
