import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/visual/GrainOverlay";

import { Hero } from "@/components/sections/Hero";
import { OriginNepal } from "@/components/sections/OriginNepal";
import { EducationArc } from "@/components/sections/EducationArc";
import { TheMove } from "@/components/sections/TheMove";
import { MscUK } from "@/components/sections/MscUK";
import { WorkExperience } from "@/components/sections/WorkExperience";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { UkdigihubStory } from "@/components/sections/UkdigihubStory";
import { Philosophy } from "@/components/sections/Philosophy";
import { FutureGoals } from "@/components/sections/FutureGoals";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Preloader />
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />

      <main id="main" className="relative z-10">
        {/* 01 — Hero / Identity */}
        <Hero />
        {/* 02 — Origins: Nepal */}
        <OriginNepal />
        {/* 03 — Education Arc: BBA + MBA */}
        <EducationArc />
        {/* 04 — The Move: Nepal → UK */}
        <TheMove />
        {/* 05 — MSc Digital Marketing, UK */}
        <MscUK />
        {/* 06 — Real Work & Experience */}
        <WorkExperience />
        {/* 07 — Projects Gallery */}
        <ProjectsGallery />
        {/* 08 — UKDIGIHUB Founder Story */}
        <UkdigihubStory />
        {/* 09 — Philosophy / Interests / Vision */}
        <Philosophy />
        {/* 10 — Future Goals */}
        <FutureGoals />
        {/* 11 — Contact / Collaboration */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
