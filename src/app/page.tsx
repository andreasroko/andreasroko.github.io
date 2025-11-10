"use client";
import './page.css';
import Image from "next/image";
import Link from "next/link";
import portraitImg from '../../public/portrait.jpeg'

export default function Home() {
  const handleResume = () => {
    // TODO: Must show resume information (studies/work1/work2)
  };
  return (
    <div className='hero-section'>
      <div className='overlay'>
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
        <div className='footer'>
          <div className='horizontal-padding-small'>© ANDREAS ROKOPANOS {new Date().getFullYear()}</div>
          <div className='horizontal-padding-small' aria-label='Photo Location'>📌 Tymphi</div>
        </div>
      </div>
    </div>
  );
}
