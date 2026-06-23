'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowUpRight,
}

const fieldClass = 'rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-soft-muted-text)] focus:border-[var(--slot4-accent)] focus:ring-2 focus:ring-[var(--slot4-accent-soft)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

const steps = ['Choose type', 'Add details', 'Submit']

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--slot4-page-bg)] px-5 py-16 text-[var(--slot4-page-text)] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-8 rounded-[2.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_30px_80px_-50px_rgba(20,18,80,0.6)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="wx-on-dark flex h-full min-h-72 flex-col items-center justify-center gap-4 rounded-[2rem] bg-[var(--slot4-dark-bg)] text-white">
              <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white/10"><Lock className="h-10 w-10 text-[var(--slot4-accent-2)]" /></span>
              <p className="text-sm font-semibold text-white/60">Members-only workspace</p>
            </div>
            <div className="self-center">
              <span className="inline-flex items-center rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent-strong)]">{pagesContent.create.locked.badge}</span>
              <h1 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-0.035em] sm:text-5xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-strong)]">Sign in <ArrowUpRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-bold transition hover:border-[var(--slot4-accent)]">Create account</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-3">
            {steps.map((label, index) => (
              <div key={label} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-xs font-bold text-[var(--slot4-muted-text)]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--slot4-accent)] text-[10px] font-black text-white">{index + 1}</span> {label}
                </span>
                {index < steps.length - 1 ? <span className="hidden h-px w-6 bg-[var(--editable-border)] sm:block" /> : null}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside>
              <span className="inline-flex items-center rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent-strong)]">{pagesContent.create.hero.badge}</span>
              <h1 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-0.035em] sm:text-5xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-transparent bg-[var(--slot4-dark-bg)] text-white' : 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]'}`}>
                      <Icon className={`h-5 w-5 ${active ? 'text-[var(--slot4-accent-2)]' : 'text-[var(--slot4-accent)]'}`} />
                      <span className="mt-3 block text-sm font-bold">{item.label}</span>
                      <span className={`mt-1 block text-xs leading-5 ${active ? 'text-white/60' : 'text-[var(--slot4-soft-muted-text)]'}`}>{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_30px_80px_-50px_rgba(20,18,80,0.6)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-soft)] px-4 py-2 text-xs font-bold text-[var(--slot4-accent-strong)]"><span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--slot4-accent)] text-[10px] font-black text-white">{(session.name[0] || 'U').toUpperCase()}</span> {session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Release headline" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category (e.g. Product, Funding)" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Source or website URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL (optional)" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary / dek" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Full release body, quotes, boilerplate, and contact details" required />
              </div>

              {created ? (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">{pagesContent.create.successTitle}</p>
                    <p className="mt-0.5 text-sm font-medium opacity-80">{created.title}</p>
                  </div>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 text-sm font-bold text-white shadow-[0_16px_34px_-14px_rgba(91,80,245,0.8)] transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-strong)]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
