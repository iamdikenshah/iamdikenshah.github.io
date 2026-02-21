import { contact } from "@/lib/content";

export default function ContactSection() {
  const cards = contact.cards.map((c, i) => ({ ...c, delay: 100 + i * 100 }));

  return (
    <section className="modern-section" id="contact-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">{contact.sectionTag}</span>
          <h2 className="section-title">{contact.sectionTitle}</h2>
          <div className="section-line"></div>
          <p className="section-description">{contact.sectionDescription}</p>
        </div>
        <div className="row justify-content-center">
          {cards.map((card) => (
            <div key={card.title} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={card.delay}>
              <div className="contact-card">
                <div className="contact-icon">
                  <i className={card.icon}></i>
                </div>
                <h3>{card.title}</h3>
                <p>
                  <a href={card.link} target="_blank" rel="noopener noreferrer">
                    {card.text}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
