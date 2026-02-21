const skills = [
  { icon: "fas fa-brain", name: "Agentic AI" },
  { icon: "fas fa-link", name: "LangChain" },
  { icon: "fas fa-project-diagram", name: "LangGraph" },
  { icon: "fas fa-database", name: "RAG" },
  { icon: "fas fa-vector-square", name: "Vector Databases" },
  { icon: "fas fa-robot", name: "Multi-Agent Systems" },
  { icon: "fab fa-python", name: "Python" },
  { icon: "fas fa-terminal", name: "Prompt Engineering" },
  { icon: "fas fa-cogs", name: "CrewAI" },
  { icon: "fas fa-fire", name: "OpenAI / GPT APIs" },
  { icon: "fas fa-face-smile", name: "HuggingFace" },
  { icon: "fas fa-microchip", name: "SLMs" },
  { icon: "fas fa-cloud-meatball", name: "Azure AI Foundry" },
  { icon: "fas fa-thumbtack", name: "Pinecone" },
  { icon: "fas fa-palette", name: "ChromaDB" },
  { icon: "fas fa-bolt", name: "FastAPI" },
  { icon: "fas fa-chart-line", name: "Streamlit" },
  { icon: "fab fa-swift", name: "Swift" },
  { icon: "fas fa-mobile-alt", name: "SwiftUI" },
  { icon: "fas fa-sync-alt", name: "RxSwift / Combine" },
  { icon: "fas fa-layer-group", name: "Clean Architecture" },
  { icon: "fas fa-university", name: "Backbase" },
  { icon: "fas fa-infinity", name: "CI / CD" },
  { icon: "fas fa-cloud", name: "Azure / AWS" },
  { icon: "fab fa-docker", name: "Docker" },
  { icon: "fab fa-git-alt", name: "Git" },
  { icon: "fas fa-running", name: "Agile / Scrum" },
  { icon: "fab fa-react", name: "React" },
];

const industries = [
  { icon: "fas fa-robot", name: "Agentic AI" },
  { icon: "fas fa-coins", name: "FinTech" },
  { icon: "fas fa-landmark", name: "Banking" },
  { icon: "fas fa-heartbeat", name: "Healthcare" },
  { icon: "fas fa-shopping-cart", name: "Ecommerce" },
  { icon: "fas fa-network-wired", name: "IoT" },
  { icon: "fas fa-building", name: "Real Estate" },
  { icon: "fas fa-utensils", name: "Food & Travel" },
];

export default function SkillsSection() {
  return (
    <section className="modern-section section-alt" id="skills-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Technical Proficiency</span>
          <h2 className="section-title">My Skills</h2>
          <div className="section-line"></div>
        </div>
        <div className="skills-grid" data-aos="fade-up" data-aos-delay="100">
          {skills.map((s) => (
            <span key={s.name} className="skill-pill">
              <i className={s.icon}></i> {s.name}
            </span>
          ))}
        </div>

        <div className="section-header mt-5 pt-5" data-aos="fade-up">
          <span className="section-tag">Domain Knowledge</span>
          <h2 className="section-title">Industries</h2>
          <div className="section-line"></div>
        </div>
        <div className="industries-grid" data-aos="fade-up" data-aos-delay="100">
          {industries.map((ind) => (
            <div key={ind.name} className="industry-card">
              <i className={ind.icon}></i>
              <span>{ind.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
