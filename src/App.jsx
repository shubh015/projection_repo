import { useEffect } from 'react';
import usePreventBackNavigation from './hooks/usePreventBackNavigation';
import Routes from './Routes';

function App() {
  usePreventBackNavigation()

   useEffect(() => {
    const preventGesture = (e) => e.preventDefault();

    // iOS Safari / Chrome Mobile
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('gesturechange', preventGesture);
    document.addEventListener('gestureend', preventGesture);

    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
    };
  }, []);
  return (
        <Routes />
  );
}

export default App;