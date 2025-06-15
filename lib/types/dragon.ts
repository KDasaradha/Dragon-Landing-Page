export interface Dragon {
  id: string;
  name: string;
  type: string;
  rarity: "common" | "rare" | "legendary";
  abilities: string[];
  stats: {
    speed: number;
    strength: number;
    intelligence: number;
    stealth: number;
  };
  image: string;
  description: string;
}

export interface DragonSearchFilters {
  term: string;
  type: string;
  rarity: string;
  abilities: string[];
}