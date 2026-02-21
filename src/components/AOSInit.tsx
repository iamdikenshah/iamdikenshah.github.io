"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Dynamically import AOS to avoid SSR issues
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 80,
      });
    });
  }, [pathname]);

  useEffect(() => {
    // Scroll to hash on page load (when coming from blog pages)
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
        }
      }, 400);
    }
  }, []);

  return null;
}
