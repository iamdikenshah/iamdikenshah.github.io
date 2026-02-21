export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home-section" },
    { label: "About Me", href: "#about-section" },
    { label: "Expertise", href: "#services-section" },
    { label: "Skills", href: "#skills-section" },
    { label: "Experience", href: "#resume-section" },
    { label: "Projects", href: "#projects-section" },
    { label: "Blog", href: "#blog-section" },
    { label: "Contact", href: "#contact-section" },
  ];

  const services = [
    "Agentic AI Solutions",
    "LangChain / LangGraph",
    "RAG Pipelines",
    "iOS App Development",
    "Mobile Architecture",
    "Engineering Leadership",
  ];

  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col footer-about">
            <a href="#home-section" className="footer-logo">
              <span className="brand-highlight">D</span>iken Shah
            </a>
            <p className="footer-desc">
              13+ years of building software — from native iOS apps to agentic AI systems. Currently deep into
              LangChain, LangGraph, and RAG. Always looking for the next interesting problem to solve.
            </p>
            <div className="footer-social">
              <a href="https://github.com/iamdikenshah" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://x.com/Diken_Shah" target="_blank" rel="noopener noreferrer" aria-label="X">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/iamdikenshah"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/diken-shah/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-nav">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>
                    <i className="fas fa-chevron-right"></i> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-nav">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services-section">
                    <i className="fas fa-chevron-right"></i> {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  <a href="https://maps.app.goo.gl/HpEwoEkHhgh8pNo98" target="_blank" rel="noopener noreferrer">
                    Ahmedabad, Gujarat, India
                  </a>
                </span>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <span>
                  <a href="tel:+918460177769">+91 84601 77769</a>
                </span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>
                  <a href="mailto:shah.diken@gmail.com">shah.diken@gmail.com</a>
                </span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Diken Shah. All rights reserved.</p>
          <p className="footer-credit">
            Designed &amp; Developed with <i className="fas fa-heart footer-heart"></i> by Diken Shah
          </p>
        </div>
      </div>
    </footer>
  );
}
