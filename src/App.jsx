import { useEffect } from 'react';
import usePreventBackNavigation from './hooks/usePreventBackNavigation';
import Routes from './Routes';

function App() {
  usePreventBackNavigation()

  useEffect(() => {
    // Only prevent multi-touch gestures (pinch zoom) and context menu
    let touchCount = 0;
    let initialDistance = 0;

    const handleTouchStart = (e) => {
      touchCount = e.touches.length;
      
      // Only prevent if more than one touch (multi-touch gestures)
      if (touchCount > 1) {
        e.preventDefault();
        
        // Calculate initial distance for pinch detection
        if (touchCount === 2) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          initialDistance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2)
          );
        }
      }
    };

    const handleTouchMove = (e) => {
      // Only prevent multi-touch movements (pinch/zoom gestures)
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e) => {
      // Prevent double-tap zoom only
      let lastTouchEnd = 0;
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
      
      touchCount = 0;
      initialDistance = 0;
    };

    // Block iOS Safari gesture events
    const preventGesture = (e) => e.preventDefault();
    
    // Block context menu (long press) but allow normal touch
    const preventContextMenu = (e) => {
      e.preventDefault();
    };

    // Prevent keyboard zoom shortcuts
    const preventKeyboardZoom = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    // Prevent wheel zoom (trackpad/mouse)
    const preventWheelZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Add event listeners with passive: false only where needed
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // iOS Safari specific
    document.addEventListener('gesturestart', preventGesture, { passive: false });
    document.addEventListener('gesturechange', preventGesture, { passive: false });
    document.addEventListener('gestureend', preventGesture, { passive: false });
    
    // Context menu prevention
    document.addEventListener('contextmenu', preventContextMenu);
    
    // Keyboard and mouse prevention
    document.addEventListener('keydown', preventKeyboardZoom);
    document.addEventListener('wheel', preventWheelZoom, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.removeEventListener('wheel', preventWheelZoom);
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