"use client";

import { motion } from "framer-motion";

export function TextSplitReveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  animateOnLoad = false
}: {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "div" | "span";
  animateOnLoad?: boolean;
}) {
  const words = children.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden py-1">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            {...(animateOnLoad
              ? { animate: { y: "0%", opacity: 1 } }
              : { whileInView: { y: "0%", opacity: 1 }, viewport: { once: true, amount: 0.1 } }
            )}
            transition={{
              duration: 0.85,
              delay: delay + wordIndex * 0.07,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}

export function CharReveal({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const chars = children.split("");

  return (
    <span className={className} aria-label={children}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          aria-hidden="true"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
