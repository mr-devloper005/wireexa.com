import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Media distribution & newswire platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Press releases, news syndication, and media outreach',
    primaryLinks: [
      { label: 'Newsroom', href: '/updates' },
      { label: 'News Media', href: '/updates?category=news-media' },
      { label: 'Press Releases', href: '/updates?category=press-release' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Distribute a release', href: '/updates' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Distribution for press releases and syndicated news',
    description: 'Connect your story to the world’s newsrooms with a connected media distribution platform. Publish press releases, syndicate news, and amplify brand coverage across categories, newsrooms, and media outlets.',
    columns: [
      {
        title: 'Distribute',
        links: [
          { label: 'Newsroom', href: '/updates' },
          { label: 'News Media', href: '/updates?category=news-media' },
          { label: 'Business News', href: '/updates?category=business' },
          { label: 'Press Releases', href: '/updates?category=press-release' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for fast, category-led media distribution.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related coverage',
    published: 'Published',
  },
} as const
