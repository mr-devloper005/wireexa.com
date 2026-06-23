import type { CSSProperties } from 'react'

/**
 * Wireexa "Newsroom OS" design system.
 * Premium media-distribution SaaS palette: electric indigo-violet + cyan signal
 * highlights on a cool near-white, deep-navy ink for dark panels.
 * Every page reads these CSS variables, so the whole site reskins from here.
 */
export const editableRootStyle = {
  // Core surfaces — clean light editorial canvas (MyDiary-style)
  '--slot4-page-bg': '#f4f4f3',
  '--slot4-page-text': '#16140f',
  '--slot4-panel-bg': '#eceae6',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#56544d',
  '--slot4-soft-muted-text': '#8a877f',
  // Accent system — vivid coral signal (distinct from indigo/blue)
  '--slot4-accent': '#ff5436',
  '--slot4-accent-fill': '#ff5436',
  '--slot4-accent-strong': '#df3d1b',
  '--slot4-accent-soft': '#ffe6df',
  '--slot4-accent-2': '#ffb020',
  '--slot4-accent-2-soft': '#ffe9c2',
  // Dark / inverted — warm near-black
  '--slot4-dark-bg': '#16140f',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#ebe9e4',
  // Legacy aliases kept so any older consumer still resolves
  '--slot4-cream': '#f4f4f3',
  '--slot4-warm': '#ffffff',
  '--slot4-lavender': '#ff5436',
  '--slot4-gray': '#eceae6',
  '--slot4-body-gradient': 'linear-gradient(180deg, #f4f4f3 0%, #ffffff 55%, #efedea 100%)',
  '--slot4-signal-gradient': 'linear-gradient(120deg, #ff7a4d 0%, #ff5436 55%, #ffb020 120%)',
  // Layout + shared tokens consumed across pages (previously undefined -> stretched pages)
  '--editable-container': '1200px',
  '--editable-border': 'rgba(22,20,15,0.10)',
  '--editable-page-bg': '#f4f4f3',
  '--editable-page-text': '#16140f',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_18px_50px_-26px_rgba(22,20,15,0.45)]',
  shadowStrong: 'shadow-[0_40px_90px_-44px_rgba(22,20,15,0.5)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(22,20,15,0.05),rgba(22,20,15,0.82))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start',
    rail: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
    minRailCard: 'min-w-0',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.28em]',
    heroTitle: 'text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.6rem]',
    sectionTitle: 'text-3xl font-black leading-[1.05] tracking-[-0.035em] sm:text-[2.7rem]',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-3xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-3xl border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-3xl ${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent)]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-7 py-3.5 text-sm font-bold text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent-strong)]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-bold text-[var(--slot4-dark-bg)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-strong)] hover:text-white`,
  },
  media: {
    frame: `relative overflow-hidden rounded-3xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-36px_rgba(22,20,15,0.55)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'All visible layout decisions belong inside src/editable; keep data, SEO, API, and route logic untouched.',
  'Use a premium media-distribution SaaS system: soft cool surfaces, indigo-violet primary, cyan signal highlights, deep-navy dark panels, rounded cards, and confident whitespace.',
  'Keep dynamic post fetching intact and never replace backend posts with mock arrays.',
  'Use postHref() for all post links so route aliases and task-specific detail pages remain functional.',
  'Lead with clear newsroom hierarchy: scannable headlines, summaries, and category tags over decorative imagery on the homepage.',
  'Branding must remain dynamic from SITE_CONFIG; never hardcode a publication name or logo.',
] as const
