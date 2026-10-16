import { pageMetadata } from '../../../data/site';

// The demo page is a client component, so its metadata lives here.
export const metadata = pageMetadata(
  'Huntory prototype',
  'Interactive design prototype of Huntory, a crowdsourced cultural-heritage inventory mobile app.',
);

export default function HuntoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
