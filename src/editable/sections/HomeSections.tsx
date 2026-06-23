import Link from 'next/link'
import { ArrowUpRight, Building2, CheckCircle2, Cpu, Globe2, HeartPulse, LineChart, Megaphone, Newspaper, Sparkles, Trophy } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { mediaDistributionCategories } from '@/editable/content/categories.config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { CompactIndexCard, EditorialFeatureCard, postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

const categoryIcons: Record<string, typeof Newspaper> = {
  'news-media': Newspaper,
  business: Building2,
  technology: Cpu,
  finance: LineChart,
  health: HeartPulse,
  sports: Trophy,
  'press-release': Megaphone,
  'public-relations': Globe2,
}

const filterPills = [
  { label: 'All', slug: '' },
  { label: 'News Media', slug: 'news-media' },
  { label: 'Business', slug: 'business' },
  { label: 'Technology', slug: 'technology' },
  { label: 'Press Release', slug: 'press-release' },
]

/* ---------- Hero: "Today's top releases at a glance" + card rail ---------- */
export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title
  const titleHead = Array.isArray(heroTitle) ? heroTitle[0] : heroTitle
  const titleTail = Array.isArray(heroTitle) ? heroTitle.slice(1).join(' ') : ''
  const rail = posts.slice(0, 8)

  return (
    <section className="relative overflow-hidden bg-[var(--slot4-page-bg)]">
      <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[360px] w-[680px] -translate-x-1/2 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 top-40 h-48 w-48 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl wx-float" />
      <div className="pointer-events-none absolute -right-10 top-24 h-48 w-48 rounded-full bg-[var(--slot4-accent-2)]/12 blur-3xl wx-float" style={{ animationDelay: '1.1s' }} />
      <div className={`${dc.shell.section} relative pt-16 sm:pt-20 lg:pt-24`}>
        <div className="wx-seq mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent-strong)]">
            <Sparkles className="h-3.5 w-3.5" /> {pagesContent.home.hero.badge}
          </span>
          <h1 className="mt-7 text-4xl font-black leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-[4.4rem]">
            {titleHead}{titleTail ? <> <span className="text-[var(--slot4-accent)]">{titleTail}</span></> : null}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={pagesContent.home.hero.primaryCta.href} className={dc.button.primary}>{pagesContent.home.hero.primaryCta.label} <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href={pagesContent.home.hero.secondaryCta.href} className={dc.button.secondary}>{pagesContent.home.hero.secondaryCta.label}</Link>
          </div>
        </div>
      </div>

      {/* Story rail */}
      {rail.length ? (
        <div className="relative mt-14 pb-16 sm:mt-16 lg:pb-20">
          <div className="flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="shrink-0 sm:w-[max(0px,calc((100vw-var(--editable-container))/2))]" />
            {rail.map((post, index) => (
              <div key={post.id} className="w-[300px] shrink-0 snap-start">
                <RailPostCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              </div>
            ))}
            <div className="shrink-0 sm:w-[max(0px,calc((100vw-var(--editable-container))/2))]" />
          </div>
        </div>
      ) : <div className="pb-12" />}
    </section>
  )
}

