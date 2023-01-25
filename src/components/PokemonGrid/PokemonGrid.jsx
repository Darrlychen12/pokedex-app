import React, { useState, useEffect } from "react";
import {
  searchPokemon,
  fetchInitialData,
  fetchTypes,
  fetchAllPokemon,
  setFilter
} from "../../Services/PokemonService";
import Searchbar from "../Search/Searchbar";
import Dropdown from "../Dropdown/Dropdown";
import Tile from "../Tile/Tiles";
import Pagination from "../Pagination/Pagination";
import "./PokemonGrid.scss";

const ORIGINAL_POKEMON_COUNT = 153;


const PokemonGrid = () => {
  const [query, setQuery] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [initialRender, setInitialRender] = useState(false);
  const [pokemonListCache, setPokemonListCache] = useState([]);
  const [allPokemon, setAllPokemon] = useState([])
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [paginationCount, setPaginationCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("")
  const [isLoading, setisLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPokemonList, setCurrentPokemonList] = useState([]);

  //initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const initialData = await fetchInitialData();
        const types = await fetchTypes();
        const allPokeMon = await fetchAllPokemon(ORIGINAL_POKEMON_COUNT);
        setAllPokemon(allPokeMon);
        setPaginationCount(ORIGINAL_POKEMON_COUNT);
        setPokemonTypes(types);
        setPokemonList(initialData);
        setPokemonListCache(initialData);
        setCurrentPokemonList(allPokeMon);
      } catch (e) {
        console.log("error: ", e);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);

  //when filter type is changed
  useEffect(() => {
    try {
      setisLoading(true);
      const filter = setFilter(selectedFilter, allPokemon);
      setCurrentPokemonList(filter);
      setPaginationCount(filter.length);
      setPokemonList(paginate(filter, 9, 1));
      setPokemonListCache(paginate(filter, 9, 1));
      setPage(1);
    } catch (e) {
      console.log("error: ", e)
    } finally {
      setisLoading(false);
    }
  }, [selectedFilter]);

  //useeffect for pagination
  useEffect(() => {
    try {
      setisLoading(true);
      setPokemonList(paginate(currentPokemonList, 9, page));
      setPokemonListCache(paginate(currentPokemonList, 9, page));
    } catch (e) {
      console.log("error: ", e)
    } finally {
      setisLoading(false);
    }
  }, [page]);

  //when search term is changed
  useEffect(() => {
    if (query.trim().length !== 0) {
      setisLoading(true);
      setPokemonList(searchPokemon(query, allPokemon).slice(0, 9));
      setisLoading(false);
      setInitialRender(true);
    } else {
      setPokemonList(pokemonListCache);
    }
  }, [query]);

  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };
  
  return (
    <>
      <div className="global-container">
        <div className="header-container">
          <h1 className="pokemon-header">Pokédex</h1>
        </div>
       <div className="search-filter-container">
          <Searchbar setQuery={setQuery} />
          <Dropdown data={pokemonTypes} setSelectedFilter={setSelectedFilter} />
        </div>

        <div className="pokemon-container">
          {!isLoading &&
            pokemonList.length > 0 &&
            pokemonList.map((pokemon) => {
              const data = pokemon.types.map((type) => type);
              const types = data.map((x) => x.type.name)
              return (
                <Tile
                  key={pokemon.id}
                  pokemonId={`ID: ${pokemon.id}`}
                  name={pokemon.name}
                  types={types}
                  image={pokemon.sprites}
                />
              );
            })}
          {initialRender && pokemonList.length === 0 && (
            <div>
              <h3>{`No results found for "${query}"`}</h3>
            </div>
          )}
        </div>
        <div />
      </div>

      <div className="pagination-container">
        {!isLoading && pokemonList.length > 0 && query.length === 0 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPokemonCount={paginationCount}
          />
        )}
      </div>
    </>
  );
};

export default PokemonGrid;
