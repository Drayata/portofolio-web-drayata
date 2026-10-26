import { ArrowRight, BriefcaseBusiness, ExternalLink, FolderKanban, ListChecks, Plus, UserRound, Wrench } from "lucide-react";
import type { Metadata } from "next";
import "./admin.css";
import { isAdmin } from "@/lib/auth";
import { defaultContent, getAllContent, type ContentKey } from "@/lib/content";
import { AdminShell } from "./admin-shell";
import { ContentEditor, type JsonValue } from "./content-editor";
import { login, logout, updateContent } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

type Props = { searchParams: Promise<{ create?: string; error?: string; saved?: string; section?: string }> };

const sectionLabels: Record<ContentKey, string> = {
  profile: "Profil", projects: "Proyek", miniProjects: "Proyek mini", skills: "Keahlian",
  timeline: "Perjalanan", socialLinks: "Tautan sosial", seo: "SEO",
};
const descriptions: Record<ContentKey, string> = {
  profile: "Identitas, peran, lokasi, dan pengantar utama.",
  projects: "Studi kasus dan proyek unggulan portfolio.",
  miniProjects: "Eksperimen dan karya berlingkup kecil.",
  skills: "Kelompok teknologi dan perangkat yang digunakan.",
  timeline: "Riwayat pendidikan, praktik, dan pembelajaran.",
  socialLinks: "Tautan platform sosial dan kontak publik.",
  seo: "Metadata dasar dan tampilan hasil pencarian.",
};

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams;
  if (!(await isAdmin())) return (
    <main className="admin-shell admin-login-shell">
      <form action={login} className="admin-panel admin-login">
        <div className="admin-login-brand"><span>ISA</span><div><p className="eyebrow">Portfolio CMS</p><h1>Selamat datang kembali</h1></div></div>
        <p>Masuk untuk mengelola konten portfolio.</p>
        {params.error === "invalid" ? <p className="admin-error" role="alert">Email atau password salah.</p> : null}
        <label><span>Email</span><input name="email" type="email" required autoComplete="username" /></label>
        <label><span>Password</span><input name="password" type="password" required autoComplete="current-password" /></label>
        <button className="button button-primary" type="submit">Login</button>
      </form>
    </main>
  );

  const content = await getAllContent();
  const keys = Object.keys(defaultContent) as ContentKey[];
  const selected = keys.includes(params.section as ContentKey) ? params.section as ContentKey : null;
  const totals = [
    { label: "Total proyek", value: content.projects.length, icon: BriefcaseBusiness, key: "projects" },
    { label: "Proyek mini", value: content.miniProjects.length, icon: FolderKanban, key: "miniProjects" },
    { label: "Keahlian", value: content.skills.reduce((sum, group) => sum + group.items.length, 0), icon: Wrench, key: "skills" },
    { label: "Entri perjalanan", value: content.timeline.length, icon: ListChecks, key: "timeline" },
  ];

  return (
    <AdminShell selected={selected} title={selected ? sectionLabels[selected] : "Dashboard"} logoutAction={logout}>
      {params.saved ? <p className="admin-success" role="status">Perubahan berhasil disimpan.</p> : null}
      {params.error === "json" ? <p className="admin-error" role="alert">Data tidak valid. Periksa kembali semua isian.</p> : null}
      {params.error === "save" ? <p className="admin-error" role="alert">Perubahan gagal disimpan. Periksa field wajib lalu coba lagi.</p> : null}
      {selected ? <ContentEditor contentKey={selected} initialValue={content[selected] as JsonValue} action={updateContent} create={params.create === "1"} /> : (
        <div className="admin-overview">
          <header className="admin-page-heading"><div><h1>Dashboard</h1><p>Kelola dan perbarui konten portfolio Anda.</p></div><a className="button button-primary" href="/" target="_blank" rel="noreferrer">Lihat portfolio <ExternalLink size={15} /></a></header>
          <section className="admin-stats" aria-label="Ringkasan konten">
            {totals.map(({ label, value, icon: Icon, key }) => <a href={`/admin?section=${key}`} key={key}><span><Icon size={17} /></span><strong>{value}</strong><small>{label}</small></a>)}
          </section>
          <section className="admin-dashboard-grid">
            <div className="admin-dashboard-panel"><div className="admin-section-heading"><div><h2>Aksi cepat</h2><p>Jalur singkat untuk pembaruan umum.</p></div></div><div className="admin-quick-actions">
              <a href="/admin?section=projects&create=1"><Plus size={17} /><span><b>Tambah proyek</b><small>Buat studi kasus baru</small></span><ArrowRight size={15} /></a>
              <a href="/admin?section=miniProjects&create=1"><Plus size={17} /><span><b>Tambah proyek mini</b><small>Tambahkan karya ringkas</small></span><ArrowRight size={15} /></a>
              <a href="/admin?section=profile"><UserRound size={17} /><span><b>Edit profil</b><small>Perbarui identitas dan bio</small></span><ArrowRight size={15} /></a>
              <a href="/admin?section=skills"><Wrench size={17} /><span><b>Kelola keahlian</b><small>Atur kategori dan item</small></span><ArrowRight size={15} /></a>
            </div></div>
            <div className="admin-dashboard-panel"><div className="admin-section-heading"><div><h2>Manajemen konten</h2><p>Semua bagian portfolio.</p></div><span>{keys.length} bagian</span></div><div className="admin-content-rows">
              {keys.map((key) => { const value = content[key]; const count = Array.isArray(value) ? `${value.length} item` : `${Object.keys(value).length} field`; return <a href={`/admin?section=${key}`} key={key}><span><b>{sectionLabels[key]}</b><small>{descriptions[key]}</small></span><em>{count}</em><ArrowRight size={15} /></a>; })}
            </div></div>
          </section>
        </div>
      )}
    </AdminShell>
  );
}
