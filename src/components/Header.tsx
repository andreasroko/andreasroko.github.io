"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Hide header completely on home page
  if (pathname === '/' || pathname === '') return null;

  const current = navItems.find(i => i.href === pathname);
  const others = navItems.filter(i => i.href !== pathname);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative flex items-center justify-between gap-3 px-4 py-2 text-white">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#444]">
          <Image src={portraitImg} alt="Andreas Rokopanos portrait" width={40} height={40} />
        </div>
        <h1 className="font-semibold text-base tracking-wider m-0 truncate">{current ? current.label : 'ANDREAS ROKOPANOS'}</h1>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden sm:flex" aria-label="Main navigation">
        {others.map(item => (
          <Link key={item.href} href={item.href} className="mx-2 text-sm px-3 py-2 border border-white rounded transition-colors hover:bg-white hover:text-black">{item.label}</Link>
        ))}
      </nav>

      {/* Mobile navigation */}
      <button
        type="button"
        className="sm:hidden flex items-center justify-center w-10 h-10 border border-white rounded transition-colors hover:bg-white hover:text-black"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMenuOpen(open => !open)}
      >
        {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
      </button>
      {menuOpen && (
        <>
          <div className="sm:hidden fixed inset-0 -z-10" onClick={closeMenu} aria-hidden />
          <nav
            id="mobile-nav"
            className="sm:hidden absolute top-full left-4 right-4 mt-1 flex flex-col overflow-hidden rounded-lg border border-white/15 bg-black/85 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
            aria-label="Main navigation"
          >
            {others.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="px-4 py-3.5 text-sm tracking-widest border-b border-white/10 last:border-b-0 transition-colors hover:bg-white hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </header>
  );
};
