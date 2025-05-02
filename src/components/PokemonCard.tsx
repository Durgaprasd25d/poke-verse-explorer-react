
import React, { useRef, useEffect } from "react";
import { Pokemon, formatPokemonId, formatPokemonName } from "@/services/pokemonService";
import gsap from "gsap";

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const getTypeColor = (type: string) => {
    return `bg-pokemonType-${type}`;
  };

  const getTypeTextColor = (type: string) => {
    // Types that need dark text for readability
    const lightBackgroundTypes = ['electric', 'fairy', 'normal', 'ice', 'ground'];
    return lightBackgroundTypes.includes(type) ? 'text-gray-800' : 'text-white';
  };

  const imageUrl = 
    pokemon.sprites.other?.['official-artwork']?.front_default || 
    pokemon.sprites.front_default;
  
  useEffect(() => {
    // Animation for card entrance
    gsap.fromTo(
      cardRef.current,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        delay: index * 0.1, 
        ease: "power3.out"
      }
    );
    
    // Clean up animations
    return () => {
      gsap.killTweensOf(cardRef.current);
    };
  }, [index]);
  
  // Hover animation handlers
  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };
  
  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { 
        y: 0, 
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        duration: 0.3, 
        ease: "power2.in"
      });
    }
  };
  
  return (
    <div 
      ref={cardRef}
      className="pokemon-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border-8 border-gray-200"></div>
        </div>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={pokemon.name} 
            className="object-contain h-full w-full transform transition-transform duration-300 z-10"
            loading="lazy"
          />
        )}
      </div>
      
      <div className="p-4">
        <span className="text-sm text-gray-500 font-medium">
          {formatPokemonId(pokemon.id)}
        </span>
        
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          {formatPokemonName(pokemon.name)}
        </h3>
        
        <div className="flex gap-2 flex-wrap">
          {pokemon.types.map((typeInfo) => (
            <span 
              key={typeInfo.type.name}
              className={`text-xs px-3 py-1 rounded-full font-medium 
                ${getTypeColor(typeInfo.type.name)} 
                ${getTypeTextColor(typeInfo.type.name)}`}
            >
              {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
