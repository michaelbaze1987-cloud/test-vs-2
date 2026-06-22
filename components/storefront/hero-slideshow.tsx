"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HeroSlideshowProps = {
  storeName: string;
  slogan: string;
  slides: string[];
  autoplayMs: number;
};

export function HeroSlideshow({
  storeName,
  slogan,
  slides,
  autoplayMs,
}: HeroSlideshowProps) {
  const safeSlides = slides.length > 0 ? slides : ["https://placehold.co/1600x900/020814/e2e8f0?text=Hero"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeSlides.length);
    }, Math.max(2500, autoplayMs));

    return () => window.clearInterval(interval);
  }, [autoplayMs, safeSlides.length]);

  return (
    <section className="dark-surface hero-shell glass-panel relative min-h-140 overflow-hidden p-0">
      <div className="absolute inset-0">
        {safeSlides.map((slide, index) => (
          <img
            key={`${slide}-${index}`}
            src={slide}
            alt={`Hero slide ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,20,0.88)_0%,rgba(2,8,20,0.62)_44%,rgba(2,8,20,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.22),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.18),transparent_26%)]" />
      </div>

      <div className="relative z-10 flex min-h-140 flex-col justify-between p-8 lg:p-12">
        <div className="max-w-3xl pt-6">
          <p className="badge">Dropshipping IT & Electronique</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            {storeName}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200 md:text-xl">{slogan}</p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            Storefront haute performance inspire par une esthetique aero-spatiale bleue,
            propulse par App Router, Server Actions et un back-office pret a evoluer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary">
              Voir le catalogue
            </Link>
            <Link href="/admin" className="btn btn-secondary">
              Ouvrir l'administration
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pb-4">
          <div className="flex gap-2">
            {safeSlides.map((slide, index) => (
              <button
                key={`${slide}-dot-${index}`}
                type="button"
                aria-label={`Aller au slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-10 bg-cyan-300" : "w-2.5 bg-white/45 hover:bg-white/70"}`}
              />
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">
            {String(activeIndex + 1).padStart(2, "0")} / {String(safeSlides.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
