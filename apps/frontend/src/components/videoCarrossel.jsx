import { useEffect, useState } from "react";
import video01 from "../assets/video/video01mp4.mp4";
import video02 from "../assets/video/video02.mp4";
import video03 from "../assets/video/video03.mp4";

const videos = [
  {
    id: 1,
    title: "Primeiro video",
    src: video01,
  },
  {
    id: 2,
    title: "Segundo video",
    src: video02,
  },
  {
    id: 3,
    title: "Terceiro video",
    src: video03,
  },
];

export default function VideoCarrossel() {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 6000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  function nextVideo() {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  }

  const activeVideo = videos[currentVideo];

  return (
    <div className="videoCarrossel">
      <div className="videoCarrossel__player">
        <video
          key={activeVideo.id}
          className="videoCarrossel__media"
          src={activeVideo.src}
          autoPlay
          muted
          loop={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          playsInline
          preload="metadata"
          onEnded={nextVideo}
        />
        <div className="videoCarrossel__overlay">
          <p className="videoCarrossel__eyebrow">Official Cavalinho</p>
        </div>
      </div>
    </div>
  );
}
