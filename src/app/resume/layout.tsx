import { pageMetadata } from '../../data/site';

// The resume page is a client component, so its metadata lives here.
export const metadata = pageMetadata(
  'Resume',
  'Work experience and education of Andreas Rokopanos, software engineer and digital humanities researcher.',
);

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
