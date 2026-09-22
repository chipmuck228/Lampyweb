import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

export const alt = `${SITE_NAME}｜${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f3f0e9",
          color: "#25231f",
        }}
      >
        <div style={{ fontSize: 36, color: "#68635b" }}>{SITE_NAME}</div>
        <div style={{ fontSize: 64, marginTop: 28, lineHeight: 1.2 }}>
          {SITE_TAGLINE}
        </div>
        <div style={{ fontSize: 28, marginTop: 36, color: "#68635b", maxWidth: 860 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    size,
  );
}
