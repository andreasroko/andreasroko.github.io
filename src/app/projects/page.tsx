import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';
import React from 'react';

export default function ProjectsPage() {
  return (
    <main className="w-[70%] text-white overflow-visible">
      <div className="max-h-[80vh] overflow-y-auto w-full h-auto flex flex-wrap gap-4">
        {projects.map(p => (
          <div key={p.id} className="max-w-[300px]">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </main>
  );
}
