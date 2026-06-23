import Link from 'next/link'
import { Globe2, Mail, Radio, Rss, Send, Share2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'

const socials = [Rss, Mail, Globe2, Share2]

export function EditableFooter() {
  const year = new Date().getFullYear()
  const columns = globalContent.footer.columns
  const resources = [
    { label: 'Search archive', href: '/search' },
    { label: 'Create account', href: '/signup' },
    { label: 'Sign in', href: '/login' },
    { label: 'Submit a release', href: '/create' },
  ]

  return (
    <footer className="mt-auto border-t border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-page-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
              <span className="editorial-brand text-xl font-extrabold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer.description || SITE_CONFIG.description}</p>
            
            <form action="/signup" className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] p-1.5">
              <Mail className="ml-3 h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
              <input name="email" type="email" placeholder="Enter your email..." className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
              <button className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-dark-bg)] px-4 py-2 text-xs font-bold text-white transition hover:bg-[var(--slot4-accent)]"><Send className="h-3.5 w-3.5" /> Subscribe</button>
            </form>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-extrabold">{column.title}</h3>
              <div className="mt-5 grid gap-3">
                {column.links.map((link) => (
                  <Link key={`${column.title}-${link.label}`} href={link.href} className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent-strong)]">{link.label}</Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-extrabold">Resources</h3>
            <div className="mt-5 grid gap-3">
              {resources.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent-strong)]">{link.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--editable-border)] pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-medium text-[var(--slot4-soft-muted-text)]">© {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}</p>
          <p className="text-xs font-medium text-[var(--slot4-soft-muted-text)]">{globalContent.site.domain}</p>
        </div>
      </div>
    </footer>
  )
}
