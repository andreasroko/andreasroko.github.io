"use client";
import React from 'react';
import styles from './ProjectCard.module.css';
import type { Project } from '../data/projects';
import Image from 'next/image';

interface Props { project: Project; }

export const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <article className={styles.card} aria-labelledby={`proj-${project.id}-title`}>
      <div className={styles.headerRow}>
        <h2 id={`proj-${project.id}-title`} className={styles.title}>{project.title}</h2>
        {project.status && <span className={styles.status}>{project.status}</span>}
      </div>
      {project.image && (
        <div className={styles.imageWrapper}>
          <Image src={project.image} alt={project.title} fill={false} width={320} height={180} />
        </div>
      )}
      <p className={styles.description}>{project.description}</p>
      <div className={styles.techList} aria-label="Technologies used">
        {project.technologies.map(t => <span key={t} className={styles.badge}>{t}</span>)}
      </div>
      <div className={styles.actions}>
        {project.repoUrl && <a className={styles.linkBtn} href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Source code for ${project.title}`}>Code</a>}
        {project.demoUrl && <a className={styles.linkBtn} href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${project.title}`}>Demo</a>}
      </div>
    </article>
  );
};
