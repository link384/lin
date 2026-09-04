"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"

const features = [
  {
    title: "Punto de venta",
    image: "/features/punto-de-venta.jpg",
    points: [
      "Inicio y cierre de turno sin restricción de fecha",
      "Panel de venta intuitivo y ágil",
      "Gestión integral de operaciones (IPV, pedidos, transacciones, cuentas casa)",
      "Pagos en múltiples monedas",
      "Control de permisos operacionales",
      "Emisión de facturas y gestión de mesas",
    ],
  },
  {
    title: "Control de Inventarios",
    image: "/features/inventario.jpg",
    points: [
      "Gestión detallada de productos por áreas y categorías",
      "Entradas, compras y recepciones",
      "Transferencias internas entre áreas",
      "Mermas y ajustes de inventario",
      "Producciones y control de costos",
    ],
  },
  {
    title: "Control de Gastos e Ingresos",
    image: "/features/contabilidad.jpg",
    points: [
      "Registro diario de movimientos económicos",
      "Reportes automáticos por día",
      "Análisis comparativo de flujo de dinero",
    ],
  },
  {
    title: "Estados Financieros",
    image: "/features/estados-financieros.jpg",
    points: [
      "Estado de resultados",
      "Estado de situación",
      "Generación automática y actualizada",
    ],
  },
  {
    title: "Reportes de Ventas",
    image: "/features/reportes-ventas.jpg",
    points: [
      "Productos vendidos por día y período",
      "Reporte por cantidades y montos",
      "Análisis de rendimiento por producto",
    ],
  },
  {
    title: "Multi-Caja y Multi-Almacén",
    image: "/features/multi-almacen.jpg",
    points: [
      "Creación ilimitada de áreas operativas",
      "Control independiente por caja o área",
      "Integración centralizada de información",
    ],
  },
  {
    title: "Fichas Técnicas de Producción",
    image: "/features/fichas-tecnicas.jpg",
    points: [
      "Creación de fichas técnicas detalladas",
      "Cálculo automático de costo de producción",
      "Control del consumo de inventario por receta",
    ],
  },
  {
    title: "Notificaciones",
    image: "/features/notificaciones.jpg",
    points: [
      "Alertas de cuentas por pagar y por cobrar",
      "Advertencias de stock bajo o agotado",
    ],
  },
]

export function Features() {
  const [selectedFeature, setSelectedFeature] = useState<(typeof features)[number] | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!selectedFeature) {
      triggerRef.current?.focus()
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedFeature(null)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedFeature])

  return (
    <section id="funciones" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Características
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Funciones creadas para tu Negocio
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Uplink reúne las herramientas esenciales para vender, controlar y hacer
            crecer tu negocio sin depender de varios programas.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {features.map((feature, index) => {
            const reversed = index % 2 === 1
            return (
              <div
                key={feature.title}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <div className={reversed ? "md:order-2" : ""}>
                  <h3 className="text-balance font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                    {feature.title}
                  </h3>
                  <ul className="mt-6 flex flex-col gap-3">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-pretty leading-relaxed text-muted-foreground">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={reversed ? "md:order-1" : ""}>
                  <button
                    type="button"
                    className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-card text-left shadow-lg shadow-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget
                      setSelectedFeature(feature)
                    }}
                    aria-label={`Ampliar captura de ${feature.title}`}
                  >
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={`Captura de ${feature.title} en Uplink`}
                      width={1366}
                      height={768}
                      className="h-auto w-full transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedFeature && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 p-4 backdrop-blur-md motion-safe:animate-in motion-safe:fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${selectedFeature.title}`}
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl motion-safe:animate-in motion-safe:zoom-in-95"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              ref={closeButtonRef}
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              onClick={() => setSelectedFeature(null)}
              aria-label="Cerrar vista ampliada"
            >
              <X className="size-5" />
            </button>
            <Image
              src={selectedFeature.image || "/placeholder.svg"}
              alt={`Captura ampliada de ${selectedFeature.title} en Uplink`}
              width={1366}
              height={768}
              className="max-h-[calc(90vh-1rem)] w-full rounded-xl object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      )}
    </section>
  )
}
