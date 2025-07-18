"use client";

import { useState, useMemo } from "react";
import { Search, X, Filter, ChevronDown } from "lucide-react";
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
import "./DragonSearch.css";

const ResultCount = ({ count, total }: { count: number; total: number }) => (
  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center"
  >
    Found <span className="font-semibold text-emerald-600 dark:text-emerald-400">{count}</span> of {total} dragons
  </motion.p>
);

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
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-slate-800/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200/20 dark:border-slate-700/30 mb-8"
    >
      <motion.div 
        className="flex items-center gap-3 mb-6"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Filter className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
          Dragon Search & Filter
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search Input with enhanced styling */}
        <div className="relative group">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-200" />
          <Input
            placeholder="Search dragons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
            aria-label="Search dragons by name or description"
          />
        </div>

        {/* Type Filter with custom trigger */}
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200">
            <SelectValue placeholder="Dragon Type" />
            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200 group-focus:rotate-180" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {dragonTypes.map(type => (
              <SelectItem key={type} value={type} className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-150">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rarity Filter with enhanced styling */}
        <Select value={selectedRarity} onValueChange={setSelectedRarity}>
          <SelectTrigger className="border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200">
            <SelectValue placeholder="Rarity" />
            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200 group-focus:rotate-180" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            <SelectItem value="common" className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20">Common</SelectItem>
            <SelectItem value="rare" className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20">Rare</SelectItem>
            <SelectItem value="legendary" className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20">Legendary</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters with animation */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="w-full border-slate-200 dark:border-slate-700 hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 disabled:opacity-50"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </motion.div>
      </div>

      {/* Ability Filters with enhanced UI */}
      <div className="mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-500" />
          Filter by Abilities:
        </p>
        <motion.div 
          className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {allAbilities.length > 0 ? (
            allAbilities.map(ability => (
              <motion.div
                key={ability}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedAbilities.includes(ability) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAbility(ability)}
                  className={`text-xs font-medium transition-all duration-300 ${
                    selectedAbilities.includes(ability) 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg" 
                      : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 hover:border-emerald-500"
                  }`}
                >
                  {ability}
                </Button>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              No abilities available for current dragons
            </p>
          )}
        </motion.div>
      </div>

      {/* Active Filters Display with enhanced animations */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-200 dark:border-slate-700 pt-4"
          >
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Active filters:
              </span>
              {searchTerm && (
                <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Search: {searchTerm}
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                  Type: {selectedType}
                </Badge>
              )}
              {selectedRarity !== "all" && (
                <Badge variant="secondary" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                  Rarity: {selectedRarity}
                </Badge>
              )}
              {selectedAbilities.map(ability => (
                <Badge 
                  key={ability} 
                  variant="secondary"
                  className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300"
                >
                  Ability: {ability}
                </Badge>
              ))}
            </div>
            <ResultCount count={filteredDragons.length} total={dragons.length} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}