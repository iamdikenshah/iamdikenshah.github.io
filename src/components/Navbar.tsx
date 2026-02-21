"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/#home-section" },
  { label: "About", href: "/#about-section" },
  { label: "Expertise", href: "/#services-section" },
  { label: "Skills", href: "/#skills-section" },
  { label: "Experience", href: "/#resume-section" },
  { label: "Projects", href: "/#projects-section" },
  { label: "Blog", href: "/#blog-section" },
  { label: "Contact", href: "/#contact-section" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      setMenuOpen(false);
      const id = href.replace("/#", "");
      // If on a different page (blog), navigate to home with hash
      if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light ftco_navbar ftco-navbar-light site-navbar-target${scrolled ? " scrolled awake" : ""}`}
      id="ftco-navbar"
    >
      <div className="container">
        <Link className="navbar-brand" href="/">
          <span className="brand-highlight">D</span>iken
        </Link>
        <button
          className={`navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle${menuOpen ? " active" : ""}`}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="oi oi-menu"></span> Menu
        </button>
        <div className={`collapse navbar-collapse${menuOpen ? " show" : ""}`} id="ftco-nav">
          <ul className="navbar-nav nav ml-auto">
            {navLinks.map((link) => (
              <li key={link.label} className="nav-item">
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
