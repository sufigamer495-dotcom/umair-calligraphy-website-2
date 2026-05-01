interface ArtworkCardProps {
  image: string;
  caption?: string;
  alt: string;
  onClick?: () => void;
  aspectRatio?: string;
}

export function ArtworkCard({ image, caption, alt, onClick, aspectRatio = "aspect-[3/4]" }: ArtworkCardProps) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className={`${aspectRatio} overflow-hidden bg-[#FAFAFA]`}>
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.03]"
        />
      </div>
      {caption && (
        <p className="mt-3 text-center text-caption text-[#666666]">
          {caption}
        </p>
      )}
    </div>
  );
}
