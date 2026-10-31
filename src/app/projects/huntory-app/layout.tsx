import { pageMetadata } from '../../../data/site';

// The demo page is a client component, so its metadata lives here.
export const metadata = pageMetadata(
  'Huntory prototype',
  'Interactive design prototype of Huntory, a crowdsourced cultural-heritage inventory mobile app.',
  '/projects/huntory-app',
);

export default function HuntoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="sr-only">Huntory: interactive app prototype by Andreas Rokopanos</h1>
      {children}
    </>
  );
}
