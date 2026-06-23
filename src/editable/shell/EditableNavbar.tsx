'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, Radio, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

// MyDiary-style segmented pill navigation.
const segments = [
  { label: 'Home', href: '/' },
  { label: 'Newsroom', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [shrink, setShrink] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const firstName = session?.name?.trim().split(/\s+/)[0] || ''

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => {
    const base = href.split('?')[0]
    if (base === '/') return pathname === '/'
    return pathname === base || pathname.startsWith(`${base}/`)
  }

  return (
    <header data-shrink={shrink} className="wx-header sticky top-0 z-50 bg-[var(--slot4-page-bg)]/85">
      <div className="wx-header-inner mx-auto grid min-h-[84px] max-w-[var(--editable-container)] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 justify-self-start">
          
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
          
          <span className="editorial-brand truncate text-xl font-extrabold text-[var(--slot4-page-text)]">{SITE_CONFIG.name}</span>
        </Link>

        {/* Centered segmented pill */}
        <nav className="hidden items-center gap-1 justify-self-center rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-1.5 shadow-[0_10px_30px_-22px_rgba(22,20,15,0.5)] lg:flex">
          {segments.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${active ? 'bg-[var(--slot4-dark-bg)] text-white' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: auth */}
        <div className="flex items-center justify-end gap-2.5 justify-self-end">
          {session ? (
            <>
              <span className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2 text-sm font-bold text-[var(--slot4-page-text)] sm:inline-flex">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--slot4-accent)] text-[11px] font-black text-white">{(firstName[0] || 'U').toUpperCase()}</span>
                {firstName || 'Member'}
              </span>
              <button type="button" onClick={logout} className="hidden items-center gap-1.5 rounded-full bg-[var(--slot4-dark-bg)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--slot4-accent)] sm:inline-flex">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden rounded-full px-4 py-2.5 text-sm font-bold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent-strong)] sm:block">Login</Link>
              <Link href="/signup" className="hidden rounded-full bg-[var(--slot4-dark-bg)] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent)] sm:inline-block">Sign Up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-5 lg:hidden">
          <div className="grid gap-1.5">
            {segments.map((link) => (
              <Link key={`m-${link.href}`} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive(link.href) ? 'bg-[var(--slot4-dark-bg)] text-white' : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-2.5 border-t border-[var(--editable-border)] pt-4">
            {session ? (
              <>
                <span className="rounded-2xl bg-[var(--slot4-panel-bg)] px-4 py-3 text-sm font-bold">Signed in as {firstName || 'Member'}</span>
                <button type="button" onClick={logout} className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--slot4-dark-bg)] px-4 py-3 text-sm font-bold text-white"><LogOut className="h-4 w-4" /> Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-2xl border border-[var(--editable-border)] px-4 py-3 text-center text-sm font-bold">Login</Link>
                <Link href="/signup" className="rounded-2xl bg-[var(--slot4-dark-bg)] px-4 py-3 text-center text-sm font-bold text-white">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
