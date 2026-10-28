import { useCallback, useEffect, useState } from "react";
import video01 from "../assets/video/video01mp4.mp4";
import video02 from "../assets/video/video02.mp4";
import video03 from "../assets/video/video03.mp4";

const videos = [
  {
    id: 1,
    eyebrow: "Official Cavalinho",
    title: "Paixão que acelera",
    src: video01,
  },
  {
    id: 2,
    eyebrow: "Nas pistas",
    title: "Cada curva, uma história",
    src: video02,
  },
  {
    id: 3,
    eyebrow: "Engenharia",
    title: "Desempenho em estado puro",
    src: video03,
  },
];

// Tempo máximo por vídeo, caso o "ended" não dispare (vídeo longo ou falha de carregamento).
const MAX_SLIDE_MS = 12000;

export default function VideoCarrossel() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextVideo = useCallback(() => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setTimeout(nextVideo, MAX_SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [currentVideo, paused, nextVideo]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const activeVideo = videos[currentVideo];

  return (
    <div
      className="videoCarrossel"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Vídeos em destaque"
    >
      <div className="videoCarrossel__player">
        <video
          key={activeVideo.id}
          className="videoCarrossel__media"
          src={activeVideo.src}
          autoPlay
          muted
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          playsInline
          preload="metadata"
          onEnded={nextVideo}
          aria-hidden="true"
        />
        <div className="videoCarrossel__overlay" key={`overlay-${activeVideo.id}`}>
          <p className="videoCarrossel__eyebrow">{activeVideo.eyebrow}</p>
          <h1 className="videoCarrossel__title">{activeVideo.title}</h1>
          <div className="videoCarrossel__dots" role="tablist" aria-label="Escolher vídeo">
            {videos.map((video, index) => {
              const isActive = index === currentVideo;
              return (
                <button
                  key={video.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Vídeo ${index + 1}: ${video.title}`}
                  className={`videoCarrossel__dot${isActive ? " videoCarrossel__dot--active" : ""}`}
                  onClick={() => setCurrentVideo(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
