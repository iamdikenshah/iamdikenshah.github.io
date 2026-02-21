"use client";

import Link from "next/link";
import { blog } from "@/lib/content";

export default function BlogSection() {
  const posts = blog.posts.map((p, i) => ({ ...p, delay: 100 + i * 100 }));

  return (
    <section className="modern-section" id="blog-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">{blog.sectionTag}</span>
          <h2 className="section-title">{blog.sectionTitle}</h2>
          <div className="section-line"></div>
          <p className="section-description">{blog.sectionDescription}</p>
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
