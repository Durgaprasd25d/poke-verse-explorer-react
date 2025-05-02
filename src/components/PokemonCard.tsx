
import React from "react";
import { Pokemon, formatPokemonId, formatPokemonName } from "@/services/pokemonService";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
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
  
  return (
    <div className="pokemon-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative">
      <div className="aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border-8 border-gray-200"></div>
        </div>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={pokemon.name} 
            className="object-contain h-full w-full transform hover:scale-110 transition-transform duration-300"
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
        
        <div className="flex gap-2">
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
