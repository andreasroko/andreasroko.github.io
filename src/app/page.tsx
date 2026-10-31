"use client";
import './home.animations.css';
import Image from "next/image";
import portraitImg from '../../public/portrait.webp'

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-dvh relative text-white text-center flex-col w-full px-4">
      <Image src={portraitImg} alt="Andreas Rokopanos" className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full object-cover border-2 border-white shadow-lg" />
      <div className="animate-line" />
      <div className="w-full max-w-md sm:w-[60%] md:w-[45%] md:max-w-none flex flex-col items-center animate-expand">
        <h1 className="text-xl sm:text-2xl tracking-[0.15em] sm:tracking-widest">ANDREAS ROKOPANOS</h1>
        <p className="text-xs sm:text-sm tracking-wide mt-2">SOFTWARE ENGINEER</p>
      </div>
      <p className="max-w-md mt-8 sm:mt-10 text-sm sm:text-base leading-relaxed text-white/80 animate-fade-up">
        Software engineer at Skroutz, building features for Greece&apos;s largest e-commerce marketplace.
        I&apos;m also studying for an MSc in Digital Humanities at the University of Athens, with research in
        3D reconstruction and human-computer interaction.
      </p>
    </main>
  );
}
