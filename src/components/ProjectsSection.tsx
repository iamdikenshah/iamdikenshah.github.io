"use client";

import { useState } from "react";

const projects = [
  {
    image: "/images/project-web-1.png",
    category: "Web App",
    title: "Interior by Sagar Davda",
    desc: "Portfolio website for an interior designer featuring project galleries, service details, and client testimonials.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://iamdikenshah.github.io/sagar_davda_interior_designer/",
    delay: 100,
  },
  {
    image: "/images/project-web-2.png",
    category: "Web App",
    title: "RichLeaff - Food & Beverages",
    desc: "A modern food & beverages brand website with smooth animations, menu showcase, and responsive design.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://iamdikenshah.github.io/richleaff_website/",
    delay: 150,
  },
  {
    image: "/images/project-web-3.png",
    category: "Web App",
    title: "Climate Solutions",
    desc: "Environmental awareness website showcasing climate solutions, sustainability initiatives, and eco-friendly practices.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://iamdikenshah.github.io/climate_solution_website/",
    delay: 200,
  },
  {
    image: "/images/project-7.jpg",
    category: "Mobile App",
    title: "Bank Of Kuwait Country - Backbase",
    desc: "Retail banking app built on Backbase platform with account management, payments, transfers, and card controls.",
    tags: ["Backbase", "Retail Banking", "SwiftUI", "Combine", "Clean Architecture", "CI/CD"],
    delay: 100,
  },
  {
    image: "/images/project-8.jpg",
    category: "Mobile App",
    title: "Bank of Riyadh - Backbase",
    desc: "Business banking iOS app for Bank of Riyadh with corporate account management, bulk payments, and approval workflows.",
    tags: ["Backbase", "Business Banking", "Swift", "RxSwift", "Azure DevOps"],
    delay: 150,
  },
  {
    image: "/images/project-9.jpg",
    category: "Mobile App",
    title: "Bank Of Mauritius - Backbase",
    desc: "Retail banking app featuring fund transfers, bill payments, account insights, and biometric authentication.",
    tags: ["Backbase", "Retail Banking", "Swift", "Combine", "CI/CD"],
    delay: 200,
  },
  {
    image: "/images/project-10.jpg",
    category: "Mobile App",
    title: "Bank Of Jordan - Backbase",
    desc: "Retail banking iOS app with multi-currency support, P2P transfers, and push notification alerts.",
    tags: ["Swift", "Clean Architecture", "Retail Banking", "RxSwift"],
    delay: 100,
  },
  {
    image: "/images/project-4.jpg",
    category: "Mobile App",
    title: "Struqture - Project Management",
    desc: "Construction project management app with task tracking, team collaboration, document sharing, and real-time progress dashboards.",
    tags: ["Swift", "MVVM", "XCTest", "GraphQL"],
    delay: 150,
  },
  {
    image: "/images/project-5.jpg",
    category: "Mobile App",
    title: "ClickMall - Ecommerce",
    desc: "Full-featured e-commerce iOS app with product catalog, cart management, payment integration, and order tracking.",
    tags: ["Swift", "MVVM", "Azure DevOps"],
    delay: 200,
  },
  {
    image: "/images/project-1.jpg",
    category: "Mobile App",
    title: "Waspito - Healthcare",
    desc: "Telemedicine app connecting patients with doctors via video/audio consultations, appointment booking, and prescription management.",
    tags: ["Swift", "Video/Audio", "MVVM", "Azure DevOps"],
    delay: 100,
  },
  {
    image: "/images/project-6.jpg",
    category: "Mobile App",
    title: "FairDeal - Service Provider",
    desc: "On-demand service marketplace app with provider profiles, booking system, video consultations, and rating/review system.",
    tags: ["Swift", "MVVM", "Video Call", "Jenkins"],
    delay: 150,
  },
  {
    image: "/images/project-3.jpg",
    category: "Mobile App",
    title: "FoodCourt - Online Food Delivery",
    desc: "Food delivery iOS app with restaurant listings, real-time order tracking, payment gateway, and push notifications.",
    tags: ["Swift", "MVVM", "Azure DevOps"],
    delay: 200,
  },
];

export default function ProjectsSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="modern-section section-alt" id="projects-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">My Work</h2>
          <div className="section-line"></div>
          <p className="section-description">
            A mix of what I&apos;ve shipped — from banking apps that handle real money to agentic AI systems that
            handle real conversations. Each one taught me something different.
          </p>
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
