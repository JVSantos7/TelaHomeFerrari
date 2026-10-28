import { useEffect, useState } from "react";
import splashLogo from "../assets/logo01.jpg";

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export default function Splash() {
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    const visibleMs = prefersReducedMotion() ? 300 : 1400;
    const hideTimer = window.setTimeout(() => setPhase("hide"), visibleMs);
    const goneTimer = window.setTimeout(() => setPhase("gone"), visibleMs + 600);

    // Trava a rolagem enquanto a abertura cobre a tela.
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(goneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "hide") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div className={`splash${phase === "hide" ? " splash--hide" : ""}`} role="presentation">
      <img className="splash__logo" src={splashLogo} alt="" />
    </div>
  );
}
