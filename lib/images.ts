import fs from "node:fs";
import path from "node:path";

export type Shot = { src: string; kind: "desktop" | "mobile" };
const EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Reads public/projects/<slug>/ at build time.
 *  - cover.(jpg|png|webp)       -> project cover
 *  - mobile-*.(jpg|png|webp)    -> mobile shots
 *  - any other image            -> desktop shots (sorted by name)
 */
export function getShots(slug: string): { cover: string | null; shots: Shot[] } {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  if (!fs.existsSync(dir)) return { cover: null, shots: [] };
  const files = fs.readdirSync(dir).filter((f) => EXT.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const coverFile = files.find((f) => /^cover\./i.test(f));
  const shots: Shot[] = files
    .filter((f) => f !== coverFile)
    .map((f) => ({ src: `/projects/${slug}/${f}`, kind: /^mobile/i.test(f) ? "mobile" : "desktop" }));
  const cover = coverFile ? `/projects/${slug}/${coverFile}` : shots.find((s) => s.kind === "desktop")?.src ?? null;
  return { cover, shots };
}
