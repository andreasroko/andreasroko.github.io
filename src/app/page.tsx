"use client";
import './home.animations.css';
import Image from "next/image";
import Link from "next/link";
import portraitImg from '../../public/portrait.jpeg'

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen relative text-white text-center flex-col w-full">
      <Image src={portraitImg} alt="My Portrait" className="w-[150px] h-[150px] rounded-full object-cover border-2 border-white shadow-lg" />
      <div className="animate-line" />
      <div className="w-2/5 md:w-[45%] flex flex-col items-center border-t border-b border-white animate-expand">
        <h1 className="text-2xl tracking-widest">ANDREAS ROKOPANOS</h1>
        <p className="text-sm tracking-wide mt-2">ELECTRICAL AND COMPUTER ENGINEER</p>
      </div>
      <div className="pt-6 flex gap-3 mt-6">
        <Link href="/resume" className="text-base px-4 py-2 border border-white rounded transition-colors hover:bg-white hover:text-black">RESUME</Link>
        <Link href="/projects" className="text-base px-4 py-2 border border-white rounded transition-colors hover:bg-white hover:text-black">PROJECTS</Link>
        <Link href="/contact" className="text-base px-4 py-2 border border-white rounded transition-colors hover:bg-white hover:text-black">CONTACT</Link>
      </div>
    </main>
  );
}
