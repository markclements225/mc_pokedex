import "./App.css";
import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setIsLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemon(response.data.results.map((pokemon) => pokemon.name));
      });

    return () => cancel();
  }, [currentPageUrl]);

  function nextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function prevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (isLoading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        nextPage={nextPageUrl ? nextPage : null}
        prevPage={prevPageUrl ? prevPage : null}
      />
    </>
  );
}

export default App;
