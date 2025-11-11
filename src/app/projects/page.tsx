import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';
import styles from './projects.module.css';

export default function ProjectsPage() {
  return (
    <main className={styles.container}>
      <div className={styles.scrollable}>
        {projects.map(p => (
          <div key={p.id} className={styles.cardContainer}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </main>
  );
}
