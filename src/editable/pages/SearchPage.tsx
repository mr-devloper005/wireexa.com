import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Filter, Search, SearchX } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''
const categoryOf = (post: SitePost) => compactRaw(getContent(post).category) || post.tags?.[0] || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const category = categoryOf(post)

  return (
    <Link href={href} data-reveal style={{ ['--reveal-delay' as string]: `${(index % 3) * 80}ms` }} className="wx-lift group flex flex-col rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent-strong)]">{taskLabel}</span>
        {category ? <span className="inline-flex items-center rounded-full border border-[var(--editable-border)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-soft-muted-text)]">{category}</span> : null}
      </div>
      <h2 className="mt-4 line-clamp-3 text-xl font-bold leading-[1.18] tracking-[-0.02em] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
      {summary ? <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{summary}</p> : <div className="flex-1" />}
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent)]">Open result <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)
  const suggestions = ['Funding', 'Product launch', 'Partnership', 'Awards', 'Expansion']

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Search hero */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--slot4-accent-2)]/12 blur-3xl wx-float" />
          <div className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent-strong)]">
              <Search className="h-3.5 w-3.5" /> {pagesContent.search.hero.badge}
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.035em] sm:text-6xl">{pagesContent.search.hero.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.search.hero.description}</p>

            <form action="/search" className="mt-8 max-w-3xl">
              <input type="hidden" name="master" value="1" />
              <div className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-1.5 shadow-[0_18px_44px_-26px_rgba(20,18,80,0.5)]">
                <Search className="ml-3 h-5 w-5 text-[var(--slot4-soft-muted-text)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm font-medium outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                <button className="rounded-full bg-[var(--slot4-accent)] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--slot4-accent-strong)]" type="submit">Search</button>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2.5">
                  <Filter className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                </label>
                <select name="task" defaultValue={task} className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2.5 text-sm font-semibold outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
            </form>

            {!query ? (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">Try</span>
                {suggestions.map((term) => (
                  <Link key={term} href={`/search?master=1&q=${encodeURIComponent(term)}`} className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">{term}</Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">{results.length} results</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/updates" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-2.5 text-sm font-bold transition hover:border-[var(--slot4-accent)]">Browse newsroom <ArrowUpRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-14 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><SearchX className="h-6 w-6" /></div>
              <h2 className="mt-5 text-2xl font-black tracking-[-0.03em]">No matching coverage found</h2>
              <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, category, or content type — or browse the full newsroom.</p>
              <Link href="/updates" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-bold text-white">Browse the newsroom</Link>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
