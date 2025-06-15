"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Dragon } from "@/lib/types/dragon";

interface DragonSearchProps {
  dragons: Dragon[];
  onDragonsFilter: (filteredDragons: Dragon[]) => void;
}

export function DragonSearch({ dragons, onDragonsFilter }: DragonSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);

  // Get unique types and abilities for filters
  const dragonTypes = useMemo(() => 
    Array.from(new Set(dragons.map(d => d.type))), [dragons]
  );
  
  const allAbilities = useMemo(() => 
    Array.from(new Set(dragons.flatMap(d => d.abilities))), [dragons]
  );

  // Filter dragons based on search criteria
  const filteredDragons = useMemo(() => {
    return dragons.filter(dragon => {
      const matchesSearch = dragon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dragon.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === "all" || dragon.type === selectedType;
      const matchesRarity = selectedRarity === "all" || dragon.rarity === selectedRarity;
      
      const matchesAbilities = selectedAbilities.length === 0 || 
                              selectedAbilities.some(ability => dragon.abilities.includes(ability));

      return matchesSearch && matchesType && matchesRarity && matchesAbilities;
    });
  }, [dragons, searchTerm, selectedType, selectedRarity, selectedAbilities]);

  // Update parent component with filtered results
  useMemo(() => {
    onDragonsFilter(filteredDragons);
  }, [filteredDragons, onDragonsFilter]);

  const toggleAbility = (ability: string) => {
    setSelectedAbilities(prev => {
      const newAbilities = prev.includes(ability) 
        ? prev.filter(a => a !== ability)
        : [...prev, ability];
      console.log('Toggled ability:', ability, 'New selected abilities:', newAbilities);
      return newAbilities;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedRarity("all");
    setSelectedAbilities([]);
  };

  const hasActiveFilters = searchTerm || selectedType !== "all" || 
                          selectedRarity !== "all" || selectedAbilities.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Dragon Search & Filter
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search dragons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Type Filter */}
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Dragon Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {dragonTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rarity Filter */}
        <Select value={selectedRarity} onValueChange={setSelectedRarity}>
          <SelectTrigger>
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            <SelectItem value="common">Common</SelectItem>
            <SelectItem value="rare">Rare</SelectItem>
            <SelectItem value="legendary">Legendary</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Clear Filters
        </Button>
      </div>

      {/* Ability Filters */}
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Filter by Abilities:
        </p>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {allAbilities.length > 0 ? (
            allAbilities.map(ability => (
              <Button
                key={ability}
                variant={selectedAbilities.includes(ability) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleAbility(ability)}
                className={`text-xs transition-all duration-200 ${
                  selectedAbilities.includes(ability) 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md" 
                    : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700"
                }`}
              >
                {ability}
              </Button>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              No abilities available for current dragons
            </p>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t pt-4"
          >
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Active filters:
              </span>
              {searchTerm && (
                <Badge variant="secondary">Search: {searchTerm}</Badge>
              )}
              {selectedType !== "all" && (
                <Badge variant="secondary">Type: {selectedType}</Badge>
              )}
              {selectedRarity !== "all" && (
                <Badge variant="secondary">Rarity: {selectedRarity}</Badge>
              )}
              {selectedAbilities.map(ability => (
                <Badge key={ability} variant="secondary">
                  Ability: {ability}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {filteredDragons.length} of {dragons.length} dragons found
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}