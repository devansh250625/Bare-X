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
          { y: 36, opacity: 0.72 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%"
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
