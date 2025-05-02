
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16 animate-spin-slow">
        <div className="absolute inset-0 bg-pokemon-red rounded-full border-4 border-white"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full border border-gray-300"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading Pokémon...</p>
    </div>
  );
};

export default Loader;
