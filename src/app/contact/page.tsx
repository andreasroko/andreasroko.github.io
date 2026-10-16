import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { pageMetadata } from '../../data/site';

export const metadata = pageMetadata(
  'Contact',
  'Get in touch with Andreas Rokopanos by email, LinkedIn or GitHub.',
);

// Links with an empty href are not rendered.
const EMAIL = 'andreasrokopanos4@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/andreas-rokopanos-107025201/';
const GITHUB_URL = 'https://github.com/andreasroko';

const links = [
  { label: 'EMAIL', href: EMAIL && `mailto:${EMAIL}`, detail: EMAIL, external: false },
  { label: 'LINKEDIN', href: LINKEDIN_URL, detail: 'in/andreas-rokopanos', external: true },
  { label: 'GITHUB', href: GITHUB_URL, detail: 'github.com/andreasroko', external: true },
].filter(l => l.href);

export default function ContactPage() {
  return (
    <main className="w-full flex flex-col items-center justify-center text-white text-center px-4">
      <div className="w-full max-w-md flex flex-col items-center border-t border-b border-white py-6">
        <h2 className="text-2xl tracking-widest">GET IN TOUCH</h2>
        <p className="text-sm tracking-wide mt-2 text-white/80">Open to collaborations, research, and engineering work.</p>
      </div>
      <ul className="mt-8 w-full max-w-md flex flex-col gap-3" aria-label="Contact links">
        {links.map(link => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center justify-between gap-4 px-4 py-3 border border-white rounded transition-colors hover:bg-white hover:text-black"
              aria-label={`${link.label}: ${link.detail}`}
            >
              <span className="text-base tracking-widest">{link.label}</span>
              <span className="flex items-center gap-2 text-sm truncate">
                {link.detail}
                {link.external ? <ArrowUpRight size={16} aria-hidden /> : <Mail size={16} aria-hidden />}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
