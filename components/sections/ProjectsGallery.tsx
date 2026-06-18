import { projects, projectsIntro } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";

export function ProjectsGallery() {
  return (
    <Section id="projects" spacing="lg" label="Projects and web apps">
      <div className="max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow={projectsIntro.eyebrow}
            title={projectsIntro.heading}
          />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {projectsIntro.body}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i * 50, 300)}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
