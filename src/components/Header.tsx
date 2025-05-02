
import React, { useRef, useEffect } from "react";
import { Search } from "lucide-react";
import gsap from "gsap";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate header
    tl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    // Animate logo with a slight bounce
    tl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );
    
    // Animate title with a staggered letter effect
    const titleChars = titleRef.current?.querySelectorAll('.char');
    if (titleChars) {
      tl.fromTo(
        titleChars,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );
    }
    
    // Animate search input
    tl.fromTo(
      searchRef.current,
      { width: "0%", opacity: 0 },
      { width: "100%", opacity: 1, duration: 0.5, ease: "power2.inOut" },
      "-=0.2"
    );
    
    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  // Split text helper function
  const SplitText = ({ text, className }: { text: string; className?: string }) => {
    return (
      <span className={className}>
        {text.split('').map((char, i) => (
          <span key={i} className="char inline-block">
            {char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div ref={logoRef} className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-br from-pokemon-red to-pokemon-red/80 rounded-full border-4 border-white shadow-md"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full border border-gray-300"></div>
            </div>
          </div>
          <h1 ref={titleRef} className="text-2xl md:text-3xl font-bold text-pokemon-blue pokemon-font tracking-wider text-center md:text-left">
            <SplitText text="Poké" className="text-pokemon-red" />
            <SplitText text="mon Explorer" />
          </h1>
        </div>
        
        <div ref={searchRef} className="relative w-full md:w-64 lg:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="search"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pokemon-blue/30 focus:border-pokemon-blue transition-all duration-200 shadow-sm hover:shadow"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
