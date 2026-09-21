import { ImageResponse } from "next/og";

export const alt = "Indra Surya Adinata — Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", color: "#f4f7fb", background: "#06070a", fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(rgba(92,225,230,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(92,225,230,.08) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "linear-gradient(to bottom right, black, transparent 75%)" }} />
      <div style={{ position: "absolute", right: "-140px", top: "-120px", width: "560px", height: "560px", display: "flex", border: "1px solid rgba(139,92,246,.35)", borderRadius: "50%", boxShadow: "0 0 140px rgba(92,225,230,.12)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 2, color: "#9aa6b6" }}><span style={{ color: "#5ce1e6", fontWeight: 700 }}>ISA</span><span>PORTFOLIO / 2026</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}><div style={{ fontSize: 74, lineHeight: 1.02, fontWeight: 650, letterSpacing: -4 }}>Thoughtful digital experiences for the modern web.</div><div style={{ fontSize: 28, color: "#9aa6b6" }}>Indra Surya Adinata · Web Developer · Indonesia</div></div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, color: "#b7f7d0" }}><span style={{ width: 10, height: 10, display: "flex", borderRadius: "50%", background: "#57d98b" }} />Open to internship and junior opportunities</div>
    </div>,
    size,
  );
}
