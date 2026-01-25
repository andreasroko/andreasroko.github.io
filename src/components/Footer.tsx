"use client";
import React from 'react';
import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Paths where we want the footer hidden
  const hiddenPaths = [
    '/projects/huntory-app',
  ];

  const shouldHide = hiddenPaths.some(p => pathname?.startsWith(p));

  if (shouldHide) return null;

  return (
    <div className="absolute bottom-0 pb-4 w-full text-xs tracking-widest text-white/70 flex justify-between items-center">
      <div className="px-6">© ANDREAS ROKOPANOS {new Date().getFullYear()}</div>
      <div className="px-6" aria-label="Photo Location">📌 Tymphi</div>
    </div>
  );
};

export default Footer;
