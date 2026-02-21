export default function ContactSection() {
  const cards = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Location",
      text: "Ahmedabad, India",
      link: "https://maps.app.goo.gl/HpEwoEkHhgh8pNo98",
      delay: 100,
    },
    {
      icon: "fas fa-phone-alt",
      title: "Phone",
      text: "+91 84601 77769",
      link: "tel:+918460177769",
      delay: 200,
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      text: "shah.diken@gmail.com",
      link: "mailto:shah.diken@gmail.com",
      delay: 300,
    },
  ];

  return (
    <section className="modern-section" id="contact-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <div className="section-line"></div>
          <p className="section-description">
            Got an Agentic AI project you&apos;re thinking about? Or need someone who can build both the agent and the
            app? Drop me a line — I&apos;m always up for interesting conversations.
          </p>
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
