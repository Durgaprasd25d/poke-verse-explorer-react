
import React from "react";
import { Search } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-pokemon-red rounded-full border-4 border-white"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full border border-gray-300"></div>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-pokemon-blue pokemon-font tracking-wider text-center md:text-left">
            <span className="text-pokemon-red">Poké</span>mon Explorer
          </h1>
        </div>
        
        <div className="relative w-full md:w-64 lg:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="search"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pokemon-blue/30 focus:border-pokemon-blue"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
