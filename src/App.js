import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetList from './PlanetList';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/');
  }, []);

  const fetchPlanets = (url) => {
    axios.get(url)
      .then(response => {
        setPlanets(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
      fetchPlanets(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setCurrentPage(currentPage - 1);
      fetchPlanets(prevPage);
    }
  };

  return (
    <div className="app">
      <h1>Star Wars Planets Directory</h1>
      <PlanetList planets={planets} />
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={!prevPage}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={!nextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
