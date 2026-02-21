import { footer, personalInfo } from "@/lib/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { socialMedia } = personalInfo;

  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col footer-about">
            <a href="#home-section" className="footer-logo">
              <span className="brand-highlight">{footer.brandName[0]}</span>
              {footer.brandName.slice(1)}
            </a>
            <p className="footer-desc">{footer.description}</p>
            <div className="footer-social">
              <a href={socialMedia.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" aria-label="X">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-nav">
              {footer.quickLinks.map((link) => (
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
              {footer.services.map((s) => (
                <li key={s.label}>
                  <a href={s.href}>
                    <i className="fas fa-chevron-right"></i> {s.label}
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
                  <a href={personalInfo.location.mapLink} target="_blank" rel="noopener noreferrer">
                    {personalInfo.location.city}, {personalInfo.location.state}, {personalInfo.location.country}
                  </a>
                </span>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <span>
                  <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                </span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>{personalInfo.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {footer.copyright}</p>
          <p className="footer-credit">
            {footer.credit.split("❤️")[0]}
            <i className="fas fa-heart footer-heart"></i>
            {footer.credit.split("❤️")[1]}
          </p>
        </div>
      </div>
    </footer>
  );
}
