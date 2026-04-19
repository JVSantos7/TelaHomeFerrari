import { useEffect, useMemo, useState } from "react";
import "./App.css";
import VideoCarrossel from "./components/videoCarrossel";
import splashLogo from "./assets/logo01.jpg";
import navLogo from "./assets/logonav.png";

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export default function App() {
  const [splashPhase, setSplashPhase] = useState("show"); 

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setSplashPhase("hide"), 1400);
    const goneTimer = window.setTimeout(() => setSplashPhase("gone"), 2000);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(goneTimer);
    };
  }, []);

  useEffect(() => {
    const updateShade = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const t = clamp01(scrollTop / maxScroll);
      const shade = 0.65 * t; 
      doc.style.setProperty("--scrollShade", String(shade));
    };

    updateShade();
    window.addEventListener("scroll", updateShade, { passive: true });
    window.addEventListener("resize", updateShade);
    return () => {
      window.removeEventListener("scroll", updateShade);
      window.removeEventListener("resize", updateShade);
    };
  }, []);

  const showSplash = splashPhase !== "gone";
  const splashClassName = useMemo(() => {
    if (splashPhase === "hide") return "splash splash--hide";
    return "splash";
  }, [splashPhase]);

  return (
    <div className="app">
      {showSplash ? (
        <div className={splashClassName} aria-label="Abertura">
          <img className="splash__logo" src={splashLogo} alt="Cavalinho" />
        </div>
      ) : null}

      <header className="navbar">
        <div className="navbar__content">
          <div className="navbar__logoWrap" aria-hidden="true">
            <img className="navbar__logo" src={navLogo} alt="" />
            <button className="navbar__menuButton" aria-label="Menu">INÍCIO</button>
            <button className="navbar__menuButton" aria-label="Menu">CARROS ESPORTIVOS</button>
            <button className="navbar__menuButton" aria-label="Menu">SOBRE NÓS</button>
          </div>
        </div>
      </header>

      <main className="page">
        <section className="section section--carousel">
          <VideoCarrossel />
        </section>

        <section className="section section--spacer" />
      </main>
    </div>
  );
}

