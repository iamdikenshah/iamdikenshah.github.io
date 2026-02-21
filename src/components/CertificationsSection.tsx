const certs = [
  { icon: "fas fa-link", text: "LangChain & LangGraph — Building Agentic AI Applications", delay: 100 },
  { icon: "fas fa-robot", text: "ChatGPT Complete Guide: Learn Midjourney, ChatGPT 4 & More", delay: 150 },
  { icon: "fas fa-database", text: "RAG & Vector Databases — Retrieval Augmented Generation", delay: 200 },
  { icon: "fas fa-certificate", text: "Backbase iOS Mobile Developer Certification", delay: 250 },
  { icon: "fas fa-sitemap", text: "Software Architecture: From Developer to Architect", delay: 300 },
  { icon: "fas fa-brain", text: "Prompt Engineering & Agentic Workflow Design", delay: 350 },
];

export default function CertificationsSection() {
  return (
    <section className="modern-section" id="certifications-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Professional Growth</span>
          <h2 className="section-title">Certifications</h2>
          <div className="section-line"></div>
        </div>
        <div className="row justify-content-center">
          {certs.map((c) => (
            <div key={c.text} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={c.delay}>
              <div className="cert-card">
                <div className="cert-icon">
                  <i className={c.icon}></i>
                </div>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
