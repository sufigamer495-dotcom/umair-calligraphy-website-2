interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
}

export function SectionHeading({ eyebrow, title, description, dark = false }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {eyebrow && (
        <span className={`label-uppercase mb-4 ${dark ? 'text-white' : 'text-gold'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-section-heading ${dark ? 'text-white' : 'text-[#1A1A1A]'}`}>
        {title}
      </h2>
      <div className={`w-10 h-px mt-6 ${dark ? 'bg-white/40' : 'bg-gold'}`} />
      {description && (
        <p className={`mt-6 text-body max-w-xl font-body font-light leading-relaxed ${dark ? 'text-white/70' : 'text-[#666666]'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
