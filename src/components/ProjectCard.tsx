"use client";
import React, { useState } from 'react';
import type { Project } from '../data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2 } from 'lucide-react';

interface Props { project: Project; }

const statusStyles: Record<NonNullable<Project['status']>, string> = {
  active: 'text-emerald-300 border-emerald-400/40 [--dot:var(--color-emerald-400)]',
  completed: 'text-sky-300 border-sky-400/40 [--dot:var(--color-sky-400)]',
  experimental: 'text-amber-300 border-amber-400/40 [--dot:var(--color-amber-400)]',
};

const buttonClass = 'flex items-center gap-1.5 text-xs tracking-widest px-3 py-2 border rounded transition-colors';

export const ProjectCard: React.FC<Props> = ({ project }) => {
  const [showImage, setShowImage] = useState(true);
  const titleId = `proj-${project.id}-title`;

  const media = project.image && showImage && (
    <div className="relative w-full aspect-video bg-[#181818] overflow-hidden">
      <Image
        src={project.image}
        alt=""
        fill
        sizes="360px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setShowImage(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" aria-hidden />
    </div>
  );

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border border-white/12 bg-[#111]/85 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-white/30"
      aria-labelledby={titleId}
    >
      {media && (project.demoUrl
        ? <Link href={project.demoUrl} tabIndex={-1} aria-hidden>{media}</Link>
        : media)}

      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex justify-between items-start gap-3">
          <h2 id={titleId} className="text-white text-lg font-semibold tracking-wide leading-snug">{project.title}</h2>
          {project.status && (
            <span className={`flex items-center gap-1.5 shrink-0 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border ${statusStyles[project.status]}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--dot)]" aria-hidden />
              {project.status}
            </span>
          )}
        </div>

        <p className="text-white/75 text-sm leading-relaxed">{project.description}</p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.map(t => (
            <li key={t} className="text-[11px] tracking-wide px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">{t}</li>
          ))}
        </ul>

        {(project.demoUrl || project.repoUrl) && (
          <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
            {project.demoUrl && (
              <Link href={project.demoUrl} className={`${buttonClass} border-white text-white hover:bg-white hover:text-black`} aria-label={`Live demo of ${project.title}`}>
                VIEW DEMO <ArrowUpRight size={14} aria-hidden />
              </Link>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={`${buttonClass} border-white/30 text-white/80 hover:border-white hover:text-white`} aria-label={`Source code for ${project.title}`}>
                <Code2 size={14} aria-hidden /> CODE
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
