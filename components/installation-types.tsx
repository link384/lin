import Image from "next/image"
import { WifiOff, Cloud, Check } from "lucide-react"

const options = [
  {
    label: "Local (sin internet)",
    icon: WifiOff,
    image: "/features/instalacion-local.png",
    imageAlt:
      "Diagrama de instalación local: servidor local conectado a un router y varios dispositivos por red local",
    description:
      "El sistema se instala en una computadora o laptop que estará en su negocio. Ese equipo será el “servidor” del sistema y podrá ser usado tanto como administrador como cajero. No requiere internet para funcionar.",
    points: [
      "Funciona offline (Sin internet)",
      "Se usa desde la PC donde se instala",
      "Puedes conectar varios dispositivos por red local",
      "Si te sales de la red, pierdes conexión",
    ],
  },
  {
    label: "En la Nube (online 24/7)",
    icon: Cloud,
    image: "/features/instalacion-nube.jpg",
    imageAlt:
      "Ilustración de instalación en la nube: una nube conectada a laptop, PC, tablet y teléfono",
    description:
      "El sistema se instala en nuestros servidores en internet. Puedes acceder desde cualquier lugar del país o del mundo. Necesita un dispositivo con internet (PC, laptop, tablet o teléfono).",
    points: [
      "Requiere internet para funcionar",
      "Accede desde cualquier lugar",
      "Compatible con todos tus dispositivos",
      "Ideal para negocios con varias cajas o sucursales",
    ],
  },
]

export function InstallationTypes() {
  return (
    <section
      id="tipos-instalacion"
      className="border-t border-border bg-secondary/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Tipos de instalación
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Elige cómo quieres trabajar
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <div
                key={option.label}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary/5"
              >
                <div className="border-b border-border bg-muted/40">
                  <Image
                    src={option.image || "/placeholder.svg"}
                    alt={option.imageAlt}
                    width={1200}
                    height={800}
                    className="h-56 w-full object-contain p-4 sm:h-64"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-balance font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {option.label}
                    </h3>
                  </div>

                  <p className="mt-5 rounded-xl border-l-4 border-primary bg-primary/5 p-4 text-pretty font-medium leading-relaxed text-foreground">
                    {option.description}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {option.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-pretty font-medium leading-relaxed text-foreground">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
