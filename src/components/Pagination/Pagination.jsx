import React from "react";
import styles from "./Pagination.module.scss";
import useIsMobile from "../../CustomHooks/useIsMobile";

const getPaginationLabels = (totalPages, curPage, maxLabels) => {
  const pageNums = [];

  if (maxLabels >= totalPages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNums.push(i);
    }
    return pageNums;
  }

  const numLabels = maxLabels - 2;

  pageNums.push(1);
  if (curPage < numLabels) {
    for (let i = 0; i < numLabels; i++) {
      pageNums.push(i + 2);
    }
  } else if (totalPages - curPage + 1 < numLabels) {
    for (let i = numLabels; i > 0; i--) {
      pageNums.push(totalPages - i);
    }
  } else {
    const lengthOfSide = Math.floor((numLabels - 1) / 2);
    for (let i = curPage - lengthOfSide; i <= curPage + lengthOfSide; i++) {
      pageNums.push(i);
    }
  }
  pageNums.push(totalPages);

  return pageNums;
};
const Pagination = ({ page, setPage, totalPokemonCount }) => {
  const totalPages = Math.ceil(totalPokemonCount / 9);
  const pageNums = useIsMobile()
    ? getPaginationLabels(totalPages, page, 5)
    : getPaginationLabels(totalPages, page, 10);
  if (!totalPokemonCount) {
    return null;
  }

  return (
    <nav className={styles.pagination}>
      <div className={styles.pageControls}>
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className={styles.arrowButton}
          alt="Previous Page"
        >
          <i className="fa-solid fa-caret-left" />
        </button>
        <ul
          className={styles.pageLinkWrapper}
          aria-label="Pagination Navigation"
        >
          {pageNums.map((pageNum, index) => (
            <React.Fragment key={`page-link-${pageNum}`}>
              {index > 0 && pageNum - 1 !== pageNums[index - 1] && (
                <div className="dots">...</div>
              )}
              <li
                className={
                  page === pageNums[index]
                    ? styles.currentButton
                    : styles.unselectedButton
                }
                aria-current={page === pageNums[index]}
                aria-label={
                  page === pageNums[index]
                    ? `current page, page ${page}`
                    : `page ${page}`
                }
                alt={`Open Page ${pageNum}`}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </li>
            </React.Fragment>
          ))}
        </ul>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className={styles.arrowButton}
          alt="Next Page"
        >
          <i className="fa-solid fa-caret-right" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;