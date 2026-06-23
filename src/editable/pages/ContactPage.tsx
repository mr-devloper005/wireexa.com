'use client'

import { Clock, FileText, Globe2, Mail, MapPin, Megaphone, ShieldCheck, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: Megaphone, title: 'Distribution desk', body: 'Launch a release, schedule a campaign, or ask about syndication reach and category routing.' },
  { icon: Globe2, title: 'Media partnerships', body: 'Newsrooms, aggregators, and outlets looking to receive or syndicate coverage.' },
  { icon: FileText, title: 'Platform support', body: 'Account, publishing, and workspace help for existing members.' },
]

const expectations = [
  { icon: Clock, title: 'Under 4 hours', body: 'Typical first response during business hours.' },
  { icon: ShieldCheck, title: 'Routed correctly', body: 'Your request reaches the right team, not a shared inbox.' },
  { icon: Sparkles, title: 'Real humans', body: 'Specialists who understand distribution and PR.' },
]

const trust = ['12,000+ media outlets', '60+ countries', '98% delivery rate', 'GDPR-aware handling']

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/12 blur-3xl wx-float" />
          <div className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent-strong)]"><Mail className="h-3.5 w-3.5" /> {pagesContent.contact.eyebrow}</span>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.035em] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {trust.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-2 text-xs font-bold text-[var(--slot4-muted-text)]"><ShieldCheck className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-20">
          {/* Left: info + expectations */}
          <aside className="space-y-5">
            <div data-reveal="left" className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7">
              <h2 className="text-lg font-black tracking-[-0.02em]">Reach the right team</h2>
              <div className="mt-5 grid gap-5">
                {desks.map((desk, index) => (
                  <div key={desk.title} className="grid grid-cols-[auto_1fr] gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><desk.icon className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-bold">{desk.title} <span className="ml-1 text-xs font-bold text-[var(--slot4-soft-muted-text)]">0{index + 1}</span></p>
                      <p className="mt-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{desk.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-3 border-t border-[var(--editable-border)] pt-6 text-sm font-semibold text-[var(--slot4-muted-text)]">
                <p className="inline-flex items-center gap-2"><Globe2 className="h-4 w-4 text-[var(--slot4-accent)]" /> {globalContent.site.domain}</p>
                <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--slot4-accent)]" /> Distributed media network · global</p>
              </div>
            </div>

            <div data-reveal="left" className="wx-on-dark rounded-3xl bg-[var(--slot4-dark-bg)] p-7 text-white">
              <h2 className="text-lg font-black tracking-[-0.02em]">What to expect</h2>
              <div className="mt-5 grid gap-4">
                {expectations.map((item) => (
                  <div key={item.title} className="grid grid-cols-[auto_1fr] gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[var(--slot4-accent-2)]"><item.icon className="h-4 w-4" /></span>
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-sm leading-6 text-white/60">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right: form */}
          <div data-reveal="right" className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_30px_80px_-50px_rgba(20,18,80,0.6)] sm:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Send a message</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">{pagesContent.contact.formTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">Tell us about your release, campaign, or partnership and we&apos;ll route it to the right specialist.</p>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
