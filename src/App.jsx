import { useEffect } from 'react';
import usePreventBackNavigation from './hooks/usePreventBackNavigation';
import Routes from './Routes';

function App() {
  usePreventBackNavigation()

   useEffect(() => {
    // Block gesture zoom
    const preventGesture = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('gesturechange', preventGesture);
    document.addEventListener('gestureend', preventGesture);

    // Block context menu (long press)
    const preventContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, []);

  useEffect(() => {
  const isPWA =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  if (isPWA && document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}, []);


  return (
        <Routes />
  );
}

export default App;