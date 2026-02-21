import { expertise } from "@/lib/content";

export default function ExpertiseSection() {
  const cards = expertise.cards.map((c, i) => ({ ...c, delay: 100 + i * 100 }));

  return (
    <section className="modern-section section-alt" id="services-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">{expertise.sectionTag}</span>
          <h2 className="section-title">{expertise.sectionTitle}</h2>
          <div className="section-line"></div>
          <p className="section-description">{expertise.sectionDescription}</p>
        </div>
        <div className="row justify-content-center">
          {cards.map((card) => (
            <div key={card.title} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={card.delay}>
              <div className="expertise-card">
                <div className="expertise-icon">
                  <i className={card.icon}></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="expertise-card-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
