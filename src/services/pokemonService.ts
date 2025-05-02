
import { toast } from "@/components/ui/sonner";

export interface PokemonBasic {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  };
  types: PokemonType[];
}

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit: number = 150): Promise<PokemonBasic[]> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch Pokemon list:", error);
    toast.error("Failed to fetch Pokémon list. Please try again.");
    return [];
  }
};

export const fetchPokemonDetails = async (url: string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch Pokemon details from ${url}:`, error);
    return null;
  }
};

export const fetchAllPokemonWithDetails = async (limit: number = 150): Promise<Pokemon[]> => {
  try {
    const basicPokemonList = await fetchPokemonList(limit);
    const pokemonDetailsPromises = basicPokemonList.map(pokemon => 
      fetchPokemonDetails(pokemon.url)
    );
    
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    return pokemonDetails.filter((pokemon): pokemon is Pokemon => pokemon !== null);
  } catch (error) {
    console.error("Failed to fetch all Pokemon with details:", error);
    toast.error("Failed to load Pokémon data. Please refresh the page.");
    return [];
  }
};

export const getAllPokemonTypes = (pokemonList: Pokemon[]): string[] => {
  const typesSet = new Set<string>();
  
  pokemonList.forEach(pokemon => {
    pokemon.types.forEach(typeInfo => {
      typesSet.add(typeInfo.type.name);
    });
  });
  
  return Array.from(typesSet).sort();
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const formatPokemonName = (name: string): string => {
  return name.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
