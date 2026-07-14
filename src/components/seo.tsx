import { BRAND } from "@/lib/site";

const DEFAULT_TITLE = `${BRAND.name} — ${BRAND.positioning}`;
const DEFAULT_DESCRIPTION =
  "Kova is the digital transformation partner for growing businesses. We replace spreadsheets, paper, and manual work with affordable custom software, automation, and real-time visibility.";

/**
 * Per-page document metadata. React 19 hoists <title>/<meta> rendered
 * anywhere in the tree into <head>, so no helmet library is needed.
 * Mirrors the old Next metadata title template: "%s · Kova".
 */
export function Seo({ title, description }: { title?: string; description?: string }) {
  const fullTitle = title ? `${title} · ${BRAND.name}` : DEFAULT_TITLE;
  const desc = description ?? DEFAULT_DESCRIPTION;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </>
  );
}
