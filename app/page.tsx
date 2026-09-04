import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { InstallationTypes } from "@/components/installation-types"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <InstallationTypes />
        <Pricing />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}
