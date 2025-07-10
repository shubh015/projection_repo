import { useEffect } from 'react';

function usePreventBackNavigation() {
  useEffect(() => {
    // Push a dummy history state
    window.history.pushState(null, '', window.location.href);

    const onPopState = () => {
      window.history.pushState(null, '', window.location.href); // Block back
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
}

export default usePreventBackNavigation;
