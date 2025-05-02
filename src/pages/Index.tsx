
import React, { useState, useEffect, useMemo } from "react";
import { Pokemon, fetchAllPokemonWithDetails, getAllPokemonTypes } from "@/services/pokemonService";
import Header from "@/components/Header";
import TypeFilter from "@/components/TypeFilter";
import PokemonCard from "@/components/PokemonCard";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";

const Index: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllPokemonWithDetails();
        setPokemonList(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching Pokemon data:", err);
        setError("Failed to load Pokémon data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const availableTypes = useMemo(() => {
    return getAllPokemonTypes(pokemonList);
  }, [pokemonList]);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter(pokemon => {
      // Filter by search term
      const matchesSearch = searchTerm === "" || 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm);
      
      // Filter by type
      const matchesType = selectedType === "" || 
        pokemon.types.some(typeInfo => typeInfo.type.name === selectedType);
      
      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchTerm, selectedType]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-pokemon-red mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-pokemon-blue text-white px-6 py-2 rounded-full hover:bg-pokemon-blue/80"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {isLoading 
              ? "Loading Pokémon..." 
              : filteredPokemon.length === 0
                ? "No Pokémon Found"
                : filteredPokemon.length === 1
                  ? "1 Pokémon"
                  : `${filteredPokemon.length} Pokémon`
            }
          </h2>
          
          {!isLoading && (
            <TypeFilter 
              types={availableTypes} 
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
          )}
        </div>
        
        {isLoading ? (
          <Loader />
        ) : filteredPokemon.length === 0 ? (
          <EmptyState 
            message={`No Pokémon found matching "${searchTerm}"${
              selectedType ? ` with type "${selectedType}"` : ""
            }. Try a different search term or filter.`} 
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p className="mb-1">Built with PokeAPI - Not affiliated with Pokémon, Nintendo, or Game Freak</p>
          <p>&copy; {new Date().getFullYear()} Pokémon Explorer</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
