import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found container">
      <div className="error-code" aria-hidden="true">404</div>
      <p className="eyebrow">Signal lost / 404</p>
      <h1>This route is outside the map.</h1>
      <p>The page may have moved, or the address may be incomplete. The work is still right where you left it.</p>
      <div><Link href="/" className="button button-primary"><Home size={17} aria-hidden="true" /> Return home</Link><Link href="/#work" className="button button-secondary"><ArrowLeft size={17} aria-hidden="true" /> View selected work</Link></div>
    </main>
  );
}
