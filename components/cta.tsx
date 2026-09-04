import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section id="contacto" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center md:px-16">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute right-[-10%] top-[-40%] h-72 w-72 rounded-full bg-primary-foreground blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              ¿Listo para modernizar tu negocio?
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/80">
              Elige tu modalidad de pago y uno de nuestros agentes en Cuba se pondrá en
              contacto contigo para vender, controlar y hacer crecer tu negocio.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                nativeButton={false}
                render={<a href="#precios">Ver modalidades de pago</a>}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
