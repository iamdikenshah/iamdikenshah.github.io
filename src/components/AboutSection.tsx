export default function AboutSection() {
  const cards = [
    {
      icon: "fas fa-mobile-alt",
      title: "The Mobile Foundation",
      body: "Started building <strong class=\"highlight\">iOS apps</strong> over 13 years ago — from <strong class=\"highlight\">banking platforms</strong> (Backbase, retail &amp; business banking) to <strong class=\"highlight\">healthcare</strong>, <strong class=\"highlight\">e-commerce</strong>, and <strong class=\"highlight\">IoT</strong>. Got deep into <strong class=\"highlight\">Swift</strong>, <strong class=\"highlight\">SwiftUI</strong>, and <strong class=\"highlight\">Clean Architecture</strong>.",
    },
    {
      icon: "fas fa-brain",
      title: "The AI Pivot",
      body: "Got hooked on <strong class=\"highlight\">Agentic AI</strong> — not just using ChatGPT, but architecting real agentic workflows with it. Now hands-on with <strong class=\"highlight\">LangChain</strong>, <strong class=\"highlight\">LangGraph</strong>, <strong class=\"highlight\">RAG pipelines</strong>, <strong class=\"highlight\">vector databases</strong>, and <strong class=\"highlight\">multi-agent systems</strong>. Also exploring <strong class=\"highlight\">HuggingFace SLMs</strong> and <strong class=\"highlight\">task-based models</strong> for efficient, specialized AI solutions.",
    },
    {
      icon: "fas fa-users-cog",
      title: "Where I Am Now",
      body: "Split my time between <strong class=\"highlight\">leading engineering teams</strong>, building <strong class=\"highlight\">agentic AI products</strong>, and leveraging <strong class=\"highlight\">LLMs and SLMs in real production workflows</strong> — not just demos. Still ship mobile apps when the right project comes along.",
    },
  ];

  return (
    <section className="modern-section" id="about-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Get To Know Me</span>
          <h2 className="section-title">About Me</h2>
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
