import Image from "next/image"

const columns = [
  {
    title: "Producto",
    links: [
      { label: "Funciones", href: "#funciones" },
      { label: "Modalidades de pago", href: "#precios" },
      { label: "Tipos de instalación", href: "#tipos-instalacion" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Uplink", href: "#producto" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Image
              src="/uplink-logo.png"
              alt="Uplink"
              width={260}
              height={70}
              className="shiny-logo h-12 w-auto md:h-14"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sistema de punto de venta y gestión moderno para hacer crecer tu negocio.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Uplink. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">Privacidad</a>
            <a href="#" className="transition-colors hover:text-foreground">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
