import styles from "./Searchbar.module.scss";
const Searchbar = ({ setQuery }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          let query = e.target.value;
          setQuery(
            query.toLowerCase()
          );
        }}
      />
      <i className="fas fa-search" position="absolute"></i>
    </div>
  );
};

export default Searchbar;