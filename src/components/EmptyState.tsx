
import React from "react";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 mb-6 opacity-30">
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" 
          alt="Psyduck confused" 
          className="w-full h-full object-contain animate-bounce-slow"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">No Pokémon Found</h3>
      <p className="text-gray-500 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;
