import axios from "axios";

const OFFSET = 9;
const BATCHSIZE = 9;
const GET_INITIAL_DATA = "https://pokeapi.co/api/v2/pokemon?limit=9&offset=0";
const GET_POKEMON_TYPES = "https://pokeapi.co/api/v2/type";

export const searchPokemon = (searchTerm, pokemonList) => {
  let list = [];
  pokemonList.filter((value) => {
    if (
      value.name.startsWith(searchTerm) ||
      value.id.toString() === searchTerm.toString()
    ) {
      list.push(value);
    }
  });
  return list;
};


export const fetchAllPokemon = async (
  totalPokemonCount,
  batchSize=BATCHSIZE
) => {
  let valueList = [];
  let promiseList = [];
  let pokemon = [];
  for (let i = 0; i < totalPokemonCount; i += OFFSET) {

    promiseList.push(
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${i}`)
    );
    if (promiseList.length === batchSize) {
      //waiting for all to finish
      valueList = [
        ...valueList,
        ...(await Promise.all(promiseList)).map((pokemon) => pokemon.data.results),
      ];
      promiseList = [];
    }
  }
  //handles the last few
  valueList = [
    ...valueList,
    ...(await Promise.all(promiseList)).map((pokemon) => pokemon.data.results),
  ].flat();
  for(let i = 0 ; i < valueList.length; i++){
    pokemon.push(axios.get(valueList[i].url))
  }
  let test = [
    ...(await Promise.all(pokemon)).map((pokemon) => pokemon.data),
  ];
  return test.flat();
};


export const findPokemon = async (pokemonNumber) => {
  const pokemonData = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
  );
  return pokemonData;
};

export const setFilter = (filter, pokemonList) => {
  let list = [];

  pokemonList.filter((pokemon) => {
    pokemon.types.filter((type) => {
      if (type.type.name === filter) {
        list.push(pokemon);
      }
    })

  });
  return list;
};

export const fetchInitialData = async () => {
  const pokemonData = await axios.get(GET_INITIAL_DATA);
  const {results} = pokemonData.data
  const pokemonURLS = results.map((pokemon) => pokemon.url)
  const pokemon = [];
  let promiseList = [];
  for(let i = 0 ; i < pokemonURLS.length; i++){
    let data = await axios.get(pokemonURLS[i]);
    promiseList.push(axios.get(pokemonURLS[i]))
    pokemon[i] = data.data
  }
  let test = [
    ...(await Promise.all(promiseList)).map((pokemon) => pokemon.data),
  ];
  return test;
};

export const fetchTypes = async () => {
  const pokemonData = await axios.get(GET_POKEMON_TYPES);
  const {results} = pokemonData.data
  return results.map((type) => type.name);
};
