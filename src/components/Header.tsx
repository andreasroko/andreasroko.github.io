"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
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
    <header className={styles.headerRoot}>
      <div className={styles.leftGroup}>
        <div className={styles.portraitWrapper}>
          <Image src={portraitImg} alt="Andreas Rokopanos portrait" width={40} height={40} />
        </div>
        <h1 className={styles.siteTitle}>{current ? current.label : 'ANDREAS ROKOPANOS'}</h1>
      </div>
      <nav className={styles.nav} aria-label="Main navigation">
        {others.map(item => (
          <Link key={item.href} href={item.href} className={styles.navLink}>{item.label}</Link>
        ))}
      </nav>
    </header>
  );
};
