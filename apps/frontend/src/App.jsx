import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import VideoCarrossel from "./components/VideoCarrossel";
import { NAV_ITEMS } from "./data/navigation";
import imgPista from "./assets/carrocel03.jpg";
import imgF1 from "./assets/f1.jpg";
import imgMotor from "./assets/coracao01.jpg";

const cars = [
  {
    id: "pista",
    tag: "Pista",
    title: "Berlinetta V8",
    text: "Motor central-traseiro, aerodinâmica herdada das corridas e um ronco que dispensa apresentações.",
    image: imgPista,
    alt: "Esportivo vermelho em alta velocidade numa pista",
  },
  {
    id: "f1",
    tag: "Fórmula 1",
    title: "Monoposto",
    text: "O laboratório de tecnologia que, temporada após temporada, inspira os carros de rua.",
    image: imgF1,
    alt: "Carro de Fórmula 1 vermelho visto de cima",
  },
  {
    id: "motor",
    tag: "Mecânica",
    title: "O coração",
    text: "Coletores vermelhos, precisão artesanal e potência entregue a cada giro.",
    image: imgMotor,
    alt: "Motor com coletores de admissão vermelhos",
  },
];

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export default function App() {
  // Escurece o fundo conforme a rolagem (limitado a um update por frame).
  useEffect(() => {
    let frame = 0;
    const updateShade = () => {
      frame = 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const t = clamp01(window.scrollY / maxScroll);
      doc.style.setProperty("--scrollShade", String(0.65 * t));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(updateShade);
    };

    updateShade();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="app">
      <Splash />
      <Navbar />

      <main className="page">
        <section id="inicio" className="section section--carousel" aria-label="Destaques">
          <VideoCarrossel />
        </section>

        <section id="carros" className="section" aria-labelledby="carros-title">
          <header className="sectionHeader">
            <p className="sectionHeader__eyebrow">Coleção</p>
            <h2 id="carros-title" className="sectionHeader__title">Carros esportivos</h2>
          </header>

          <div className="cards">
            {cars.map((car) => (
              <article key={car.id} className="card">
                <div className="card__media">
                  <img src={car.image} alt={car.alt} loading="lazy" decoding="async" />
                </div>
                <div className="card__body">
                  <span className="card__tag">{car.tag}</span>
                  <h3 className="card__title">{car.title}</h3>
                  <p className="card__text">{car.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sobre" className="section about" aria-labelledby="sobre-title">
          <div className="about__media">
            <img src={imgMotor} alt="" loading="lazy" decoding="async" />
          </div>
          <div className="about__content">
            <p className="sectionHeader__eyebrow">Sobre nós</p>
            <h2 id="sobre-title" className="sectionHeader__title">Feito por quem ama velocidade</h2>
            <p className="about__text">
              O Official Cavalinho é um espaço de fã para fã, dedicado aos esportivos italianos,
              às pistas e à engenharia que transforma metal em emoção.
            </p>
            <p className="about__text">
              Aqui reunimos vídeos, fotos e histórias de quem vive o automobilismo com o coração
              acelerado.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <nav className="footer__nav" aria-label="Rodapé">
          {NAV_ITEMS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="footer__link">
              {label}
            </a>
          ))}
        </nav>
        <p className="footer__copy">
          © {new Date().getFullYear()} Official Cavalinho · Projeto de portfólio sem fins comerciais.
        </p>
      </footer>
    </div>
  );
}
