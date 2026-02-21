export default function CTASection() {
  return (
    <section className="footer-cta" id="cta-section" data-aos="fade-up">
      <div className="container">
        <div className="footer-cta-inner">
          <div className="footer-cta-text">
            <h3>Building something with Agentic AI?</h3>
            <p>Whether it&apos;s an agentic workflow, a RAG pipeline, or a mobile app — let&apos;s talk.</p>
          </div>
          <div className="footer-cta-actions">
            <a href="mailto:shah.diken@gmail.com" className="btn btn-modern btn-cta-light">
              <i className="fas fa-envelope"></i> Get In Touch
            </a>
            <a href="/resource/DikenShahCV.pdf" download="Diken-Shah-CV.pdf" className="btn btn-modern btn-cta-outline">
              <i className="fas fa-download"></i> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
