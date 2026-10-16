import Link from 'next/link';
import { SITE_DESCRIPTION, pageMetadata } from '../data/site';

export const metadata = pageMetadata('Page not found', SITE_DESCRIPTION);

export default function NotFound() {
  return (
    <main className="w-full flex flex-col items-center justify-center text-white text-center px-4">
      <div className="w-full max-w-md flex flex-col items-center border-t border-b border-white py-6">
        <p className="text-5xl font-light tracking-[0.3em] pl-[0.3em]">404</p>
        <h2 className="text-sm tracking-widest mt-3 text-white/80">THIS PAGE DOESN&apos;T EXIST</h2>
      </div>
      <Link href="/" className="mt-10 text-sm sm:text-base px-4 py-2.5 sm:py-2 border border-white rounded transition-colors hover:bg-white hover:text-black">
        BACK TO HOME
      </Link>
    </main>
  );
}
