import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Spotlight } from "@/components/ui/spotlight";
import { profile, seo, socialLinks } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: { default: seo.title, template: `%s — ${profile.name}` },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: profile.name, url: seo.url }],
  creator: profile.name,
  applicationName: `${profile.name} Portfolio`,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: "/",
    siteName: profile.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }],
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: ["/opengraph-image"] },
  icons: { icon: "/icon.svg" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = { colorScheme: "dark", themeColor: "#06070A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sameAs = socialLinks.flatMap((link) => (link.href && URL.canParse(link.href) && !link.href.includes("USERNAME") ? [link.href] : []));
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${seo.url}/#person`,
      name: profile.name,
      alternateName: ["Drayata", "Indra Surya"],
      url: seo.url,
      email: `mailto:${profile.email}`,
      jobTitle: profile.role,
      description: seo.description,
      knowsAbout: ["Web Development", "Frontend Development", "Next.js", "React", "TypeScript"],
      address: { "@type": "PostalAddress", addressCountry: "ID" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Universitas Jenderal Soedirman" },
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${profile.name} — Portfolio`,
      alternateName: ["Drayata", "Drayata Portfolio", "Portofolio Indra Surya Adinata"],
      url: seo.url,
      inLanguage: "en",
      author: { "@id": `${seo.url}/#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: seo.url,
      name: seo.title,
      mainEntity: { "@id": `${seo.url}/#person` },
    },
  ];

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Spotlight />
        <SiteHeader />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
