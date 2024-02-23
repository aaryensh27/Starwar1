import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlanetCard.css';

const Resident = ({ residentUrl }) => {
  const [resident, setResident] = useState(null);

  useEffect(() => {
    axios.get(residentUrl)
      .then(response => {
        setResident(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [residentUrl]);

  if (!resident) {
    return <p>Loading...</p>;
  }

  return (
    <div className="resident">
      <p><strong>Name:</strong> {resident.name}</p>
      <p><strong>Height:</strong> {resident.height}</p>
      <p><strong>Mass:</strong> {resident.mass}</p>
      <p><strong>Gender:</strong> {resident.gender}</p>
    </div>
  );
};

const PlanetCard = ({ planet }) => {
  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p><strong>Climate:</strong> {planet.climate}</p>
      <p><strong>Population:</strong> {planet.population}</p>
      <p><strong>Terrain:</strong> {planet.terrain}</p>
      <h3>Residents:</h3>
      <div className="residents-list">
        {planet.residents.map((residentUrl, index) => (
          <Resident key={index} residentUrl={residentUrl} />
        ))}
      </div>
    </div>
  );
};

export default PlanetCard;
