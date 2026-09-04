"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { WhatsAppLeadDialog } from "@/components/whatsapp-lead-dialog"

type Feature = string | { text: string; highlight?: boolean }

const PLAN_IDS = {
  ADVANCED: "advanced",
  ELITE: "elite",
  PREMIUM: "premium",
} as const

type Plan = {
  id: (typeof PLAN_IDS)[keyof typeof PLAN_IDS]
  name: string
  price: string
  priceNote: string
  description: string
  features: Feature[]
  cta: string
  featured: boolean
}

const plans: Plan[] = [
  {
    id: PLAN_IDS.ADVANCED,
    name: "Avanzado",
    price: "$100",
    priceNote: "USD mensual",
    description: "El comienzo perfecto para vender más en línea.",
    features: [
      "Instalación, configuración y capacitación inicial",
      "Licencia renovable cada 30 días",
      "Disponible solo en red local",
    ],
    cta: "Elegir Avanzado",
    featured: false,
  },
  {
    id: PLAN_IDS.ELITE,
    name: "Elite",
    price: "$200",
    priceNote: "USD anual",
    description: "Máximo control y personalización.",
    features: [
      "Instalación, configuración y capacitación inicial",
      "Puntos de venta ilimitados",
      "Disponible solo en red local",
    ],
    cta: "Elegir Elite",
    featured: true,
  },
  {
    id: PLAN_IDS.PREMIUM,
    name: "Premium",
    price: "$250",
    priceNote: "USD anual",
    description: "Automatiza y optimiza tu negocio.",
    features: [
      "Instalación, configuración y capacitación inicial",
      "Puntos de venta ilimitados",
      { text: "En la Nube (online 24/7): costo adicional, consultar", highlight: true },
      { text: "Soporte y actualizaciones: costo adicional", highlight: true },
    ],
    cta: "Elegir Premium",
    featured: false,
  },
]

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<
    { id: Plan["id"]; name: string; price: string; priceNote: string } | null
  >(null)

  return (
    <section id="precios" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Modalidades de pago
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Impulsa tu negocio con el plan ideal
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Planes flexibles diseñados para cada etapa de tu negocio. Activa tu punto
            de venta hoy, paga solo por lo que necesitas y escala cuando estés listo.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.featured
                  ? "relative flex flex-col rounded-2xl border-2 border-primary bg-card p-6 shadow-xl shadow-primary/10 sm:p-8"
                  : "relative flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8"
              }
            >
              {plan.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Más recomendado
                </span>
              )}

              <h3 className="font-display text-xl font-bold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

              <div className="mt-6 flex items-end gap-2">
                <span className="font-display text-5xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="mb-1 text-sm font-medium text-muted-foreground">
                  {plan.priceNote}
                </span>
              </div>

              <ul className="mt-8 flex flex-col gap-3">
                {plan.features.map((feature) => {
                  const text =
                    typeof feature === "string" ? feature : feature.text
                  const highlight =
                    typeof feature === "string" ? false : feature.highlight

                  return (
                    <li
                      key={text}
                      className="flex items-start gap-3 text-sm text-foreground"
                    >
                      <span
                        className={
                          highlight
                            ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm shadow-primary/40"
                            : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                        }
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      {highlight ? (
                        <span className="feature-highlight leading-relaxed">
                          {text}
                        </span>
                      ) : (
                        <span className="leading-relaxed">{text}</span>
                      )}
                    </li>
                  )
                })}
              </ul>

              <Button
                size="lg"
                variant={plan.featured ? "default" : "outline"}
                className="mt-8 w-full"
                onClick={() =>
                  setSelectedPlan({
                    id: plan.id,
                    name: plan.name,
                    price: plan.price,
                    priceNote: plan.priceNote,
                  })
                }
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <WhatsAppLeadDialog
        open={selectedPlan !== null}
        planName={selectedPlan?.name ?? null}
        planId={selectedPlan?.id ?? null}
        planPrice={selectedPlan?.price}
        planPriceNote={selectedPlan?.priceNote}
        onClose={() => setSelectedPlan(null)}
      />
    </section>
  )
}
