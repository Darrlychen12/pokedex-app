import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tile.scss";

const styles = {
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
  unknown: ["#024508"],
  shadow: ["#51C4E7"]
};

function titleCase(string){
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}


const Tile = ({ pokemonId, name, types, image }) => {
  const navigate = useNavigate();

  return (
    <div
      className="tile"
      onClick={() => navigate(`details/${name}`)}
      style={
        styles[types[0]].length === 2
          ? {
              "--type": styles[types[0]][0].toString(),
              "--after": styles[types[0]][1].toString(),
              "--before": styles[types[0]][0].toString(),
            }
          : {
              "--type": styles[types[0]].toString(),
              "--after": styles[types[0]].toString(),
              "--before": styles[types[0]].toString(),
            }
      }
    >
      <img className="pokemon-icon" src={image.front_default} />
      <div className="information-text" >
        <h2 className="pokemon-id">{pokemonId}</h2>
        <h2 className="pokemon-name">{titleCase(name)}</h2>

        <div className="type-container">
          {types.map((type, index) => {
            if (styles[type].length === 2) {
              return (
                <React.Fragment key={index}>
                  <span
                    className="type-icon-two"
                    style={{
                      "--after": styles[type][0].toString(),
                      "--before": styles[type][1].toString(),
                    }}
                  ></span>
                  <h2 className="pokemon-type">{type}</h2>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={index}>
                  <span
                    className="type-icon"
                    style={{ backgroundColor: styles[type] }}
                  ></span>
                  <h2 className="pokemon-type">{type}</h2>
                </React.Fragment>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Tile;
