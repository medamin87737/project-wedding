import Image from "next/image";
import ScrollSection from "./ScrollSection";

interface ZenImagePageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function ZenImagePage({ src, alt, priority = false }: ZenImagePageProps) {
  return (
    <ScrollSection className="zen-image-page" fullHeight>
      <div className="zen-image-page__image">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          priority={priority}
          sizes="100vw"
        />
      </div>
      <div className="zen-image-page__veil" aria-hidden="true" />
    </ScrollSection>
  );
}
