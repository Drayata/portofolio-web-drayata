"use client";

import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation, profile } from "@/data/portfolio";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.getElementById(href.split("#")[1]))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <nav className="nav-island" aria-label="Primary navigation">
        <Link href="/" className="wordmark" aria-label={`${profile.name}, home`}>
          <span>{profile.monogram}</span>
          <span className="wordmark-dot" aria-hidden="true" />
        </Link>
        <div className="desktop-nav">
          {navigation.map((item) => {
            const section = item.href.split("#")[1];
            return (
              <Link key={item.href} href={item.href} className={activeSection === section ? "is-active" : undefined} aria-current={activeSection === section ? "location" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link href="/resume" className="resume-link desktop-resume">
          <FileText size={14} aria-hidden="true" /> Résumé
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
          ref={menuButton}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      {open ? (
        <div className="mobile-nav" id="mobile-navigation" onClick={() => setOpen(false)}>
          <nav aria-label="Mobile navigation" onClick={(event) => event.stopPropagation()}>
            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span className="nav-index">0{index + 1}</span>
                {item.label}
              </Link>
            ))}
            <Link href="/resume" onClick={() => setOpen(false)}>
              <span className="nav-index">0{navigation.length + 1}</span>
              Résumé
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
