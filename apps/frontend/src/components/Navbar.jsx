import { useEffect, useState } from "react";
import navLogo from "../assets/logonav.png";
import { NAV_ITEMS } from "../data/navigation";

export default function Navbar() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);

  // Destaca o link da seção visível no momento.
  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`navbar${menuOpen ? " navbar--open" : ""}`}>
      <nav className="navbar__content" aria-label="Principal">
        <a className="navbar__logoLink" href="#inicio" onClick={() => setMenuOpen(false)}>
          <img className="navbar__logo" src={navLogo} alt="Official Cavalinho — início" />
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar__toggleBar" />
          <span className="navbar__toggleBar" />
          <span className="navbar__toggleBar" />
        </button>

        <ul id="navbar-menu" className="navbar__menu">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`navbar__link${activeId === id ? " navbar__link--active" : ""}`}
                aria-current={activeId === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
