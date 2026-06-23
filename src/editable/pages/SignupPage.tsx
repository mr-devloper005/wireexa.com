import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Radio, Rocket, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Create account', description: pagesContent.auth.signup.metadataDescription })
}

const features = [
  'Distribute press releases in minutes',
  'Syndicate news across 12,000+ outlets',
  'Category routing for targeted reach',
  'Evergreen, searchable coverage archive',
  'Track visibility as it compounds',
]

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid max-w-[1120px] gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          {/* Form */}
          <div className="order-2 flex flex-col justify-center rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_30px_80px_-50px_rgba(20,18,80,0.6)] sm:p-12 lg:order-1">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent-strong)]"><Sparkles className="h-3 w-3" /> {pagesContent.auth.signup.badge}</span>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.03em]">{pagesContent.auth.signup.formTitle}</h1>
            <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">No credit card required. Be ready to distribute in minutes.</p>
            <EditableLocalSignupForm />
            <p className="mt-6 border-t border-[var(--editable-border)] pt-6 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>

          {/* Benefits panel */}
          <aside className="wx-on-dark relative order-1 overflow-hidden rounded-[2rem] bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-10 lg:order-2">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/30 blur-3xl wx-float" />
            <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[var(--slot4-accent-2)]/20 blur-3xl wx-float" style={{ animationDelay: '1.1s' }} />
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-lg font-extrabold"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10"><Radio className="h-5 w-5" /></span> {SITE_CONFIG.name}</span>
              <h2 className="mt-9 text-3xl font-black leading-[1.08] tracking-[-0.03em] sm:text-4xl">{pagesContent.auth.signup.title}</h2>
              <p className="mt-5 max-w-md text-base leading-8 text-white/65">{pagesContent.auth.signup.description}</p>
              <ul className="mt-8 grid gap-3">
                {features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-medium text-white/85">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--slot4-accent-2)]" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--slot4-signal-gradient)]"><Rocket className="h-5 w-5" /></span>
                <p className="text-sm font-medium text-white/75">Join thousands of brands growing reach every week.</p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
