"use client";

import Link from "next/link";

const posts = [
  {
    url: "/blog/building-simple-rag",
    image: "/images/blog-rag.jpg",
    category: "Agentic AI",
    date: "Feb 16, 2026",
    readTime: "8 min read",
    title: "Building Simple RAG",
    excerpt:
      "A practical guide to building a Retrieval-Augmented Generation pipeline from scratch — embedding documents, storing vectors, and querying with LLMs for accurate, grounded answers.",
    delay: 100,
  },
  {
    url: "/blog/huggingface-local-pipeline",
    image: "/images/blog-hf.jpg",
    category: "HuggingFace",
    date: "Feb 16, 2026",
    readTime: "7 min read",
    title: "Download & Run HuggingFace Models Locally",
    excerpt:
      "Step-by-step guide to downloading HuggingFace models to your machine and running them locally using the Transformers pipeline — no API keys, no cloud, fully offline.",
    delay: 200,
  },
  {
    url: "/blog/clean-architecture-ios",
    image: "/images/blog-clean-arch.jpg",
    category: "iOS Development",
    date: "Feb 18, 2026",
    readTime: "12 min read",
    title: "Clean Architecture in iOS",
    excerpt:
      "A practical deep-dive into building scalable, testable iOS apps using Clean Architecture — layers, dependency rules, SOLID principles, and real Swift code examples.",
    delay: 300,
  },
  {
    url: "/blog/ios-interview-questions",
    image: "/images/blog-ios-interview.jpg",
    category: "iOS Development",
    date: "Feb 18, 2026",
    readTime: "20 min read",
    title: "iOS Interview Questions & Answers",
    excerpt:
      "30 essential iOS interview questions across Beginner, Intermediate, and Advanced levels — Swift, memory management, concurrency, architecture, and performance.",
    delay: 400,
  },
];

export default function BlogSection() {
  return (
    <section className="modern-section" id="blog-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Insights &amp; Learnings</span>
          <h2 className="section-title">Blog</h2>
          <div className="section-line"></div>
          <p className="section-description">
            I write about what I&apos;m building and learning — from agentic AI patterns to mobile architecture
            lessons.
          </p>
        </div>
        <div className="row" style={{ alignItems: "stretch" }}>
          {posts.map((post) => (
            <div
              key={post.url}
              className="col-md-6 col-lg-4 mb-4 d-flex"
              data-aos="fade-up"
              data-aos-delay={post.delay}
            >
              <Link href={post.url} className="blog-card-link">
                <div className="blog-card">
                  <div className="blog-card-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={400}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement?.classList.add("blog-card-image-fallback");
                      }}
                    />
                    <span className="blog-card-category">{post.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>
                        <i className="fas fa-calendar-alt"></i> {post.date}
                      </span>
                      <span>
                        <i className="fas fa-clock"></i> {post.readTime}
                      </span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="blog-card-read-more">
                      Read More <i className="fas fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
