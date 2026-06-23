'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * CSS-driven motion engine (no framer-motion in this template).
 * - Reveals [data-reveal] elements on scroll via IntersectionObserver.
 * - Re-scans on every route change (usePathname) + a MutationObserver for streamed cards,
 *   plus a fallback timer that force-reveals anything still hidden inside the viewport.
 *   Without this, client-side navigations leave opacity:0 cards permanently invisible.
 * - Renders a top reading-progress bar tied to scroll depth.
 */
export function EditableMotion() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const reveal = (el: Element) => el.classList.add('is-visible')

    if (reduce) {
      document.querySelectorAll('[data-reveal]').forEach(reveal)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer.observe(el))
    }
    scan()

    const mutation = new MutationObserver(() => scan())
    mutation.observe(document.body, { childList: true, subtree: true })

    // Safety net: anything still hidden but already on screen gets revealed.
    const fallback = window.setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) reveal(el)
      })
    }, 1600)

    return () => {
      observer.disconnect()
      mutation.disconnect()
      window.clearTimeout(fallback)
    }
  }, [pathname])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const bar = document.getElementById('wx-reading-progress')
    if (!bar) return
    let frame = 0
    const update = () => {
      frame = 0
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const pct = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0
      bar.style.width = `${pct}%`
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  return <div id="wx-reading-progress" className="wx-progress" aria-hidden="true" />
}
