import { BriefcaseBusiness, ExternalLink, FolderKanban, Gauge, LayoutDashboard, Link2, ListChecks, Search, UserRound, Wrench } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { defaultContent, getAllContent, type ContentKey } from "@/lib/content";
import { ContentEditor, type JsonValue } from "./content-editor";
import { login, logout, updateContent } from "./actions";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ error?: string; saved?: string; section?: string }> };

const sectionLabels: Record<ContentKey, string> = {
  profile: "Profil",
  seo: "SEO",
  socialLinks: "Sosial",
  projects: "Proyek",
  miniProjects: "Proyek mini",
  skills: "Keahlian",
  timeline: "Perjalanan",
};

const sectionIcons = {
  profile: UserRound,
  seo: Search,
  socialLinks: Link2,
  projects: BriefcaseBusiness,
  miniProjects: FolderKanban,
  skills: Wrench,
  timeline: ListChecks,
} satisfies Record<ContentKey, typeof UserRound>;

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams;
  if (!(await isAdmin())) {
    return (
      <main className="admin-shell">
        <form action={login} className="admin-panel admin-login">
          <p className="eyebrow">Portfolio CMS</p>
          <h1>Admin login</h1>
          <p>Kelola seluruh isi portfolio dari satu tempat.</p>
          {params.error === "invalid" ? <p role="alert">Email atau password salah.</p> : null}
          <label>Email<input name="email" type="email" required autoComplete="username" /></label>
          <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
          <button className="button button-primary" type="submit">Login</button>
        </form>
      </main>
    );
  }

  const content = await getAllContent();
  const keys = Object.keys(defaultContent) as ContentKey[];
  const selected = keys.includes(params.section as ContentKey) ? (params.section as ContentKey) : null;
  const totals = {
    projects: content.projects.length,
    miniProjects: content.miniProjects.length,
    skills: content.skills.reduce((sum, group) => sum + group.items.length, 0),
    timeline: content.timeline.length,
  };

  return (
    <main className="admin-shell admin-app">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/admin"><span>ISA</span><div><b>Portfolio</b><small>Content manager</small></div></a>
        <nav aria-label="Navigasi CMS">
          <a href="/admin" aria-current={!selected ? "page" : undefined}><Gauge size={18} /> Dashboard</a>
          <p>Konten</p>
          {keys.map((key) => {
            const Icon = sectionIcons[key];
            return <a href={`/admin?section=${key}`} aria-current={key === selected ? "page" : undefined} key={key}><Icon size={18} /> {sectionLabels[key]}</a>;
          })}
        </nav>
        <div className="admin-sidebar-footer"><a href="/" target="_blank">Lihat website <ExternalLink size={15} /></a><form action={logout}><button>Logout</button></form></div>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <div><p className="eyebrow">Portfolio CMS</p><h1>{selected ? sectionLabels[selected] : "Dashboard"}</h1></div>
          <a className="button button-secondary" href="/" target="_blank">Lihat website <ExternalLink size={15} /></a>
        </header>
        <div className="admin-content">
          {params.saved ? <p className="admin-success" role="status">Perubahan berhasil disimpan.</p> : null}
          {params.error === "json" ? <p className="admin-error" role="alert">Data tidak valid. Periksa kembali semua isian.</p> : null}

          {selected ? (
            <ContentEditor contentKey={selected} initialValue={content[selected] as JsonValue} action={updateContent} />
          ) : (
            <div className="admin-overview">
            <section className="admin-welcome">
              <div><p className="eyebrow">Selamat datang</p><h2>Kelola portfolio tanpa menyentuh kode.</h2><p>Edit profil, proyek, keahlian, tautan sosial, dan SEO melalui form yang terstruktur.</p></div>
              <a className="button button-primary" href="/admin?section=profile">Edit profil</a>
            </section>
            <section className="admin-stats" aria-label="Ringkasan konten">
              <article><FolderKanban /><strong>{totals.projects}</strong><span>Proyek utama</span></article>
              <article><ListChecks /><strong>{totals.miniProjects}</strong><span>Proyek mini</span></article>
              <article><UserRound /><strong>{totals.skills}</strong><span>Keahlian</span></article>
              <article><LayoutDashboard /><strong>{totals.timeline}</strong><span>Entri perjalanan</span></article>
            </section>
            <section className="admin-section-grid">
              <div className="admin-section-heading"><div><p className="eyebrow">Konten</p><h2>Semua bagian</h2></div><span>{keys.length} bagian</span></div>
              <div className="admin-cards">
                {keys.map((key) => {
                  const value = content[key];
                  const count = Array.isArray(value) ? `${value.length} item` : `${Object.keys(value).length} field`;
                  return <a href={`/admin?section=${key}`} key={key}><span>{sectionLabels[key]}</span><small>{count}</small><b>Edit →</b></a>;
                })}
              </div>
            </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
