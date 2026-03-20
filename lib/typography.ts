// lib/typography.ts
// Converts a typography block from the CMS into a React CSSProperties object.
// Used by every section component to apply per-section font overrides.

export type TypographyBlock = {
  font?: string;
  size?: string;
  weight?: string;
  style?: string;
  letterSpacing?: string;
  lineHeight?: string;
  paragraphSpacing?: string;
  textTransform?: string;
  colorHex?: string;
};

export function typoStyle(t?: TypographyBlock | null): React.CSSProperties {
  if (!t) return {};
  const s: React.CSSProperties = {};
  if (t.font)           s.fontFamily        = `'${t.font}', sans-serif`;
  if (t.size)           s.fontSize          = t.size;
  if (t.weight)         s.fontWeight        = t.weight as any;
  if (t.style)          s.fontStyle         = t.style as any;
  if (t.letterSpacing)  s.letterSpacing     = t.letterSpacing;
  if (t.lineHeight)     s.lineHeight        = t.lineHeight;
  if (t.paragraphSpacing) (s as any).marginBottom = t.paragraphSpacing;
  if (t.textTransform)  s.textTransform     = t.textTransform as any;
  if (t.colorHex)       s.color             = t.colorHex;
  return s;
}
