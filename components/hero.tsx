import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { HeroCarousel } from "@/components/hero-carousel"

const highlights = [
  "Ventas en segundos",
  "Inventario en tiempo real",
  "Reportes claros",
]

export function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Sistema de punto de venta y gestión
          </span>

          <h1 className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl">
            Controla tu negocio con <span className="shiny-sec">Uplink</span>
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Vende más rápido, controla tu inventario y entiende tus números desde un
            solo lugar. Uplink funciona en instalación local o en la nube, adaptándose
            al ritmo de tu negocio.
          </p>

          <div className="flex flex-wrap gap-4">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#precios">Ver modalidades de pago</a>}
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href="#funciones">Conocer funciones</a>}
            />
          </div>
        </div>

        <HeroCarousel />
      </div>
    </section>
  )
}
