
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the container
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
    
    // Animate the image with a subtle bounce
    tl.fromTo(
      imageRef.current,
      { y: -20, scale: 0.9, opacity: 0 },
      { y: 0, scale: 1, opacity: 0.8, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      "-=0.3"
    );
    
    // Animate the text elements
    tl.fromTo(
      [titleRef.current, messageRef.current],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      "-=0.5"
    );
    
    // Add a subtle bounce animation to the image
    gsap.to(imageRef.current, {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    
    return () => {
      // Clean up animations
      tl.kill();
      gsap.killTweensOf([containerRef.current, imageRef.current, titleRef.current, messageRef.current]);
    };
  }, [message]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 mb-6 opacity-30">
        <img 
          ref={imageRef}
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" 
          alt="Psyduck confused" 
          className="w-full h-full object-contain"
        />
      </div>
      <h3 ref={titleRef} className="text-xl font-bold text-gray-700 mb-2">No Pokémon Found</h3>
      <p ref={messageRef} className="text-gray-500 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;
