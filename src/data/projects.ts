export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
  demoUrl?: string;
  image?: string; // path under public
  status?: 'active' | 'completed' | 'experimental';
}

export const projects: Project[] = [
  {
    id: 'huntory-app',
    title: 'Huntory',
    description: 'Design prototype for a crowdsourced cultural-heritage inventory mobile app. Includes UX flows for contribution, curation, and discovery; mobile mockups and an interactive phone demo.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'HCI', 'Research'],
    repoUrl: undefined,
    demoUrl: '/projects/huntory-app',
    image: '/huntory-mockup.png',
    status: 'experimental'
  }
];
