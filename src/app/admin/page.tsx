import { isAdmin } from "@/lib/auth";
import { defaultContent, getAllContent, type ContentKey } from "@/lib/content";
import { login, logout, updateContent } from "./actions";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ error?: string; saved?: string; section?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams;
  if (!(await isAdmin())) {
    return (
      <main className="admin-shell">
        <form action={login} className="admin-panel admin-login">
          <p className="eyebrow">Portfolio CMS</p>
          <h1>Admin login</h1>
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
  const selected = keys.includes(params.section as ContentKey) ? (params.section as ContentKey) : keys[0];

  return (
    <main className="admin-shell">
      <div className="admin-panel">
        <header className="admin-header">
          <div><p className="eyebrow">Portfolio CMS</p><h1>Edit content</h1></div>
          <form action={logout}><button className="button button-secondary">Logout</button></form>
        </header>
        <nav className="admin-tabs" aria-label="Content sections">
          {keys.map((key) => <a href={`/admin?section=${key}`} aria-current={key === selected ? "page" : undefined} key={key}>{key}</a>)}
        </nav>
        {params.saved ? <p className="admin-success" role="status">Perubahan tersimpan.</p> : null}
        {params.error === "json" ? <p className="admin-error" role="alert">JSON tidak valid.</p> : null}
        <form action={updateContent} className="admin-editor">
          <input type="hidden" name="key" value={selected} />
          <label htmlFor="value">{selected}</label>
          <textarea id="value" name="value" defaultValue={JSON.stringify(content[selected], null, 2)} spellCheck={false} required />
          <button className="button button-primary" type="submit">Simpan</button>
        </form>
      </div>
    </main>
  );
}
