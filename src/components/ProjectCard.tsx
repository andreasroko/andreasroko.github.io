"use client";
import React, { useState } from 'react';
import type { Project } from '../data/projects';
import Image from 'next/image';

interface Props { project: Project; }

export const ProjectCard: React.FC<Props> = ({ project }) => {
  const [showImage, setShowImage] = useState(true);

  return (
    <article className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-[#444]" aria-labelledby={`proj-${project.id}-title`}>
      <div className="flex justify-between items-start gap-2">
        <h2 id={`proj-${project.id}-title`} className="text-white text-lg font-semibold leading-5">{project.title}</h2>
        {project.status && <span className="text-xs uppercase tracking-wider px-2 py-1 rounded-md bg-[#1e1e1e] border border-[#333] text-[#aaa]">{project.status}</span>}
      </div>
      {project.image && showImage && (
        <div className="w-full aspect-[16/9] bg-[#181818] border border-[#222] rounded-md flex items-center justify-center overflow-hidden">
          <Image src={project.image} alt={project.title} fill={false} width={320} height={180} onError={() => setShowImage(false)} />
        </div>
      )}
      <p className="text-[#ccc] text-sm leading-5">{project.description}</p>
      <div className="flex flex-wrap gap-2" aria-label="Technologies used">
        {project.technologies.map(t => <span key={t} className="text-xs tracking-wide px-2 py-1 bg-[#222] border border-[#333] rounded text-[#bbb]">{t}</span>)}
      </div>
      <div className="flex gap-3 mt-2">
        {project.repoUrl && <a className="text-xs px-3 py-1 bg-[#1a1a1a] border border-[#333] text-[#ddd] rounded-md hover:bg-[#2a2a2a] hover:border-[#444] hover:text-white transition" href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Source code for ${project.title}`}>Code</a>}
        {project.demoUrl && <a className="text-xs px-3 py-1 bg-[#1a1a1a] border border-[#333] text-[#ddd] rounded-md hover:bg-[#2a2a2a] hover:border-[#444] hover:text-white transition" href={project.demoUrl} aria-label={`Live demo of ${project.title}`}>Demo</a>}
      </div>
    </article>
  );
};
