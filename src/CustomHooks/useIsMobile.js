import { useEffect, useState } from "react";

const MOBILEVIEWWIDTH = 768;

const getIsMobile = () => window.innerWidth <= MOBILEVIEWWIDTH;

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  useEffect(() => {
    const onResize = () => {
      debounce(setIsMobile(getIsMobile()), 250);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
