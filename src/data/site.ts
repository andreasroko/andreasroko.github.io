import type { Metadata } from 'next';

export const SITE_URL = 'https://andreasroko.github.io';
export const SITE_NAME = 'Andreas Rokopanos';
export const SITE_DESCRIPTION = 'Andreas Rokopanos - Software Engineer & Researcher. Resume, projects and contact.';

// Top-level pages, used by the sitemap. Project demo pages come from projects.ts.
export const SITE_PAGES = ['/', '/resume', '/projects', '/contact'];

// Link-preview image (public/og-image.jpg, 1200x630). It has the name and tagline
// baked in; regenerate it if those change.
const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Andreas Rokopanos - Software Engineer & Researcher',
};

// Page title and description, mirrored into Open Graph and Twitter tags so link
// previews match the page. Next replaces (not merges) a parent's `openGraph`, so
// the shared fields, including the image, are repeated here for every page.
export function pageMetadata(title: string, description: string): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} · ${SITE_NAME}`;
  return {
    title,
    description,
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', title: fullTitle, description, images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [OG_IMAGE] },
  };
}
