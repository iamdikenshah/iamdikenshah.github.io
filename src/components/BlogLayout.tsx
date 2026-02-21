import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Link from "next/link";

interface BlogLayoutProps {
  category: string;
  date: string;
  readTime: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function BlogLayout({ category, date, readTime, title, subtitle, children }: BlogLayoutProps) {
  return (
    <>
      <Navbar />
      <main>
        <article className="blog-post-page">
          <div className="blog-post-header">
            <div className="container">
              <Link href="/#blog-section" className="blog-back-link">
                <i className="fas fa-arrow-left"></i> Back to Blog
              </Link>
              <div className="blog-post-meta-top">
                <span className="blog-post-category">{category}</span>
                <span className="blog-post-date">
                  <i className="fas fa-calendar-alt"></i> {date}
                </span>
                <span className="blog-post-reading-time">
                  <i className="fas fa-clock"></i> {readTime}
                </span>
              </div>
              <h1 className="blog-post-title">{title}</h1>
              <p className="blog-post-subtitle">{subtitle}</p>
            </div>
          </div>

          <div className="blog-post-content">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  {children}

                  {/* Author Card */}
                  <div className="blog-author-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/diken_shah_optimized.jpg"
                      alt="Diken Shah"
                      className="blog-author-img"
                      loading="lazy"
                    />
                    <div className="blog-author-info">
                      <h4>Diken Shah</h4>
                      <p>
                        Agentic AI Engineer &amp; Mobile Architect with 13+ years of experience. Currently building
                        agentic workflows with LangChain, LangGraph, and RAG.
                      </p>
                      <div className="blog-author-social">
                        <a
                          href="https://github.com/iamdikenshah"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <i className="fab fa-github"></i>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/diken-shah/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a
                          href="https://x.com/Diken_Shah"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="X"
                        >
                          <i className="fab fa-x-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="modern-footer">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Diken Shah. All rights reserved.</p>
            <p className="footer-credit">
              Designed &amp; Developed with <i className="fas fa-heart footer-heart"></i> by Diken Shah
            </p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
