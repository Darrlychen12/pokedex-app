import { useState } from "react";
import "./Dropdown.scss";

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
  unknown: ["#024508"],
  shadow: ["#51C4E7"],
};

const compareString = (a, b) => {
  const nameA = a.toUpperCase();
  const nameB = b.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

const Dropdown = ({ data, setSelectedFilter }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        Filter by type
      </div>
      {isActive && (
        <div className="dropdown-content">
          {data.sort(compareString).map((data, index) => {
            if (typeStyles[data].length === 2) {
              return (
                <div className="dropdown-item-container" key={index}>
                  <div
                    key={data}
                    onClick={(e) => {
                      setSelectedFilter(e.target.textContent);
                      setIsActive(false);
                    }}
                    className="dropdown-item"
                  >
                    <div
                      className="type-icon-two"
                      style={{
                        "--after": typeStyles[data][0].toString(),
                        "--before": typeStyles[data][1].toString(),
                      }}
                    ></div>
                    <h4 className="pokemon-type">{data}</h4>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="dropdown-item-container" key={index}>
                  <div
                    key={data}
                    onClick={(e) => {
                      setSelectedFilter(e.target.textContent);
                      setIsActive(false);
                    }}
                    className="dropdown-item"
                  >
                    <div
                      className="type-icon"
                      style={{
                        background: typeStyles[data][0].toString(),
                      }}
                    ></div>
                    <h4 className="pokemon-type">{data}</h4>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
