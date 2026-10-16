import type { MetadataRoute } from 'next';
import { SITE_PAGES, SITE_URL } from '../data/site';
import { projects } from '../data/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const demoPages = projects
    .map(p => p.demoUrl)
    .filter((url): url is string => !!url && url.startsWith('/'));

  return [...SITE_PAGES, ...demoPages].map(path => ({ url: `${SITE_URL}${path}` }));
}
