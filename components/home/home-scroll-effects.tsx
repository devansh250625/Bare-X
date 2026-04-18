"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomeScrollEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const stage = document.querySelector('[data-parallax="hero-stage"]');
      if (stage) {
        gsap.to(stage, {
          yPercent: 10,
          scale: 0.96,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-parallax-section]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 48, opacity: 0.35, scale: 0.985, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 78%"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".motion-section").forEach((section) => {
        const content = section.querySelectorAll("[data-section-child]");
        if (!content.length) return;

        gsap.fromTo(
          content,
          { y: 54, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 62%",
              end: "bottom 38%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-orb]").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -30 : 25,
          x: index % 2 === 0 ? 18 : -12,
          duration: 8 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
