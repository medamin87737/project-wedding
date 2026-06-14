"use client";

const VIDEO_SRC = "/video/dreams-love.mp4";

export default function VideoBackground() {
  return (
    <div className="video-bg" aria-hidden="true">
      <video
        className="video-bg__media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="video-bg__overlay" />
      <div className="video-bg__vignette" />
    </div>
  );
}
