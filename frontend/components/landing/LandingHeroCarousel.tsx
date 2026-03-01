"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function getImageUrl(image: any): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (image.url)
    return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
  if (image.data?.attributes?.url)
    return `${baseUrl}${image.data.attributes.url}`;
  return "";
}

export type HeroSlide = {
  backgroundImage?: any;
  headline?: string;
  ctaLabel?: string;
  ctaLink?: string;
  regulatoryText?: string;
};

export function LandingHeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const count = slides?.length ?? 0;

  const prev = useCallback(() => {
    setCurrent((i) => (i <= 0 ? count - 1 : i - 1));
  }, [count]);
  const next = useCallback(() => {
    setCurrent((i) => (i >= count - 1 ? 0 : i + 1));
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => setCurrent((i) => (i >= count - 1 ? 0 : i + 1)), 6000);
    return () => clearInterval(t);
  }, [count]);

  if (!count) return null;

  const slide = slides[current];
  const bgUrl = slide?.backgroundImage ? getImageUrl(slide.backgroundImage) : null;

  return (
    <div className="relative w-full aspect-[21/9] min-h-[280px] max-h-[500px] overflow-hidden bg-slate-800">
      {bgUrl && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgUrl})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        {slide?.headline && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-4xl mb-6">
            {slide.headline}
          </h2>
        )}
        {(slide?.ctaLabel && slide?.ctaLink) && (
          <Button asChild size="lg" className="bg-primaryBlue hover:bg-primaryBlue/90 font-semibold">
            <Link href={slide.ctaLink}>{slide.ctaLabel}</Link>
          </Button>
        )}
      </div>
      {slide?.regulatoryText && (
        <p className="absolute bottom-3 left-4 text-xs text-white/80 max-w-md">
          {slide.regulatoryText}
        </p>
      )}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
