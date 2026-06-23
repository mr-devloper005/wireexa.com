import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3, Globe2, Megaphone, Radio, ShieldCheck } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Sign in', description: pagesContent.auth.login.metadataDescription })
}

const benefits = [
  { icon: Megaphone, label: 'Distribute releases across the network' },
  { icon: Globe2, label: 'Syndicate news to 12,000+ outlets' },
  { icon: BarChart3, label: 'Track coverage and growing reach' },
]

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid max-w-[1120px] gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          {/* Brand / benefits panel */}
          <aside className="wx-on-dark relative hidden overflow-hidden rounded-[2rem] bg-[var(--slot4-dark-bg)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/30 blur-3xl wx-float" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[var(--slot4-accent-2)]/20 blur-3xl wx-float" style={{ animationDelay: '1s' }} />
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-lg font-extrabold"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10"><Radio className="h-5 w-5" /></span> {SITE_CONFIG.name}</span>
              <h2 className="mt-10 text-4xl font-black leading-[1.05] tracking-[-0.035em]">{pagesContent.auth.login.title}</h2>
              <p className="mt-5 max-w-md text-base leading-8 text-white/65">{pagesContent.auth.login.description}</p>
            </div>
            <ul className="relative mt-10 grid gap-3">
              {benefits.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm font-medium text-white/80">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[var(--slot4-accent-2)]"><item.icon className="h-4 w-4" /></span>
                  {item.label}
                </li>
              ))}
            </ul>
            <p className="relative mt-8 inline-flex items-center gap-2 text-xs font-semibold text-white/50"><ShieldCheck className="h-4 w-4" /> Trusted by communications teams in 60+ countries</p>
          </aside>

          {/* Form */}
          <div className="flex flex-col justify-center rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_30px_80px_-50px_rgba(20,18,80,0.6)] sm:p-12">
            <span className="inline-flex w-fit items-center rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent-strong)]">{pagesContent.auth.login.badge}</span>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.03em]">{pagesContent.auth.login.formTitle}</h1>
            <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Welcome back. Pick up right where you left off.</p>
            <EditableLocalLoginForm />
            <p className="mt-6 border-t border-[var(--editable-border)] pt-6 text-sm text-[var(--slot4-muted-text)]">New to {SITE_CONFIG.name}? <Link href="/signup" className="font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
