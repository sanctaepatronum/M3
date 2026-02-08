"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import Container from "@/components/ui/Container";
import SlideIn from "@/components/animations/SlideIn";
import FadeIn from "@/components/animations/FadeIn";

export default function StorySection() {
  const t = useTranslations("about.story");
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || isDraggingProgress) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const seekTo = useCallback((clientX: number) => {
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    video.currentTime = pct * video.duration;
    setProgress(pct * 100);
  }, []);

  const setVolumeTo = useCallback((clientX: number) => {
    const video = videoRef.current;
    const bar = volumeRef.current;
    if (!video || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    video.volume = pct;
    setVolume(pct);
    if (pct === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (video.muted) {
      video.muted = false;
      setIsMuted(false);
    }
  }, []);

  // Mouse drag handlers
  useEffect(() => {
    if (!isDraggingProgress && !isDraggingVolume) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingProgress) seekTo(e.clientX);
      if (isDraggingVolume) setVolumeTo(e.clientX);
    };
    const handleMouseUp = () => {
      setIsDraggingProgress(false);
      setIsDraggingVolume(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingProgress, isDraggingVolume, seekTo, setVolumeTo]);

  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Left: Editorial text */}
          <SlideIn from="left">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                {t("heading")}
              </h2>
              <div className="mt-3 h-px w-16 bg-gradient-to-r from-champagne to-transparent" />

              <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-700">
                <p>{t("paragraph1")}</p>
                <p>{t("paragraph2")}</p>
                <p>{t("paragraph3")}</p>
                <p>{t("paragraph4")}</p>
                <p>{t("paragraph5")}</p>
                <p className="font-medium text-neutral-800">{t("paragraph6")}</p>
              </div>

              {/* Signature */}
              <div className="mt-10 border-t border-neutral-200 pt-6">
                <p className="font-heading text-lg font-semibold text-neutral-900">
                  {t("signature_name")}
                </p>
                <p className="text-sm tracking-wide text-champagne">
                  {t("signature_title")}
                </p>
              </div>

              {/* Footnote */}
              <p className="mt-8 text-sm leading-relaxed text-neutral-500 italic">
                {t("footnote")}
              </p>
            </div>
          </SlideIn>

          {/* Right: Video */}
          <FadeIn delay={0.3}>
            <div className="group/video relative mt-[8rem]">
              <video
                ref={videoRef}
                src="/videos/about-story.mp4"
                className="aspect-[3/4] w-full rounded-sm object-cover"
                autoPlay
                muted
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
              />

              {/* Controls bar — overlays bottom of video, visible on hover */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 rounded-b-sm bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 pb-2.5 pt-6 opacity-0 transition-opacity duration-300 group-hover/video:opacity-100">
                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  className="text-champagne/70 transition-colors hover:text-champagne"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                {/* Progress bar */}
                <div
                  ref={progressRef}
                  className="group relative flex-1 cursor-pointer py-1.5"
                  onMouseDown={(e) => {
                    setIsDraggingProgress(true);
                    seekTo(e.clientX);
                  }}
                >
                  <div className="h-1 w-full rounded-full bg-white/10">
                    <div
                      className="relative h-full rounded-full bg-champagne/60 transition-colors group-hover:bg-champagne"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute top-1/2 right-0 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-champagne opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                </div>

                {/* Mute / Unmute */}
                <button
                  onClick={toggleMute}
                  className="text-champagne/70 transition-colors hover:text-champagne"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Volume slider */}
                <div
                  ref={volumeRef}
                  className="group relative w-16 cursor-pointer py-1.5"
                  onMouseDown={(e) => {
                    setIsDraggingVolume(true);
                    setVolumeTo(e.clientX);
                  }}
                >
                  <div className="h-1 w-full rounded-full bg-white/10">
                    <div
                      className="relative h-full rounded-full bg-champagne/60 transition-colors group-hover:bg-champagne"
                      style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                    >
                      <div className="absolute top-1/2 right-0 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-champagne opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative accent frame */}
              <div className="absolute -top-4 -right-4 h-full w-full rounded-sm border-2 border-champagne/15 pointer-events-none" />
              {/* Magenta accent */}
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-sm bg-magenta/10 pointer-events-none" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
