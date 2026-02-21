import { cta } from "@/lib/content";

export default function CTASection() {
  return (
    <section className="footer-cta" id="cta-section" data-aos="fade-up">
      <div className="container">
        <div className="footer-cta-inner">
          <div className="footer-cta-text">
            <h3>{cta.heading}</h3>
            <p>{cta.subheading}</p>
          </div>
          <div className="footer-cta-actions">
            {cta.actions.map((action) => (
              <a
                key={action.text}
                href={action.href}
                className={`btn btn-modern btn-cta-${
                  action.type === "light" ? "light" : "outline"
                }`}
                {...("download" in action ? { download: action.download } : {})}
              >
                <i className={action.icon}></i> {action.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
