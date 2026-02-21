import { experience } from "@/lib/content";

export default function ExperienceSection() {
  const timeline = experience.timeline.map((job, i) => ({ ...job, delay: 100 + i * 100 }));

  return (
    <section className="modern-section" id="resume-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">{experience.sectionTag}</span>
          <h2 className="section-title">{experience.sectionTitle}</h2>
          <div className="section-line"></div>
        </div>
        <div className="timeline">
          {timeline.map((job) => (
            <div key={job.company} className="timeline-item" data-aos="fade-up" data-aos-delay={job.delay}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-period">{job.period}</span>
                <h3>{job.title}</h3>
                <h4>{job.company}</h4>
                <ul>
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
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
