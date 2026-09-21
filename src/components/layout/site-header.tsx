"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation, profile } from "@/data/portfolio";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="site-header">
      <nav className="nav-shell container" aria-label="Primary navigation">
        <Link href="/" className="wordmark" aria-label={`${profile.name}, home`}>
          <span>{profile.monogram}</span>
          <span className="wordmark-dot" aria-hidden="true" />
        </Link>
        <div className="desktop-nav">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="/resume" className="resume-link desktop-resume">
          Résumé <span aria-hidden="true">↗</span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
          ref={closeButton}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      {open ? (
        <div className="mobile-nav" id="mobile-navigation">
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span className="nav-index">0{index + 1}</span>
                {item.label}
              </Link>
            ))}
            <Link href="/resume" onClick={() => setOpen(false)}>
              <span className="nav-index">05</span>
              Résumé
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
