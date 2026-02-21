export default function HeroSection() {
  return (
    <section id="home-section" className="hero">
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-7 order-lg-2 order-2">
            <div className="hero-content" data-aos="fade-left">
              <span className="hero-badge">Open to Agentic AI &amp; Mobile Projects</span>
              <h1 className="hero-title">
                Hi, I&apos;m <span className="gradient-text">Diken Shah</span>
              </h1>
              <p className="hero-subtitle">Agentic AI Engineer &amp; Mobile Architect</p>
              <div className="hero-tech-strip">
                {[
                  { icon: "fas fa-brain", name: "Agentic AI" },
                  { icon: "fas fa-link", name: "LangChain" },
                  { icon: "fas fa-project-diagram", name: "LangGraph" },
                  { icon: "fas fa-cogs", name: "CrewAI" },
                  { icon: "fas fa-database", name: "RAG" },
                  { icon: "fas fa-face-smile", name: "HuggingFace" },
                  { icon: "fab fa-swift", name: "Swift" },
                  { icon: "fas fa-mobile-alt", name: "SwiftUI" },
                ].map((tag) => (
                  <span key={tag.name} className="tech-tag">
                    <i className={tag.icon}></i> {tag.name}
                  </span>
                ))}
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">13+</span>
                  <span className="stat-label">Years Building</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Products Shipped</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">6+</span>
                  <span className="stat-label">Industries</span>
                </div>
              </div>
              <div className="hero-actions">
                <a href="#projects-section" className="btn btn-modern btn-primary-modern">
                  <span>View Projects</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
                <a
                  href="/resource/DikenShahCV.pdf"
                  download="Diken-Shah-CV.pdf"
                  className="btn btn-modern btn-outline-modern"
                >
                  <span>Download CV</span>
                  <i className="fas fa-download"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-5 order-lg-1 order-1 mb-4 mb-lg-0">
            <div className="hero-image-wrapper" data-aos="fade-right">
              <div className="hero-image-ring"></div>
              <img
                className="hero-img"
                src="/images/diken_shah_optimized.jpg"
                alt="Diken Shah profile photo"
                width={300}
                height={300}
                fetchPriority="high"
                decoding="async"
              />
              <div className="hero-image-dots"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
