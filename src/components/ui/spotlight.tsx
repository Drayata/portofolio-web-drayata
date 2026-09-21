"use client";

import { useEffect, useRef } from "react";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const update = (event: PointerEvent) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--spot-x", `${event.clientX}px`);
      ref.current.style.setProperty("--spot-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, []);

  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}
