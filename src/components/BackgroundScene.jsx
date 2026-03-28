import { useEffect } from 'react';

const SCRIPT_ID = 'spline-viewer-script';
const SPLINE_VIEWER_URL =
  'https://unpkg.com/@splinetool/viewer@1.10.52/build/spline-viewer.js';
const SPLINE_SCENE_URL = 'https://prod.spline.design/zEXEFqIokKEI5hpO/scene.splinecode';

const BackgroundScene = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || document.getElementById(SCRIPT_ID)) {
      return undefined;
    }

    let cancelled = false;
    let idleHandle;
    let timeoutHandle;

    const injectScript = () => {
      if (cancelled || document.getElementById(SCRIPT_ID)) {
        return;
      }

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'module';
      script.src = SPLINE_VIEWER_URL;
      document.head.appendChild(script);
    };

    if ('requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(injectScript, { timeout: 1600 });
    } else {
      timeoutHandle = window.setTimeout(injectScript, 900);
    }

    return () => {
      cancelled = true;

      if (typeof idleHandle === 'number' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }

      if (typeof timeoutHandle === 'number') {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, []);

  return <spline-viewer className="background-scene" url={SPLINE_SCENE_URL} />;
};

export default BackgroundScene;
