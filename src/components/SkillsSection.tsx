import { skills } from "@/lib/content";

export default function SkillsSection() {
  return (
    <section className="modern-section section-alt" id="skills-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">{skills.sectionTag}</span>
          <h2 className="section-title">{skills.sectionTitle}</h2>
          <div className="section-line"></div>
        </div>
        <div className="skills-grid" data-aos="fade-up" data-aos-delay="100">
          {skills.technicalSkills.map((s) => (
            <span key={s.name} className="skill-pill">
              <i className={s.icon}></i> {s.name}
            </span>
          ))}
        </div>

        <div className="section-header mt-5 pt-5" data-aos="fade-up">
          <span className="section-tag">{skills.industries.sectionTag}</span>
          <h2 className="section-title">{skills.industries.sectionTitle}</h2>
          <div className="section-line"></div>
        </div>
        <div className="industries-grid" data-aos="fade-up" data-aos-delay="100">
          {skills.industries.items.map((ind) => (
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
