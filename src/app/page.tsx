import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { ImpactStrip } from "@/components/home/ImpactStrip";
import { Partners } from "@/components/home/Partners";
import { ProgramsTeaser } from "@/components/home/ProgramsTeaser";
import { TrustSnippet } from "@/components/home/TrustSnippet";
import { VideoGallery } from "@/components/media/VideoGallery";
import { HOME_FEATURED_VIDEOS } from "@/lib/videos";

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactStrip />
      <Partners />
      <ProgramsTeaser />
      <VideoGallery
        videos={HOME_FEATURED_VIDEOS}
        showViewChannel={false}
        id="videos"
      />
      <TrustSnippet />
      <FinalCTA />
    </>
  );
}
