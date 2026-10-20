"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  BriefcaseBusiness, ChevronLeft, ExternalLink, FolderKanban, Gauge,
  Link2, ListChecks, LogOut, Menu, PanelLeft, Search, UserRound, Wrench, X,
} from "lucide-react";
import type { ContentKey } from "@/lib/content";

const groups: Array<{ label: string; items: Array<{ key?: ContentKey; label: string; icon: typeof Gauge }> }> = [
  { label: "Overview", items: [{ label: "Dashboard", icon: Gauge }] },
  { label: "Content", items: [
    { key: "profile", label: "Profil", icon: UserRound },
    { key: "projects", label: "Proyek", icon: BriefcaseBusiness },
    { key: "miniProjects", label: "Proyek mini", icon: FolderKanban },
    { key: "skills", label: "Keahlian", icon: Wrench },
    { key: "timeline", label: "Perjalanan", icon: ListChecks },
  ] },
  { label: "Configuration", items: [
    { key: "socialLinks", label: "Tautan sosial", icon: Link2 },
    { key: "seo", label: "SEO", icon: Search },
  ] },
];

type Props = {
  selected: ContentKey | null;
  title: string;
  logoutAction: () => Promise<void>;
  children: ReactNode;
};

export function AdminShell({ selected, title, logoutAction, children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setCollapsed(localStorage.getItem("cms-sidebar") === "collapsed"));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMobileOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [mobileOpen]);

  const toggle = () => setCollapsed((value) => {
    localStorage.setItem("cms-sidebar", value ? "expanded" : "collapsed");
    return !value;
  });

  return (
    <main className={`admin-shell admin-app${collapsed ? " is-collapsed" : ""}${mobileOpen ? " is-menu-open" : ""}`}>
      <button className="admin-nav-overlay" aria-label="Tutup navigasi" onClick={() => setMobileOpen(false)} />
      <aside className="admin-sidebar" aria-label="Navigasi CMS">
        <div className="admin-brand-row">
          <a className="admin-brand" href="/admin" title="Portfolio CMS">
            <span>ISA</span><div><b>Portfolio</b><small>Content manager</small></div>
          </a>
          <button className="admin-collapse" type="button" onClick={toggle} aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"} title={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}>
            {collapsed ? <PanelLeft size={17} /> : <ChevronLeft size={17} />}
          </button>
        </div>
        <nav>
          {groups.map((group) => (
            <div className="admin-nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map(({ key, label, icon: Icon }) => {
                const active = key ? selected === key : !selected;
                return <a href={key ? `/admin?section=${key}` : "/admin"} aria-current={active ? "page" : undefined} title={collapsed ? label : undefined} key={label} onClick={() => setMobileOpen(false)}><Icon size={17} /><span>{label}</span></a>;
              })}
            </div>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" title={collapsed ? "Lihat portfolio" : undefined}><ExternalLink size={17} /><span>Lihat portfolio</span></a>
          <form action={logoutAction}><button title={collapsed ? "Logout" : undefined}><LogOut size={17} /><span>Logout</span></button></form>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <button className="admin-menu-button" type="button" aria-label="Buka navigasi" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Menu size={19} /></button>
          <div className="admin-breadcrumb"><span>Portfolio CMS</span><b>/</b><strong>{title}</strong></div>
          <a className="button button-secondary admin-view-site" href="/" target="_blank" rel="noreferrer">Lihat portfolio <ExternalLink size={15} /></a>
          {mobileOpen ? <button className="admin-mobile-close" type="button" aria-label="Tutup navigasi" onClick={() => setMobileOpen(false)}><X size={19} /></button> : null}
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </main>
  );
}
