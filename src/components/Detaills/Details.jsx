import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Details.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { findPokemon } from "../../Services/PokemonService";

const typeStyles = {
  bug: ["#729f3e"],
  fairy: ["#fdbae9"],
  ghost: ["#7b62a3"],
  normal: ["#a3acaf"],
  steel: ["#9db7b7"],
  dark: ["#707070"],
  fighting: ["#d56623"],
  grass: ["#9acc50"],
  poison: ["#b87ec8"],
  water: ["#4592c3"],
  dragon: ["#53a3cf", "#f16d56"],
  fire: ["#fd7c24"],
  ground: ["#f7de3f", "#ab9842"],
  psychic: ["#f366b9"],
  electric: ["#eed535"],
  flying: ["#51c4e7", "#beb9b9"],
  rock: ["#a28c21"],
  ice: ["#51C4E7"],
  unknown: ["#51C4E7"],
  shadow: ["#51C4E7"],
};

const Details = () => {
  let { pokemonName } = useParams();
  let navigate = useNavigate();
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [next, setNext] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const url = window.location.pathname.split("/").pop();

  const generateNextPages = (index, totalCount) => {
    let result = [];
    if (index === 1) {
      result[0] = totalCount;
      result[1] = index + 1;
    } else if (index === totalCount) {
      result[0] = index - 1;
      result[1] = 1;
    } else {
      result[0] = index - 1;
      result[1] = index + 1;
    }
    return result;
  };
  
  const titleCase = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const cardData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const pokemonID = parseInt(cardData.data.id);
      const nextPages = generateNextPages(pokemonID, 153);
      const previousPokemon = await findPokemon(nextPages[0]);
      const nextPokemon = await findPokemon(nextPages[1]);
      setPrevious(previousPokemon);
      setNext(nextPokemon);
      setPokemon(cardData.data);
      setPokemonTypes(cardData.data.types.map((type) => type.type.name));
      setisLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <div>
      {isLoading && <div></div>}
      {!isLoading && pokemonTypes.length > 0 && (
        <>
          <div className={styles.pokemonCardContainer}>
            <div className={styles.pokemonImageContainer}>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.backButton}
                  onClick={() => navigate("/")}
                >
                  <i class="fa fa-arrow-left"></i> Back To Pokedex
                </button>
              </div>
              <img
                className={styles.pokemonImage}
                src={pokemon.sprites.front_default}
              />
            </div>
            <div className={styles.pokemonCardInformation}>
              <div className={styles.nextPreviousContainer}>
                <div className={styles.previousPokemon}>
                  <button
                    className={styles.nextPreviousButton}
                    onClick={() => {
                      navigate(`/details/${previous.data.name}`);
                    }}
                  >
                    <i class="fa-solid fa-angle-left"></i>{" "}
                    {`#${previous.data.id} - ${titleCase(previous.data.name)}`}
                  </button>
                </div>

                <div className={styles.nextPokemon}>
                  <button
                    className={styles.nextPreviousButton}
                    onClick={() => {
                      navigate(`/details/${next.data.name}`);
                    }}
                  >
                    {`#${next.data.id} - ${titleCase(next.data.name)} `}
                    <i class="fa-solid fa-angle-right"></i>{" "}
                  </button>
                </div>
              </div>
              <div className={styles.pokemonInformation}>
                <h2 className={styles.pokemonId}>{`ID: ${pokemon.id}`}</h2>
                <h2 className={styles.pokemonName}>{titleCase(pokemon.name)}</h2>
                <div className={styles.pokemonSpecs}>
                  <h2 className={styles.pokemonTitle}>Height</h2>
                  <h2 className={styles.pokemonTitle}>Weight</h2>
                  <h2
                    className={styles.pokemonHeight}
                  >{`${pokemon.height/10} m`}</h2>
                  <h2
                    className={styles.pokemonWeight}
                  >{`${pokemon.weight} lbs`}</h2>
                </div>
              </div>

              <div className={styles.pokemonTypes}>
                <h2 className={styles.typeSpecs}>Type</h2>

                <div className="type-container">
                  {pokemonTypes.map((type) => {
                    if (typeStyles[type].length === 2) {
                      return (
                        <>
                          <div></div>
                          <span
                            className={styles.typeIconTwo}
                            style={{
                              "--after": typeStyles[type][0].toString(),
                              "--before": typeStyles[type][1].toString(),
                            }}
                          >
                            <h2 className={styles.pokemonType}>{type}</h2>
                          </span>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div></div>
                          <span
                            className={styles.typeIcon}
                            style={{ backgroundColor: typeStyles[type] }}
                          >
                            {" "}
                            <h2 className={styles.pokemonType}>{type}</h2>
                          </span>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
