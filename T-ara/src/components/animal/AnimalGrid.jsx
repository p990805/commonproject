// src/components/animal/AnimalGrid.jsx
import React from "react";
import AnimalCard from "./AnimalCard";

const AnimalGrid = ({ animals }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
    {animals.map((animal, index) => (
      <AnimalCard key={animal.id || index} animal={animal} />
    ))}
  </div>
);

export default AnimalGrid;
