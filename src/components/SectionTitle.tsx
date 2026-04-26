/* ─── SectionTitle — eyebrow + Playfair heading ──────────── */
interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  /** Optional supporting copy in italic Cormorant. */
  lede?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  eyebrow,
  title,
  lede,
  align = "left",
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header className={`max-w-[640px] ${alignment}`}>
      {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
      <h2 className="font-display text-[36px] font-semibold leading-[1.1] text-azul-dk">
        {title}
      </h2>
      {lede && (
        <p className="font-accent italic text-[18px] text-azul/70 mt-3 leading-relaxed">
          {lede}
        </p>
      )}
    </header>
  );
}
