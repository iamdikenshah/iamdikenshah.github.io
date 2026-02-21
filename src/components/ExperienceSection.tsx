const timeline = [
  {
    period: "2021 — Present",
    title: "Engineering Manager / Agentic AI Lead",
    company: "Hexaware",
    items: [
      "Leading a team building agentic AI products using LangChain, LangGraph, and RAG pipelines.",
      "Designed multi-agent systems for document processing and customer support automation.",
      "Set up vector search infrastructure (Pinecone, ChromaDB) for enterprise knowledge bases.",
      "Still own the iOS architecture for our mobile banking clients — old habits die hard.",
      "Mentoring engineers on LLM/SLM integration patterns and prompt engineering best practices.",
    ],
    delay: 100,
  },
  {
    period: "2019 — 2021",
    title: "Senior Software Engineer",
    company: "OpenXcell",
    items: [
      "Owned end-to-end iOS development for healthcare and e-commerce clients.",
      "Introduced SwiftUI early on — one of the first teams at the company to use it in production.",
      "Handled everything from API integration to App Store deployment and release management.",
    ],
    delay: 200,
  },
  {
    period: "2016 — 2019",
    title: "Software Engineer",
    company: "TatvaSoft",
    items: [
      "Worked across food delivery, real estate, and IoT projects. Learned MVVM the hard way.",
      "Transitioned from Objective-C to Swift and helped the team adopt modern iOS patterns.",
      "Got really into unit testing and code architecture during this period.",
    ],
    delay: 300,
  },
  {
    period: "2012 — 2016",
    title: "Software Engineer",
    company: "Softweb Solutions",
    items: [
      "Where it all started — built my first real iOS apps with Objective-C.",
      "Built iOS apps for banking clients using early mobile frameworks and MVC architecture.",
      "Learned the fundamentals of shipping production apps and working with cross-functional teams.",
    ],
    delay: 400,
  },
];

export default function ExperienceSection() {
  return (
    <section className="modern-section" id="resume-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Career Journey</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line"></div>
        </div>
        <div className="timeline">
          {timeline.map((job) => (
            <div key={job.company} className="timeline-item" data-aos="fade-up" data-aos-delay={job.delay}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">{job.period}</span>
                <h3>{job.title}</h3>
                <span className="timeline-company">
                  <i className="fas fa-building"></i> {job.company}
                </span>
                <ul className="timeline-list">
                  {job.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
