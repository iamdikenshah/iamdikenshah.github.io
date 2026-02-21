import { certifications } from "@/lib/content";

export default function CertificationsSection() {
  const items = certifications.items.map((c, i) => ({ ...c, delay: 100 + i * 50 }));

  return (
    <section className="modern-section" id="certifications-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">{certifications.sectionTag}</span>
          <h2 className="section-title">{certifications.sectionTitle}</h2>
          <div className="section-line"></div>
        </div>
        <div className="row justify-content-center">
          {items.map((c) => (
            <div key={c.title} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={c.delay}>
              <div className="cert-card">
                <div className="cert-icon">
                  <i className={c.icon}></i>
                </div>
                <p>{c.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
