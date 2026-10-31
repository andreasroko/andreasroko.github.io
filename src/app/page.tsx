import './home.animations.css';
import Image from "next/image";
import portraitImg from '../../public/portrait.webp'
import { GITHUB_URL, JOB_TITLE, LINKEDIN_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, pageMetadata } from '../data/site';

export const metadata = pageMetadata(SITE_NAME, SITE_DESCRIPTION, '/');

// Structured data (schema.org) so search engines can tie the name, role and
// profiles together. Keep it in sync with the resume and the bio below.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/portrait.webp`,
      jobTitle: JOB_TITLE,
      description: SITE_DESCRIPTION,
      worksFor: { '@type': 'Organization', name: 'Skroutz', url: 'https://www.skroutz.gr' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Aristotle University of Thessaloniki' },
      affiliation: { '@type': 'CollegeOrUniversity', name: 'National and Kapodistrian University of Athens' },
      knowsAbout: ['Software engineering', 'Web development', 'React', 'Digital humanities', '3D reconstruction', 'Human-computer interaction'],
      sameAs: [LINKEDIN_URL, GITHUB_URL],
    },
  ],
};

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-dvh relative text-white text-center flex-col w-full px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
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
