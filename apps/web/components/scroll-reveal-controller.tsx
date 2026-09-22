"use client";

import { useEffect } from "react";
import { bindScrollReveal } from "@/lib/scroll-reveal";

export function ScrollRevealController() {
  useEffect(() => {
    let session: ReturnType<typeof bindScrollReveal> | undefined;
    let nested = 0;
    const outer = window.requestAnimationFrame(() => {
      nested = window.requestAnimationFrame(() => {
        session = bindScrollReveal();
      });
    });

    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(nested);
      session?.disconnect();
    };
  }, []);

  return null;
}
