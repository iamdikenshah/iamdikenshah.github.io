import { hero, personalInfo } from "@/lib/content";

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
              <span className="hero-badge">{hero.badge}</span>
              <h1 className="hero-title">
                {hero.greeting}{" "}
                <span className="gradient-text">{hero.name}</span>
              </h1>
              <p className="hero-subtitle">{hero.subtitle}</p>
              <div className="hero-tech-strip">
                {hero.techTags.map((tag) => (
                  <span key={tag.name} className="tech-tag">
                    <i className={tag.icon}></i> {tag.name}
                  </span>
                ))}
              </div>
              <div className="hero-stats">
                {hero.stats.map((stat) => (
                  <div key={stat.label} className="stat-item">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="hero-actions">
                {hero.actions.map((action) => (
                  <a
                    key={action.text}
                    href={action.href}
                    className={`btn btn-modern ${
                      action.type === "primary"
                        ? "btn-primary-modern"
                        : "btn-outline-modern"
                    }`}
                    {...("download" in action ? { download: action.download } : {})}
                  >
                    <span>{action.text}</span>
                    <i className={action.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-5 order-lg-1 order-1 mb-4 mb-lg-0">
            <div className="hero-image-wrapper" data-aos="fade-right">
              <div className="hero-image-ring"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="hero-img"
                src={personalInfo.profileImage}
                alt={`${personalInfo.name} profile photo`}
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
