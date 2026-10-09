import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#3A2BFF", color: "#ECEDF3", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 72 }}>
        <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ fontSize: 40, marginTop: 24 }}>{profile.title}</div>
      </div>
    ),
    size
  );
}
