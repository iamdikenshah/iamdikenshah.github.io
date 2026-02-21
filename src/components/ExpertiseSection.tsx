export default function ExpertiseSection() {
  const cards = [
    {
      icon: "fas fa-brain",
      title: "Agentic AI & Workflow Systems",
      desc: "Designing agentic workflows with LangChain, LangGraph, and CrewAI. Building RAG pipelines, tool-calling agents, and leveraging HuggingFace SLMs and task-based models for production-ready AI solutions.",
      delay: 100,
    },
    {
      icon: "fas fa-mobile-alt",
      title: "iOS & Mobile Architecture",
      desc: "13+ years of native iOS — Swift, SwiftUI, Combine, Clean Architecture. From banking apps handling millions of transactions to complex IoT integrations.",
      delay: 200,
    },
    {
      icon: "fas fa-users-cog",
      title: "Engineering Leadership",
      desc: "Managing engineering teams, defining tech strategy, running Agile sprints. I care about shipping fast without cutting corners on quality.",
      delay: 300,
    },
  ];

  return (
    <section className="modern-section section-alt" id="services-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">What I Do Best</span>
          <h2 className="section-title">Expertise</h2>
          <div className="section-line"></div>
          <p className="section-description">
            I work across agentic AI and mobile — from designing agentic workflows to shipping production iOS apps.
            Here&apos;s where I spend most of my time.
          </p>
        </div>
        <div className="row justify-content-center">
          {cards.map((card) => (
            <div key={card.title} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={card.delay}>
              <div className="expertise-card">
                <div className="expertise-icon">
                  <i className={card.icon}></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="expertise-card-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
