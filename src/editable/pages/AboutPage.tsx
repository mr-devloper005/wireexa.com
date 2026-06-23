import Link from 'next/link'
import { ArrowUpRight, BarChart3, Compass, Globe2, Megaphone, Radio, ShieldCheck, Target, TrendingUp, Zap } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const stats = [
  { value: '12,000+', label: 'Media outlets & newsrooms' },
  { value: '60+', label: 'Countries reached' },
  { value: '98%', label: 'Verified delivery rate' },
  { value: '3.4M', label: 'Monthly readers' },
]

const reasons = [
  { icon: Megaphone, title: 'End-to-end distribution', body: 'From a single submission, releases flow to journalists, editors, syndication partners, and category feeds.' },
  { icon: Globe2, title: 'Global syndication', body: 'Reach regional and international media with routing that matches each story to the right audience.' },
  { icon: ShieldCheck, title: 'Newsroom-grade trust', body: 'Clean formatting and verified delivery keep your brand credible with the outlets that matter.' },
  { icon: Zap, title: 'Fast indexing', body: 'Every release is built to be picked up quickly by search engines and news aggregators.' },
  { icon: BarChart3, title: 'Visibility you can see', body: 'Understand where coverage lands and how reach compounds across the network.' },
  { icon: Target, title: 'Targeted outreach', body: 'Category-led delivery means each announcement meets readers who already care about the beat.' },
]

const impact = [
  { value: '5x', label: 'Average pickup vs. a single outlet' },
  { value: '24/7', label: 'Continuous distribution & indexing' },
  { value: '40%', label: 'Faster time from draft to coverage' },
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[var(--slot4-accent)]/12 blur-3xl wx-float" />
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[var(--slot4-accent-2)]/12 blur-3xl wx-float" style={{ animationDelay: '1s' }} />
          <div className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent-strong)]"><Radio className="h-3.5 w-3.5" /> {pagesContent.about.badge}</span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.04em] sm:text-6xl">{pagesContent.about.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
          </div>
        </section>

        {/* Media reach stats */}
        <section className="mx-auto max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8">
          <dl className="-mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--editable-border)] shadow-[0_30px_70px_-40px_rgba(20,18,80,0.5)] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} data-reveal className="bg-[var(--slot4-surface-bg)] p-7 text-center">
                <dt className="text-3xl font-black tracking-[-0.03em] text-[var(--slot4-accent)] sm:text-4xl">{stat.value}</dt>
                <dd className="mt-2 text-sm font-medium text-[var(--slot4-muted-text)]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Mission + Vision */}
        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-2">
            <div data-reveal="left" className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--slot4-signal-gradient)] text-white"><Compass className="h-6 w-6" /></span>
              <h2 className="mt-6 text-2xl font-black tracking-[-0.03em] sm:text-3xl">Our mission</h2>
              <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">To give every brand a direct line to the world&apos;s newsrooms — making press release distribution, news syndication, and media outreach simple, measurable, and genuinely effective.</p>
            </div>
            <div data-reveal="right" className="wx-on-dark rounded-[2rem] bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[var(--slot4-accent-2)]"><TrendingUp className="h-6 w-6" /></span>
              <h2 className="mt-6 text-2xl font-black tracking-[-0.03em] sm:text-3xl">Our vision</h2>
              <p className="mt-4 text-base leading-8 text-white/65">A media landscape where great stories are never lost to noise — where distribution, discovery, and lasting visibility live in one connected platform built for modern communications teams.</p>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="bg-[var(--slot4-surface-bg)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div data-reveal className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Why choose us</p>
              <h2 className="mt-3 text-3xl font-black leading-[1.08] tracking-[-0.035em] sm:text-[2.6rem]">Everything you need to put a story on the wire.</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reasons.map((item, index) => (
                <div key={item.title} data-reveal style={{ ['--reveal-delay' as string]: `${(index % 3) * 90}ms` }} className="wx-lift rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><item.icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-lg font-bold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand growth + Industry impact */}
        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div data-reveal="left">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Brand growth & industry impact</p>
              <h2 className="mt-3 text-3xl font-black leading-[1.08] tracking-[-0.035em] sm:text-[2.6rem]">Coverage that compounds into reputation.</h2>
              <p className="mt-5 text-base leading-8 text-[var(--slot4-muted-text)]">Distribution is only the beginning. As releases syndicate and stay searchable, brand visibility builds steadily — turning individual announcements into a durable presence across the media ecosystem.</p>
              <Link href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-strong)]">Start growing your reach <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div data-reveal="right" className="grid gap-4">
              {impact.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6">
                  <span className="text-3xl font-black tracking-[-0.03em] text-[var(--slot4-accent)] sm:text-4xl">{item.value}</span>
                  <span className="text-right text-sm font-medium text-[var(--slot4-muted-text)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--slot4-page-bg)] pb-20">
          <div className="mx-auto max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8">
            <div data-reveal="scale" className="wx-on-dark relative overflow-hidden rounded-[2.5rem] bg-[image:var(--slot4-signal-gradient)] px-8 py-14 text-white sm:px-12">
              <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <h2 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-[-0.03em] sm:text-4xl">Ready to amplify your next announcement with {SITE_CONFIG.name}?</h2>
                  <p className="mt-3 max-w-xl text-white/80">Join the brands distributing smarter, syndicating wider, and growing visibility every week.</p>
                </div>
                <Link href="/signup" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[var(--slot4-accent-strong)] transition hover:-translate-y-0.5">Get started free <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
