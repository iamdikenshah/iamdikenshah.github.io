"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      href="#home-section"
      className={`back-to-top${visible ? " show" : ""}`}
      aria-label="Back to top"
      onClick={handleClick}
    >
      <i className="fas fa-chevron-up"></i>
    </a>
  );
}
