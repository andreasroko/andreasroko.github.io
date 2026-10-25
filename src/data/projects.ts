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
    image: '/huntory-mockup.svg',
    status: 'experimental'
  },
  {
    id: 'trail-trophy',
    title: 'Trail Trophy',
    description: 'Turns a GPX hike into an interactive 3D miniature terrain diorama, with a glowing trail, summit markers, map and topo themes, real elevation data, an elevation profile and PNG snapshots. No API keys needed.',
    technologies: ['React', 'three.js', 'React Three Fiber', 'Vite', 'Tailwind CSS'],
    repoUrl: 'https://github.com/andreasroko/trail-trophy',
    demoUrl: 'https://andreasroko.github.io/trail-trophy/',
    status: 'active'
  }
];
