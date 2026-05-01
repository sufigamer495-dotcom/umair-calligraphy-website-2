interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-2xl text-gold italic mb-4">&ldquo;</span>
      <p className="text-body font-body font-light italic leading-relaxed text-[#1A1A1A]">
        {quote}
      </p>
      <p className="mt-4 text-caption font-medium text-[#1A1A1A]">{name}</p>
      <p className="mt-1 text-label text-[#999999] normal-case tracking-normal">{role}</p>
    </div>
  );
}
