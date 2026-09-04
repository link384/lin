"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"

const slides = [
  {
    src: "/uplink-dashboard.png",
    alt: "Panel de Uplink mostrando ventas, inventario y reportes",
    label: "Panel de control",
  },
  {
    src: "/uplink-pos-terminal.png",
    alt: "Terminal de punto de venta de Uplink en una tablet",
    label: "Punto de venta",
  },
  {
    src: "/uplink-inventory.png",
    alt: "Gestión de inventario en tiempo real con Uplink",
    label: "Inventario",
  },
  {
    src: "/uplink-reports.png",
    alt: "Reportes y analíticas de ventas de Uplink",
    label: "Reportes",
  },
  {
    src: "/uplink-checkout.png",
    alt: "Cobro con terminal de pago usando Uplink",
    label: "Cobros",
  },
]

export function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => setReduceMotion(mediaQuery.matches)
    updateMotion()
    mediaQuery.addEventListener("change", updateMotion)
    return () => mediaQuery.removeEventListener("change", updateMotion)
  }, [])

  useEffect(() => {
    if (isPaused || reduceMotion) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => window.clearInterval(id)
  }, [isPaused, reduceMotion])

  useEffect(() => {
    const node = carouselRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsPaused(!entry.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const visibleSlides = useMemo(
    () => new Set([active, (active + 1) % slides.length, (active - 1 + slides.length) % slides.length]),
    [active],
  )

  return (
    <div
      ref={carouselRef}
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
        {slides.map((slide, index) => {
          const isVisible = visibleSlides.has(index)
          const isActive = index === active

          return (
            <div
              key={slide.src}
              className={`absolute inset-0 ${reduceMotion ? "" : "transition-all duration-[900ms] ease-out"}`}
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1) translateX(0)" : "scale(1.05) translateX(4%)",
              }}
              aria-hidden={!isActive}
            >
              {isVisible ? (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 80vw, 50vw"
                  priority={index === 0}
                />
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full border border-border/40 bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                {slide.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Mostrar ${slide.label}`}
            aria-current={index === active}
            className="min-h-11 min-w-11 rounded-full p-4 transition-all duration-500 motion-reduce:transition-none"
            style={{
              width: index === active ? "1.75rem" : "0.5rem",
              backgroundColor:
                index === active
                  ? "var(--color-primary)"
                  : "var(--color-border)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
