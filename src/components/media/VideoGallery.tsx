import Link from "next/link";
import {
  FEATURED_VIDEOS,
  GRAMSOOTRA_VIDEO_ID,
  YOUTUBE_CHANNEL_URL,
  type FeaturedVideo,
} from "@/lib/videos";
import { GRAMSOOTRA_URL } from "@/lib/constants";
import { EYEBROW_GREEN, HIGHLIGHT_PURPLE } from "@/lib/brand-styles";

function VideoEmbed({ video }: { video: FeaturedVideo }) {
  const isGramsootra = video.id === GRAMSOOTRA_VIDEO_ID;

  return (
    <article className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="relative aspect-video bg-[#1A1A1A]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-base font-semibold text-[#1A1A1A] sm:text-lg">
          {video.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#555555]">
          {video.description}
        </p>
        {isGramsootra && (
          <a
            href={GRAMSOOTRA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-brand-purple underline-offset-4 hover:underline"
          >
            Download the GramSootra app →
          </a>
        )}
      </div>
    </article>
  );
}

type VideoGalleryProps = {
  videos?: readonly FeaturedVideo[];
  showViewChannel?: boolean;
  id?: string;
};

export function VideoGallery({
  videos = FEATURED_VIDEOS,
  showViewChannel = true,
  id = "videos",
}: VideoGalleryProps) {
  return (
    <section id={id} className="border-t border-[#EEEEEE] bg-[#FAFAFA]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className={EYEBROW_GREEN}>See it in action</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Machines & livelihoods{" "}
            <span className={HIGHLIGHT_PURPLE}>on the ground</span>
          </h2>
          <p className="mt-4 text-[#555555] sm:text-lg">
            Training, solar looms, and digital tools — from our{" "}
            <Link
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-purple underline-offset-4 hover:underline"
            >
              YouTube channel
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {videos.map((video) => (
            <VideoEmbed key={video.id} video={video} />
          ))}
        </div>

        {videos.length < FEATURED_VIDEOS.length && (
          <p className="mt-8 text-center text-sm text-[#555555]">
            <Link
              href="/impact#videos"
              className="font-semibold text-brand-purple underline-offset-4 hover:underline"
            >
              View all featured videos on Impact →
            </Link>
          </p>
        )}

        {showViewChannel && videos.length >= FEATURED_VIDEOS.length && (
          <p className="mt-8 text-center">
            <Link
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#EEEEEE] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-brand-purple/30 hover:text-brand-purple"
            >
              More on YouTube →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
