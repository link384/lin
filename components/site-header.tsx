"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, TreePine } from "lucide-react"

const navLinks = [
  { label: "Producto", href: "#producto" },
  { label: "Funciones", href: "#funciones" },
  { label: "Modalidades de pago", href: "#precios" },
  { label: "Tipos de instalación", href: "#tipos-instalacion" },
]

// Muestra el ícono navideño desde el 15 hasta el 26 de diciembre y lo retira al pasar la fecha.
function isChristmasSeason(date: Date) {
  const month = date.getMonth() // 11 = diciembre
  const day = date.getDate()
  return month === 11 && day >= 15 && day <= 26
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [christmas] = useState(() => isChristmasSeason(new Date()))

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#" className="relative flex items-center gap-2" aria-label="Uplink inicio">
          <Image
            src="/uplink-logo.png"
            alt="Uplink"
            width={260}
            height={70}
            className="shiny-logo h-11 w-auto sm:h-12 md:h-14 lg:h-16"
            priority
          />
          {christmas && (
            <TreePine
              className="absolute -right-3 -top-2 h-5 w-5 rotate-12 text-green-600 sm:h-6 sm:w-6"
              aria-hidden="true"
            />
          )}
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button nativeButton={false} render={<a href="#precios">Ver modalidades de pago</a>} />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button
                nativeButton={false}
                render={
                  <a href="#precios" onClick={() => setOpen(false)}>
                    Ver modalidades de pago
                  </a>
                }
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
