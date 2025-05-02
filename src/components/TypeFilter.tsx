
import { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";

interface TypeFilterProps {
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ types, selectedType, onTypeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getTypeColor = (type: string) => {
    return `bg-pokemonType-${type}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white border shadow-sm hover:shadow-md transition-all ${
          selectedType ? "border-pokemonType-" + selectedType : "border-gray-200"
        }`}
      >
        <Filter size={16} />
        <span className="font-medium">
          {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : "Filter by type"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 right-0 bg-white rounded-lg border border-gray-200 shadow-lg z-10 p-2 w-48">
          <div className="flex flex-wrap gap-1 max-h-60 overflow-y-auto">
            <button
              onClick={() => {
                onTypeChange("");
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                selectedType === "" ? "bg-gray-100" : ""
              }`}
            >
              All Types
            </button>

            {types.map((type) => (
              <button
                key={type}
                onClick={() => {
                  onTypeChange(type);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2 ${
                  selectedType === type ? "bg-gray-100" : ""
                }`}
              >
                <span className={`w-3 h-3 rounded-full inline-block ${getTypeColor(type)}`}></span>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeFilter;
