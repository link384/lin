"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, MessageCircle } from "lucide-react"

// Numero de WhatsApp del agente en Cuba (solo digitos, con codigo de pais).
const WHATSAPP_NUMBER = "19453912178"

const PLAN_IDS = {
  ADVANCED: "advanced",
  ELITE: "elite",
  PREMIUM: "premium",
} as const

const INSTALLATION_TYPES = {
  LOCAL: "local",
  CLOUD: "cloud",
} as const

const INSTALLATION_LABELS = {
  [INSTALLATION_TYPES.LOCAL]: "Local (sin internet)",
  [INSTALLATION_TYPES.CLOUD]: "En la Nube (online 24/7)",
} as const

const CUBA_PROVINCES = [
  "Pinar del Río",
  "Artemisa",
  "La Habana",
  "Mayabeque",
  "Matanzas",
  "Cienfuegos",
  "Villa Clara",
  "Sancti Spíritus",
  "Ciego de Ávila",
  "Camagüey",
  "Las Tunas",
  "Holguín",
  "Granma",
  "Santiago de Cuba",
  "Guantánamo",
]

type WhatsAppLeadDialogProps = {
  open: boolean
  planName: string | null
  planId: string | null
  planPrice?: string
  planPriceNote?: string
  onClose: () => void
}

export function WhatsAppLeadDialog({
  open,
  planName,
  planId,
  planPrice,
  planPriceNote,
  onClose,
}: WhatsAppLeadDialogProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [province, setProvince] = useState("")
  const [installationType, setInstallationType] = useState<string>("")
  const [error, setError] = useState("")
  const isPremiumPlan = planId === PLAN_IDS.PREMIUM
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousOverflowRef = useRef("")

  // Reinicia el formulario y enfoca el primer campo al abrir.
  useEffect(() => {
    if (open) {
      const resetTimer = window.setTimeout(() => {
        setName("")
        setPhone("")
        setAddress("")
        setProvince("")
        setInstallationType("")
        setError("")
      }, 0)
      const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 50)
      return () => {
        window.clearTimeout(resetTimer)
        window.clearTimeout(focusTimer)
      }
    }
  }, [open])

  const effectiveInstallationType = isPremiumPlan
    ? installationType === INSTALLATION_TYPES.LOCAL
      ? ""
      : installationType
    : installationType === INSTALLATION_TYPES.CLOUD
      ? ""
      : installationType

  // Cierra con la tecla Escape y bloquea el scroll mientras el diálogo está abierto.
  useEffect(() => {
    if (!open) return
    previousOverflowRef.current = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflowRef.current
    }
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !address.trim() || !province || !effectiveInstallationType) {
      setError("Por favor completa todos los campos.")
      return
    }

    const message = [
      "*SOLICITUD DE SERVICIO UPLINK*",
      "━━━━━━━━━━━━━━━━━━━━",
      "",
      "*DATOS DEL CLIENTE*",
      `• Nombre: ${name.trim()}`,
      `• Móvil: ${phone.trim()}`,
      "",
      "*DIRECCIÓN DE INSTALACIÓN*",
      `• Dirección: ${address.trim()}`,
      `• Provincia: ${province}`,
      "",
      "*TIPO DE INSTALACIÓN*",
      `• Modalidad: ${INSTALLATION_LABELS[effectiveInstallationType as keyof typeof INSTALLATION_LABELS] ?? effectiveInstallationType}`,
      "",
      "*PLAN CONTRATADO*",
      `• Modalidad: ${planName}`,
      ...(planPrice ? [`• Precio: ${planPrice}${planPriceNote ? ` ${planPriceNote}` : ""}`] : []),
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "Gracias. Quedo a la espera de la confirmación de un agente.",
    ].join("\n")

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    // Abre WhatsApp sin depender de una rama específica del navegador.
    const popup = window.open(url, "_blank", "noopener,noreferrer")
    if (!popup) {
      window.location.assign(url)
    }

    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-foreground/50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-dialog-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Modalidad seleccionada
        </span>
        <h2
          id="whatsapp-dialog-title"
          className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground"
        >
          {planName}
          {planPrice ? (
            <span className="ml-2 text-lg font-semibold text-muted-foreground">
              {planPrice}
              {planPriceNote ? ` ${planPriceNote}` : ""}
            </span>
          ) : null}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Completa tus datos y uno de nuestros agentes en Cuba se pondrá en contacto
          contigo por WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-name" className="text-sm font-medium text-foreground">
              Nombre completo
            </label>
            <input
              id="lead-name"
              ref={firstFieldRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. María Rodríguez"
              className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-phone" className="text-sm font-medium text-foreground">
              Número de móvil
            </label>
            <input
              id="lead-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej. +53 5 555 5555"
              className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-address" className="text-sm font-medium text-foreground">
              Dirección
            </label>
            <textarea
              id="lead-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, número y referencias"
              rows={2}
              className="resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-province" className="text-sm font-medium text-foreground">
                Provincia
              </label>
              <select
                id="lead-province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Selecciona una provincia</option>
                {CUBA_PROVINCES.map((provinceName) => (
                  <option key={provinceName} value={provinceName}>
                    {provinceName}
                  </option>
                ))}
              </select>
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-foreground">Tipo de instalación</legend>
            {!isPremiumPlan ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                La instalación en la nube está disponible exclusivamente con el plan Premium.
              </p>
            ) : null}
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { id: INSTALLATION_TYPES.LOCAL, description: "Para trabajar dentro de tu red local." },
                { id: INSTALLATION_TYPES.CLOUD, description: "Acceso desde cualquier lugar con internet." },
              ].map((option) => {
                const optionLabel = INSTALLATION_LABELS[option.id]
                const isDisabled = isPremiumPlan
                  ? option.id === INSTALLATION_TYPES.LOCAL
                  : option.id === INSTALLATION_TYPES.CLOUD

                return (
                  <label
                    key={option.id}
                    className={`flex flex-col gap-1 rounded-xl border p-3 transition-colors ${
                      isDisabled
                        ? "cursor-not-allowed border-border bg-muted/40 opacity-60"
                        : installationType === option.id
                          ? "cursor-pointer border-primary bg-primary/5"
                          : "cursor-pointer border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <input
                        type="radio"
                        name="installation-type"
                        value={option.id}
                        checked={installationType === option.id}
                        onChange={(e) => setInstallationType(e.target.value)}
                        disabled={isDisabled}
                        className="accent-primary"
                      />
                      {optionLabel}
                    </span>
                    <span className="pl-6 text-xs leading-relaxed text-muted-foreground">
                      {option.description}
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          {error ? (
            <p className="text-sm font-medium text-destructive">{error}</p>
          ) : null}

          <Button type="submit" size="lg" className="mt-2 w-full gap-2">
            <MessageCircle className="h-4 w-4" />
            Enviar por WhatsApp
          </Button>
        </form>
      </div>
    </div>
  )
}
