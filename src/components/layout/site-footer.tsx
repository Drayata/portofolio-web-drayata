import Link from "next/link";
import { navigation, profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="muted">Designed and built with care.</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.slice(0, 3).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/resume">Résumé</Link>
        </nav>
        <p className="footer-meta">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
