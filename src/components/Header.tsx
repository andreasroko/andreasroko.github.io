"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import portraitImg from '../../public/portrait.jpeg';

export const Header: React.FC = () => {
  return (
    <header className={styles.headerRoot}>
      <div className={styles.leftGroup}>
        <div className={styles.portraitWrapper}>
          <Image src={portraitImg} alt="Andreas Rokopanos portrait" width={40} height={40} />
        </div>
        <h1 className={styles.siteTitle}>ANDREAS ROKOPANOS</h1>
      </div>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.navLink}>HOME</Link>
        <Link href="/resume" className={styles.navLink}>RESUME</Link>
        <Link href="/projects" className={styles.navLink}>PROJECTS</Link>
        <Link href="/contact" className={styles.navLink}>CONTACT</Link>
      </nav>
    </header>
  );
};
