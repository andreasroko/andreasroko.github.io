import type { Metadata } from 'next';

export const SITE_URL = 'https://andreasroko.github.io';
export const SITE_NAME = 'Andreas Rokopanos';
export const JOB_TITLE = 'Software Engineer';
// Home page title: name plus role, so searches for either match.
export const SITE_TITLE = `${SITE_NAME} · ${JOB_TITLE}`;
export const SITE_DESCRIPTION =
  'Andreas Rokopanos is a software engineer at Skroutz and an MSc student in Digital Humanities, researching 3D reconstruction and HCI. Resume, projects and contact.';

// Profiles that belong to the same person, used by the contact page and the
// structured data on the home page (schema.org `sameAs`).
export const LINKEDIN_URL = 'https://www.linkedin.com/in/andreas-rokopanos-107025201/';
export const GITHUB_URL = 'https://github.com/andreasroko';

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
// `path` sets the canonical URL; GitHub Pages serves each page at both /x and
// /x.html, and the canonical tells search engines which one to index.
export function pageMetadata(title: string, description: string, path?: string): Metadata {
  const isHome = title === SITE_NAME;
  const fullTitle = isHome ? SITE_TITLE : `${title} · ${SITE_NAME}`;
  return {
    title: isHome ? { absolute: SITE_TITLE } : title,
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: {
      type: 'website', siteName: SITE_NAME, locale: 'en_US', title: fullTitle, description, images: [OG_IMAGE],
      ...(path && { url: path }),
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [OG_IMAGE] },
  };
}
