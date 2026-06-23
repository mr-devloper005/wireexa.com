import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

function rawText(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  )
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const clean = rawText(post).replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Newsroom'
}

export function getEditableReadTime(post?: SitePost | null) {
  const words = rawText(post).replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  return `${Math.max(2, Math.round(words / 200) || 3)} min read`
}

export function getEditableDate(post?: SitePost | null) {
  const raw = post?.publishedAt || post?.createdAt
  if (!raw) return ''
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

function CategoryTag({ post }: { post: SitePost }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--slot4-panel-bg)] px-3 py-1 text-[11px] font-bold text-[var(--slot4-page-text)]">
      {getEditableCategory(post)}
    </span>
  )
}

function MetaRow({ post }: { post: SitePost }) {
  const date = getEditableDate(post)
  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[var(--slot4-soft-muted-text)]">
      <CategoryTag post={post} />
      <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {getEditableReadTime(post)}</span>
      {date ? <span className="ml-auto inline-flex items-center gap-1 text-[var(--slot4-accent-strong)]"><CalendarDays className="h-3 w-3" /> {date}</span> : null}
    </div>
  )
}

function ReadMore({ label = 'Read More' }: { label?: string }) {
  return (
    <span className="mt-5 inline-flex w-fit items-center gap-1.5 border-b-2 border-[var(--slot4-page-text)] pb-0.5 text-sm font-bold text-[var(--slot4-page-text)] transition group-hover:border-[var(--slot4-accent)] group-hover:text-[var(--slot4-accent-strong)]">
      {label} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  )
}

/* Large featured card — image-free, dark editorial panel. */
export function EditorialFeatureCard({ post, href, label = 'Lead story' }: { post: SitePost; href: string; label?: string }) {
  const date = getEditableDate(post)
  return (
    <Link href={href} data-reveal className="wx-on-dark group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[var(--slot4-dark-bg)] p-7 text-white sm:p-9">
      <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[var(--slot4-accent)]/30 blur-3xl wx-float" />
      <div className="relative flex flex-wrap items-center gap-2 text-[11px] font-semibold text-white/70">
        <span className="rounded-full bg-white/10 px-3 py-1 text-white">{label}</span>
        <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {getEditableReadTime(post)}</span>
        {date ? <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {date}</span> : null}
      </div>
      <div className="relative mt-8">
        <h3 className="text-2xl font-black leading-[1.1] tracking-[-0.02em] sm:text-4xl">{post.title}</h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">{getEditableExcerpt(post, 160)}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 border-b-2 border-white pb-0.5 text-sm font-bold transition group-hover:border-[var(--slot4-accent)] group-hover:text-[var(--slot4-accent)]">Read More <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  )
}

/* Standard MyDiary-style card — image-free. */
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      data-reveal
      style={{ ['--reveal-delay' as string]: `${(index % 3) * 90}ms` }}
      className={`wx-lift group flex min-w-0 flex-col rounded-[1.5rem] border ${pal.border} bg-[var(--slot4-surface-bg)] p-6`}
    >
      <MetaRow post={post} />
      <h3 className="mt-5 line-clamp-3 text-xl font-extrabold leading-[1.2] tracking-[-0.015em]">{post.title}</h3>
      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120)}</p>
      <ReadMore />
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[auto_1fr] gap-4 border-t border-[var(--editable-border)] py-4 first:border-t-0">
      <span className="text-xl font-black leading-none text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--slot4-soft-muted-text)]">
          <span>{getEditableCategory(post)}</span><span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {getEditableReadTime(post)}</span>
        </div>
        <h3 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug tracking-[-0.01em] transition group-hover:text-[var(--slot4-accent-strong)]">{post.title}</h3>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} data-reveal style={{ ['--reveal-delay' as string]: `${(index % 2) * 90}ms` }} className={`wx-lift group block rounded-[1.5rem] border ${pal.border} bg-[var(--slot4-surface-bg)] p-6 sm:p-7`}>
      <MetaRow post={post} />
      <h2 className="mt-4 text-2xl font-extrabold leading-[1.15] tracking-[-0.02em] transition group-hover:text-[var(--slot4-accent-strong)]">{post.title}</h2>
      <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 170)}</p>
      <ReadMore />
    </Link>
  )
}
