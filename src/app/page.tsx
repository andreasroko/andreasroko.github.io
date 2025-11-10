"use client";
import './page.css';
import Image from "next/image";
import Link from "next/link";
import portraitImg from '../../public/portrait.jpeg'

export default function Home() {
  return (
    <div className='hero-section'>
      <Image src={portraitImg} alt='My Portrait' className='profile-picture' />
      <div className='verticalLine'></div>
      <div className='content'>
        <h1 className='main-title'>ANDREAS ROKOPANOS</h1>
        <p className='subtitle'>
          ELECTRICAL AND COMPUTER ENGINEER
        </p>
      </div>
      <div className='nav-links'>
        <Link href="/resume" className='actionButton'>RESUME</Link>
        <Link href="/projects" className='actionButton'>PROJECTS</Link>
        <Link href="/contact" className='actionButton'>CONTACT</Link>
      </div>
    </div>
  );
}
