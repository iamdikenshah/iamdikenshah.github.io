import { about } from "@/lib/content";

export default function AboutSection() {
  const cards = about.journeyCards.map((c) => ({
    icon: c.icon,
    title: c.title,
    body: c.description,
  }));

  return (
    <section className="modern-section" id="about-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">{about.sectionTag}</span>
          <h2 className="section-title">{about.sectionTitle}</h2>
          <div className="section-line"></div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10" data-aos="fade-up" data-aos-delay="150">
            <div className="about-journey">
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  className="journey-card"
                  data-aos="fade-up"
                  data-aos-delay={200 + i * 100}
                >
                  <div className="journey-icon">
                    <i className={card.icon}></i>
                  </div>
                  <div className="journey-content">
                    <h3>{card.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: card.body }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
