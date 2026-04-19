"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomeScrollEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax orb floating
      gsap.utils.toArray<HTMLElement>("[data-orb]").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -35 : 28,
          x: index % 2 === 0 ? 20 : -15,
          duration: 9 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Section reveal with blur
      gsap.utils.toArray<HTMLElement>(".motion-section").forEach((section) => {
        const content = section.querySelectorAll("[data-section-child]");
        if (!content.length) return;

        gsap.fromTo(
          content,
          { y: 50, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Parallax for parallax sections
      gsap.utils.toArray<HTMLElement>("[data-parallax-section]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 40, opacity: 0.4, scale: 0.99, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%"
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
