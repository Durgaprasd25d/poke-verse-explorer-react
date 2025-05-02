
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

interface GSAPContext {
  context: gsap.Context;
}

export const useGSAP = (
  callback?: (context: GSAPContext) => void,
  dependencies: React.DependencyList = []
) => {
  const container = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (callback) callback({ context: ctx.current as gsap.Context });
    }, container);

    ctx.current = context;

    return () => {
      context.revert();
    };
  }, dependencies);

  return { container };
};

export const fadeInUpAnimation = (target: string | gsap.TweenTarget, delay: number = 0) => {
  return gsap.from(target, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    delay,
  });
};

export const staggerAnimation = (targets: string | gsap.TweenTarget, staggerDelay: number = 0.1) => {
  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    stagger: staggerDelay,
  });
};

export const pulseAnimation = (target: string | gsap.TweenTarget) => {
  return gsap.to(target, {
    scale: 1.05,
    duration: 0.5,
    ease: "power2.inOut",
    repeat: 1,
    yoyo: true,
  });
};