/* ---------- Blog Categories grid ---------- */
export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const cats = mediaDistributionCategories.defaults.slice(0, 5)
  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div data-reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-panel-bg)] px-4 py-1.5 text-xs font-bold text-[var(--slot4-page-text)]"><CheckCircle2 className="h-4 w-4 text-[var(--slot4-accent)]" /> Categories</span>
          <h2 className={`${dc.type.sectionTitle} mt-4`}>Distribute by category</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)]">Route every release to the channels that matter — from breaking news media to targeted press releases.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cats.map((cat, index) => {
            const Icon = categoryIcons[cat.slug] || Newspaper
            const highlight = index === 1
            return (
              <Link
                key={cat.slug}
                href={`${primaryRoute}?category=${cat.slug}`}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${(index % 5) * 80}ms` }}
                className={`wx-lift group flex flex-col rounded-[1.5rem] border p-7 ${highlight ? 'border-transparent bg-[var(--slot4-accent)] text-[var(--slot4-dark-bg)]' : 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]'}`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-full ${highlight ? 'bg-[var(--slot4-dark-bg)] text-white' : 'bg-[var(--slot4-panel-bg)] text-[var(--slot4-accent-strong)]'}`}><Icon className="h-5 w-5" /></span>
                <h3 className="mt-12 text-xl font-extrabold tracking-[-0.02em]">{cat.name}</h3>
                <span className={`mt-3 inline-flex w-fit items-center gap-1.5 border-b-2 pb-0.5 text-sm font-bold ${highlight ? 'border-[var(--slot4-dark-bg)]' : 'border-[var(--slot4-page-text)] group-hover:border-[var(--slot4-accent)] group-hover:text-[var(--slot4-accent-strong)]'}`}>Explore More <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </Link>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href={primaryRoute} className={dc.button.primary}>See all categories <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- Highlight: featured + trending split ---------- */
export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  const trending = posts.slice(1, 6)
  if (!feature) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Featured</p>
          <h2 className={`${dc.type.sectionTitle} mt-2`}>The most recent and trending releases.</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label="On the wire now" />
          <div data-reveal="right" className="rounded-[1.75rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">Trending now</p>
              <Link href={primaryRoute} className="text-xs font-bold text-[var(--slot4-accent-strong)]">View all</Link>
            </div>
            <div className="mt-3">
              {trending.length ? trending.map((post, index) => <CompactIndexCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />) : <p className="py-8 text-sm text-[var(--slot4-soft-muted-text)]">Fresh releases appear here as they go live.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Latest Articles + filter pills ---------- */
export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = (collected.length ? collected : posts).slice(0, 6)
  if (!source.length) return null
  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div data-reveal className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">From the newsroom</p>
          <h2 className={`${dc.type.sectionTitle} mt-2`}>Latest {taskLabel(primaryTask).toLowerCase()}</h2>
        </div>
        <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {filterPills.map((pill, index) => (
            <Link
              key={pill.label}
              href={pill.slug ? `${primaryRoute}?category=${pill.slug}` : primaryRoute}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${index === 0 ? 'bg-[var(--slot4-dark-bg)] text-white' : 'border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-muted-text)] hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent-strong)]'}`}
            >
              {pill.label}
            </Link>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {source.map((post, index) => <RailPostCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
        <div className="mt-12 text-center">
          <Link href={primaryRoute} className={dc.button.secondary}>Browse the full newsroom <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- Closing CTA ---------- */
export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-page-bg)] pb-20">
      <div className={dc.shell.section}>
        <div data-reveal="scale" className="wx-on-dark relative overflow-hidden rounded-[2rem] bg-[var(--slot4-dark-bg)] px-8 py-14 text-center text-white sm:px-12 lg:py-16">
          <div className="pointer-events-none absolute -left-16 bottom-0 h-60 w-60 rounded-full bg-[var(--slot4-accent)]/25 blur-3xl wx-float" />
          <div className="pointer-events-none absolute -right-16 -top-10 h-60 w-60 rounded-full bg-[var(--slot4-accent-2)]/20 blur-3xl wx-float" style={{ animationDelay: '1s' }} />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.home.cta.badge}</p>
            <h2 className="mt-4 text-3xl font-black leading-[1.06] tracking-[-0.03em] sm:text-5xl">{pagesContent.home.cta.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/65">{pagesContent.home.cta.description}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href={pagesContent.home.cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-bold text-[var(--slot4-dark-bg)] transition hover:-translate-y-0.5 hover:bg-white">{pagesContent.home.cta.primaryCta.label} <ArrowUpRight className="h-4 w-4" /></Link>
              <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">{pagesContent.home.cta.secondaryCta.label}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
