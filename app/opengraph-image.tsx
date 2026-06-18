import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

// Static, on-brand Open Graph image generated at build time.
// Replace later with a designed asset if desired.
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(900px circle at 80% 15%, rgba(245,166,35,0.28), transparent 55%), radial-gradient(800px circle at 10% 100%, rgba(45,212,191,0.20), transparent 55%), #0A0E1A",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.3em",
            color: "#FFB84D",
          }}
        >
          HK
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#F5F3EF",
              lineHeight: 1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#2DD4BF",
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#8A92A6",
            maxWidth: 900,
          }}
        >
          Founder of UKDIGIHUB · Digital marketing systems, web apps &
          automation for small businesses
        </div>
      </div>
    ),
    { ...size },
  );
}
