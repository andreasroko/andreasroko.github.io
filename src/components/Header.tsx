"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import portraitImg from '../../public/portrait.jpeg';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/resume', label: 'RESUME' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/contact', label: 'CONTACT' }
];

export const Header: React.FC = () => {
  const pathname = usePathname();

  // Hide header completely on home page
  if (pathname === '/' || pathname === '') return null;

  const current = navItems.find(i => i.href === pathname);
  const others = navItems.filter(i => i.href !== pathname);

  return (
    <header className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#444]">
          <Image src={portraitImg} alt="Andreas Rokopanos portrait" width={40} height={40} />
        </div>
        <h1 className="text-white font-semibold text-base tracking-wider m-0">{current ? current.label : 'ANDREAS ROKOPANOS'}</h1>
      </div>
      <nav className="flex" aria-label="Main navigation">
        {others.map(item => (
          <Link key={item.href} href={item.href} className="mx-2 text-sm px-3 py-2 border border-white rounded transition-colors hover:bg-white hover:text-black">{item.label}</Link>
        ))}
      </nav>
    </header>
  );
};
