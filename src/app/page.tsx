import BootFilm from "../components/site/BootFilm";
import MetaBar from "../components/site/MetaBar";
import NameMark from "../components/site/NameMark";
import Hero from "../components/site/Hero";
import BrandRow from "../components/site/BrandRow";
import CaseStudyStatus from "../components/site/CaseStudyStatus";
import CaseStudies from "../components/site/CaseStudies";
import ResumeSection from "../components/site/ResumeSection";
import LinksGrid from "../components/site/LinksGrid";
import Footer from "../components/site/Footer";

export default function Home() {
  return (
    <>
      <BootFilm />
      <div className="page" id="top">
      <main className="plateMain">
        <MetaBar />
        <NameMark />
        {/* Hero before BrandRow: the robot bleeds into the brand band; the
            band's rules/design-mark paint above it (z-index contract). */}
        <Hero />
        <BrandRow />
        <div className="content">
          <CaseStudyStatus />
          <CaseStudies />
        </div>
        <ResumeSection />
        <LinksGrid />
      </main>
      <Footer />
      </div>
    </>
  );
}
