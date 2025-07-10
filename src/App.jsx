import { useEffect } from 'react';
import usePreventBackNavigation from './hooks/usePreventBackNavigation';
import Routes from './Routes';

function App() {
  usePreventBackNavigation()

  useEffect(() => {
    // Block gesture zoom (iOS Safari)
    const preventGesture = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('gesturechange', preventGesture);
    document.addEventListener('gestureend', preventGesture);

    // Block context menu (long press)
    const preventContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', preventContextMenu);

    // Enhanced touch event handling for zoom prevention
    let lastTouchEnd = 0;
    let touchStartDistance = 0;
    let touchCount = 0;

    const preventPinchZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventDoubleTapZoom = (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    const handleTouchStart = (e) => {
      touchCount = e.touches.length;
      
      // Prevent multi-touch gestures
      if (touchCount > 1) {
        e.preventDefault();
        
        // Calculate distance between first two touches for pinch detection
        if (touchCount === 2) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          touchStartDistance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2)
          );
        }
      }
    };

    const handleTouchMove = (e) => {
      // Prevent any multi-touch movement
      if (e.touches.length > 1) {
        e.preventDefault();
      }
      
      // Additional check for pinch gestures
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.sqrt(
          Math.pow(touch2.pageX - touch1.pageX, 2) +
          Math.pow(touch2.pageY - touch1.pageY, 2)
        );
        
        // If distance changed significantly, it's likely a pinch
        if (Math.abs(currentDistance - touchStartDistance) > 10) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e) => {
      // Prevent double tap zoom
      preventDoubleTapZoom(e);
      
      // Reset touch count
      touchCount = 0;
      touchStartDistance = 0;
    };

    // Add enhanced touch event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('touchstart', preventPinchZoom, { passive: false });

    // Prevent wheel zoom (for devices with trackpad/mouse)
    const preventWheelZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
    document.addEventListener('wheel', preventWheelZoom, { passive: false });

    // Prevent keyboard zoom shortcuts
    const preventKeyboardZoom = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
      // Prevent F11 fullscreen toggle
      if (e.key === 'F11') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', preventKeyboardZoom);

    // Prevent selection and drag
    const preventSelection = (e) => {
      e.preventDefault();
    };
    document.addEventListener('selectstart', preventSelection);
    document.addEventListener('dragstart', preventSelection);

    // Additional iOS specific handlers
    const preventIOSBounce = (e) => {
      if (e.target === document.body) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventIOSBounce, { passive: false });

    // Cleanup function
    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchstart', preventPinchZoom);
      document.removeEventListener('wheel', preventWheelZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.removeEventListener('selectstart', preventSelection);
      document.removeEventListener('dragstart', preventSelection);
      document.removeEventListener('touchmove', preventIOSBounce);
    };
  }, []);

  useEffect(() => {
    const isPWA =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isPWA && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    // Additional kiosk mode setup
    const setupKioskMode = () => {
      // Disable browser context menu
      document.addEventListener('contextmenu', (e) => e.preventDefault());
      
      // Disable text selection
      document.onselectstart = () => false;
      document.onmousedown = () => false;
      
      // Disable drag and drop
      document.ondragstart = () => false;
      
      // Hide cursor after inactivity (optional)
      let cursorTimeout;
      const hideCursor = () => {
        document.body.style.cursor = 'none';
      };
      const showCursor = () => {
        document.body.style.cursor = 'default';
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(hideCursor, 5000); // Hide after 5 seconds
      };
      
      document.addEventListener('mousemove', showCursor);
      document.addEventListener('touchstart', showCursor);
      
      // Initial cursor hide timer
      cursorTimeout = setTimeout(hideCursor, 5000);
    };

    setupKioskMode();
  }, []);

  return (
    <Routes />
  );
}

export default App;