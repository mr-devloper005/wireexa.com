import { slot4BrandConfig } from '@/editable/theme/brand.config'

const brand = slot4BrandConfig.siteName

export const pagesContent = {
  home: {
    metadata: {
      title: 'Press release distribution & news syndication',
      description: 'Distribute press releases to newsrooms, syndicate news across media outlets, and grow brand visibility through one connected media distribution platform.',
      openGraphTitle: 'Media distribution built for modern PR teams',
      openGraphDescription: 'Publish announcements, syndicate news, and reach journalists, editors, and media partners worldwide.',
      keywords: ['press release distribution', 'news syndication', 'media outreach', 'PR campaigns', 'brand visibility'],
    },
    hero: {
      badge: 'Media distribution & newswire platform',
      title: ['Put your story', 'in front of every newsroom that matters.'],
      description: 'Distribute press releases, syndicate announcements, and amplify brand coverage across thousands of media outlets, journalists, and category-led channels — all from one platform.',
      primaryCta: { label: 'Distribute a release', href: '/updates' },
      secondaryCta: { label: 'Browse news media', href: '/updates?category=news-media' },
      searchPlaceholder: 'Search releases, brands, categories, and coverage',
      focusLabel: 'Focus',
      featureCardBadge: 'live on the wire',
      featureCardTitle: 'Your latest releases lead the newsroom in real time.',
      featureCardDescription: 'Fresh announcements stay at the center of discovery while the platform keeps every category and feed in sync.',
    },
    intro: {
      badge: 'Why a media distribution platform',
      title: 'Built for press release distribution, news syndication, and measurable reach.',
      paragraphs: [
        'Modern communications teams need more than a publish button. This platform routes every announcement to the right newsrooms, syndicates it across partner media, and keeps it discoverable long after launch day.',
        'Instead of juggling disconnected tools for distribution, outreach, and archiving, you manage releases, categories, and coverage in one connected workspace controlled from a single panel.',
        'Whether you are announcing a product, a funding round, or a brand milestone, your story reaches journalists, editors, and readers through one consistent distribution layer.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Press-ready formatting for every release across the network.',
        'Category routing for news media, business, and announcements.',
        'Evergreen archive that keeps coverage searchable and indexed.',
        'Fast syndication built for newsrooms and aggregators.',
      ],
      primaryLink: { label: 'Browse the newsroom', href: '/updates' },
      secondaryLink: { label: 'Search coverage', href: '/search' },
    },
    cta: {
      badge: 'Start distributing',
      title: 'Get your next announcement onto the wire today.',
      description: 'Launch a press release, syndicate it across the media network, and watch brand visibility grow through one streamlined distribution experience.',
      primaryCta: { label: 'Create an account', href: '/signup' },
      secondaryCta: { label: 'Talk to the team', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest releases in this section.',
    },
  },
  about: {
    badge: 'About the platform',
    title: `${brand} is the distribution layer between your story and the world's newsrooms.`,
    description: `${brand} helps communications teams distribute press releases, syndicate news, and grow brand visibility through one connected media platform.`,
    paragraphs: [
      'We built a single place to publish announcements, route them to the right media categories, and keep every release discoverable across search and syndication.',
      'From early-stage founders to established brands, teams use the platform to reach journalists, editors, and readers without stitching together a dozen disconnected tools.',
    ],
    values: [
      { title: 'Reach that compounds', description: 'Every release is syndicated and archived so coverage keeps working long after the announcement goes live.' },
      { title: 'Newsroom-ready by default', description: 'Clean formatting, structured categories, and fast indexing make each story easy for editors and aggregators to pick up.' },
      { title: 'Clarity over noise', description: 'A focused workspace for distribution, outreach, and discovery — without the clutter of legacy PR software.' },
    ],
  },
  contact: {
    eyebrow: `Contact ${brand}`,
    title: 'Talk to the distribution desk.',
    description: 'Tell us what you are launching, syndicating, or scaling. We route every request to the right lane — distribution, media partnerships, or platform support — instead of one generic inbox.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search the media archive',
      description: 'Search press releases, news coverage, categories, and media across the distribution network.',
    },
    hero: {
      badge: 'Search the wire',
      title: 'Find releases, coverage, and media faster.',
      description: 'Search by keyword, category, or content type to surface announcements and coverage from every active channel on the network.',
      placeholder: 'Search by headline, brand, topic, or category',
    },
    resultsTitle: 'Latest across the network',
  },
  create: {
    metadata: {
      title: 'Create a release',
      description: 'Draft and submit a new press release or media post for distribution.',
    },
    locked: {
      badge: 'Publisher access',
      title: 'Sign in to distribute a release.',
      description: 'Use your account to open the publishing workspace and prepare a release for distribution across the media network.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Prepare a release for the wire.',
      description: 'Choose a content type, add the details, and shape a clean, press-ready post with summary, source links, and body content.',
    },
    formTitle: 'Release details',
    submitLabel: 'Submit for distribution',
    successTitle: 'Release submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your media distribution workspace.',
      badge: 'Member access',
      title: 'Welcome back to your distribution desk.',
      description: 'Sign in to manage releases, track coverage, and distribute new announcements across the network.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then sign in.',
      success: 'Signed in. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your media distribution account.',
      badge: 'Get started free',
      title: 'Create your account and start distributing.',
      description: 'Open a publisher workspace to draft releases, route them by category, and grow coverage across the media network.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created. Redirecting...',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related coverage',
      fallbackTitle: 'Release details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested coverage',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
