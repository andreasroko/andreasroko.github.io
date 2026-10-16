import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';
import React from 'react';

export default function ProjectsPage() {
  return (
    <main className="w-full max-w-5xl px-4 text-white overflow-visible">
      <div className="max-h-[calc(100dvh-9rem)] overflow-y-auto w-full py-2">
        <p className="text-center text-sm tracking-widest text-white/70 mb-6">SELECTED WORK IN SOFTWARE, HCI AND DIGITAL HUMANITIES</p>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,300px),360px))] justify-center">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
