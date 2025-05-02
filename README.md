
# Pokémon Explorer

![Pokémon Explorer](https://img.shields.io/badge/Pok%C3%A9mon-Explorer-red)

An interactive React web application that allows users to explore the first 150 Pokémon from the original Pokédex. Users can search for Pokémon by name or ID, filter by type, and view details for each Pokémon.

![Pokémon Explorer Screenshot](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png)

## Features

- **Browse Pokémon**: View a responsive grid of the first 150 Pokémon with their images, types, and IDs
- **Search**: Search Pokémon by name or ID number
- **Filter**: Filter Pokémon by their types (fire, water, grass, etc.)
- **Responsive Design**: Fully responsive interface that works on mobile, tablet, and desktop devices
- **Loading States**: Visual feedback during data loading
- **Error Handling**: Graceful handling of API errors and empty states
- **Pagination**: Easily navigate through pages of Pokémon
- **GSAP Animations**: Smooth, modern animations throughout the interface

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript for more robust code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **GSAP**: Animation library for modern interactions
- **PokeAPI**: RESTful API for Pokémon data
- **Vite**: Next generation frontend tooling

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone <repository-url>
   cd pokemon-explorer
   ```

2. Install dependencies
   ```sh
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
pokemon-explorer/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── Header.tsx
│   │   ├── PokemonCard.tsx
│   │   ├── TypeFilter.tsx
│   │   ├── Loader.tsx
│   │   └── EmptyState.tsx
│   ├── services/       # API services
│   │   └── pokemonService.ts
│   ├── hooks/          # Custom React hooks
│   │   └── use-gsap.tsx
│   ├── pages/          # Page components
│   │   └── Index.tsx
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
└── package.json        # Dependencies and scripts
```

## API Reference

This project uses the [PokeAPI](https://pokeapi.co/) for fetching Pokémon data:

- `GET /api/v2/pokemon?limit=150` - Get the first 150 Pokémon
- `GET /api/v2/pokemon/{id or name}` - Get details for a specific Pokémon

## Performance Optimizations

The application implements several performance optimizations:

- Data fetching with caching to reduce API calls
- Lazy loading of images for faster initial load times
- Memoization of filtered results using React's useMemo
- Modern build tooling with Vite for fast development and optimized production builds

## Best Practices Implemented

- Semantic HTML for accessibility
- Responsive design (mobile-first approach)
- Proper state management with React Hooks
- Type safety with TypeScript
- Error handling and loading states
- Component composition and reusability
- GSAP animations for modern UI experience

## License

This project is for educational purposes only. Pokémon is a registered trademark of Nintendo, Game Freak, and Creatures Inc.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokémon data
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [GSAP](https://greensock.com/gsap/) for animations
