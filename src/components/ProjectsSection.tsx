"use client";

import { useState } from "react";
import { projects as projectsContent } from "@/lib/content";

export default function ProjectsSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const projects = projectsContent.items.map((p, i) => ({
    image: p.image.startsWith("/") ? p.image : `/${p.image}`,
    category: p.category,
    title: p.title,
    desc: p.description,
    tags: p.tags,
    liveUrl: "liveUrl" in p ? (p as typeof p & { liveUrl: string }).liveUrl : undefined,
    delay: 100 + (i % 3) * 50,
  }));

  return (
    <section className="modern-section section-alt" id="projects-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">{projectsContent.sectionTag}</span>
          <h2 className="section-title">{projectsContent.sectionTitle}</h2>
          <div className="section-line"></div>
          <p className="section-description">{projectsContent.sectionDescription}</p>
        </div>
        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p.title} className="project-card" data-aos="fade-up" data-aos-delay={p.delay}>
              <div className="project-image" style={{ backgroundImage: `url(${p.image})` }}>
                <button
                  onClick={() => setLightbox(p.image)}
                  style={{ background: "none", border: "none", width: "100%", height: "100%", cursor: "pointer" }}
                  aria-label={`View ${p.title}`}
                >
                  <div className="project-overlay">
                    <i className="fas fa-expand"></i>
                  </div>
                </button>
              </div>
              <div className="project-info">
                <span className="project-category">{p.category}</span>
                <h3>{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-modern btn-outline-modern"
                    style={{ marginTop: 15 }}
                  >
                    <span>View Live</span>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Project preview"
            style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 8 }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 30,
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 32,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
