import { useEffect, useState } from 'react';

export const ENHANCED_UI_QUERY =
  '(min-width: 992px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

const getMediaMatch = (query) =>
  typeof window !== 'undefined' && window.matchMedia(query).matches;

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => getMediaMatch(query));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener('change', updateMatch);

    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
};

export default useMediaQuery;
