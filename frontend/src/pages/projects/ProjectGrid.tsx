import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid({ projects }: { projects: Project[] }) {
    return (
        <section className="py-20 relative min-h-screen">
            <div className="container max-w-5xl">
                <div className="flex flex-col gap-12">
                    {projects.map((project) => (
                        <ProjectCard key={project.key} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
