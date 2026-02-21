import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diken Shah – Agentic AI & Mobile Engineering Leader | LangChain, LangGraph, iOS Expert",
  description:
    "Portfolio of Diken Shah — 13+ years in mobile engineering, now building with Agentic AI, LangChain, LangGraph, and RAG. From banking apps to intelligent agentic systems.",
  keywords:
    "Diken Shah, Agentic AI, LangChain, LangGraph, RAG, iOS Developer, Swift, SwiftUI, Mobile Architecture",
  authors: [{ name: "Diken Shah" }],
  openGraph: {
    title: "Diken Shah – Agentic AI & Mobile Engineering Leader",
    description: "From enterprise iOS apps to Agentic AI — explore the work of Diken Shah.",
    type: "website",
    url: "https://iamdikenshah.github.io/",
    images: [{ url: "https://iamdikenshah.github.io/images/diken_shah.PNG" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diken Shah – Agentic AI & Mobile Engineering Leader",
    description:
      "Building intelligent agentic systems and enterprise mobile apps. 13+ years of shipping real products.",
    images: ["https://iamdikenshah.github.io/images/diken_shah.PNG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/icomoon.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/chatbot.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/css/lightbox.css"
          integrity="sha512-Woz+DqWYJ51bpVk5Fv0yES/edIMXjj3Ynda+KWTIkGoynAMHrqTcDUQltbipuiaD5ymEo9520lyoVOo9jCQOCA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Diken Shah",
              url: "https://iamdikenshah.github.io/",
              image: "https://iamdikenshah.github.io/images/diken_shah.PNG",
              jobTitle: "Agentic AI Engineer & Mobile Architect",
              description:
                "13+ years in mobile engineering, now building with Agentic AI, LangChain, LangGraph, and RAG.",
              email: "shah.diken@gmail.com",
              telephone: "+918460177769",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
                addressCountry: "IN",
              },
              sameAs: [
                "https://github.com/iamdikenshah",
                "https://www.linkedin.com/in/diken-shah/",
                "https://x.com/Diken_Shah",
                "https://www.instagram.com/iamdikenshah",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
