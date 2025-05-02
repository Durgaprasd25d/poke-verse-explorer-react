
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Loader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const pokeBallRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    
    // Initial fade in
    gsap.fromTo(
      loaderRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
    
    // Pokeball bounce and rotate animation
    tl.to(pokeBallRef.current, {
      rotation: 360,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1
    });
    
    // Text pulse animation
    gsap.to(textRef.current, {
      opacity: 0.7,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    
    return () => {
      // Clean up animations
      tl.kill();
      gsap.killTweensOf([loaderRef.current, pokeBallRef.current, textRef.current]);
    };
  }, []);

  return (
    <div ref={loaderRef} className="flex flex-col items-center justify-center py-12">
      <div ref={pokeBallRef} className="relative w-16 h-16">
        {/* Pokeball outer */}
        <div className="absolute inset-0 bg-gradient-to-b from-pokemon-red to-pokemon-red/90 rounded-full border-4 border-white shadow-lg"></div>
        {/* Pokeball middle line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-black transform -translate-y-1/2"></div>
        {/* Pokeball button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow-inner"></div>
        </div>
      </div>
      <p ref={textRef} className="mt-4 text-gray-600 font-medium animate-pulse">Loading Pokémon...</p>
    </div>
  );
};

export default Loader;
