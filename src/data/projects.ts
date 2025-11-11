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
    id: 'p1',
    title: 'Portfolio Platform',
    description: 'Personal site generator with markdown + static export.',
    technologies: ['Next.js', 'TypeScript', 'MDX'],
    repoUrl: '#',
    demoUrl: '#',
    image: '/next.svg',
    status: 'active'
  },
  {
    id: 'p2',
    title: 'Edge Chat Widget',
    description: 'Lightweight embeddable chat widget leveraging WebSockets.',
    technologies: ['React', 'WebSocket', 'Node'],
    repoUrl: '#',
    demoUrl: '#',
    image: '/globe.svg',
    status: 'experimental'
  },
  {
    id: 'p3',
    title: '3D Reconstruction Pipeline',
    description: 'Scripts for photogrammetry and mesh optimization.',
    technologies: ['Python', 'Blender', '3D'],
    repoUrl: '#',
    demoUrl: '#',
    image: '/file.svg',
    status: 'completed'
  },
  {
    id: 'p4',
    title: 'Salesforce Automation Toolkit',
    description: 'CLI helpers to streamline org deployments.',
    technologies: ['Salesforce', 'Node', 'CLI'],
    repoUrl: '#',
    status: 'active'
  },
  {
    id: 'p5',
    title: 'Embedded Build System',
    description: 'Dockerized cross-compilation environment for embedded targets.',
    technologies: ['Docker', 'Bash', 'Embedded'],
    repoUrl: '#',
    status: 'completed'
  },
  {
    id: 'p6',
    title: 'HCI Experiment Suite',
    description: 'Set of prototypes for user interaction studies.',
    technologies: ['React', 'UX', 'Analytics'],
    repoUrl: '#',
    status: 'experimental'
  },
  {
    id: 'p7',
    title: 'Realtime Metrics Dashboard',
    description: 'Dashboard with streaming server metrics.',
    technologies: ['React', 'Node', 'Sockets'],
    repoUrl: '#',
    status: 'active'
  },
  {
    id: 'p8',
    title: 'Mesh Optimizer',
    description: 'Tool to decimate and bake textures for 3D assets.',
    technologies: ['3D', 'Automation', 'Python'],
    repoUrl: '#',
    status: 'completed'
  },
  {
    id: 'p9',
    title: 'Express Boilerplate',
    description: 'Opinionated starter with auth, logging, and testing.',
    technologies: ['Express', 'TypeScript', 'JWT'],
    repoUrl: '#',
    status: 'completed'
  },
  {
    id: 'p10',
    title: 'Digital Humanities Viewer',
    description: 'Viewer for annotated 3D cultural heritage models.',
    technologies: ['WebGL', 'React', '3D'],
    repoUrl: '#',
    status: 'active'
  }
];
