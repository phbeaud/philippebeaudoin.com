"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight";

const variants: Record<Variant, { hidden: string; visible: string }> = {
  fadeUp: {
    hidden: "translate-y-8 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  fadeIn: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  slideLeft: {
    hidden: "-translate-x-8 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  slideRight: {
    hidden: "translate-x-8 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
};

export default function AnimatedSection({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const v = variants[variant];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? v.visible : v.hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
