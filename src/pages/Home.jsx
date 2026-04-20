import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useMediaQuery from '../hooks/useMediaQuery';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

const HERO_VIDEO_QUERY = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

const canUseLowDataMode = () => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  return Boolean(connection?.saveData) || connection?.effectiveType === '2g';
};

const Home = () => {
  const canStreamHeroVideo = useMediaQuery(HERO_VIDEO_QUERY);
  const [prefersLowDataMode, setPrefersLowDataMode] = useState(() =>
    canUseLowDataMode(),
  );
  const [isVideoReady, setIsVideoReady] = useState(false);
  const shouldRenderVideo =
    canStreamHeroVideo && !prefersLowDataMode && isVideoReady;

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      return undefined;
    }

    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (!connection?.addEventListener) {
      return undefined;
    }

    const handleConnectionChange = () => {
      setPrefersLowDataMode(canUseLowDataMode());
    };

    connection.addEventListener('change', handleConnectionChange);

    return () => {
      connection.removeEventListener('change', handleConnectionChange);
    };
  }, []);

  useEffect(() => {
    if (!canStreamHeroVideo || prefersLowDataMode) {
      return undefined;
    }

    let cancelled = false;
    let idleHandle;
    let timeoutHandle;

    const enableVideo = () => {
      if (!cancelled) {
        setIsVideoReady(true);
      }
    };

    if ('requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(enableVideo, { timeout: 1500 });
    } else {
      timeoutHandle = window.setTimeout(enableVideo, 900);
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
  }, [canStreamHeroVideo, prefersLowDataMode]);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at top, rgba(54, 122, 182, 0.55), transparent 45%), linear-gradient(180deg, #05213a 0%, #04111f 100%)',
      }}
    >
      {shouldRenderVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : null}

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(4, 17, 31, 0.16) 0%, rgba(4, 17, 31, 0.72) 100%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />

        <section
          aria-label="Hero"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '8rem',
            paddingBottom: '10rem',
          }}
        >
          <h1
            className="animate-fade-rise"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: 'clamp(3rem, 9vw, 6rem)',
              lineHeight: 0.95,
              letterSpacing: '-2.46px',
              maxWidth: '80rem',
              color: 'hsl(var(--foreground))',
              margin: 0,
            }}
          >
            I build systems that turn{' '}
            <em
              className="not-italic"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              ideas
            </em>{' '}
            into{' '}
            <em
              className="not-italic"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              working reality.
            </em>
          </h1>

          <p
            className="animate-fade-rise-delay"
            style={{
              color: 'hsl(var(--muted-foreground))',
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              maxWidth: '42rem',
              marginTop: '2rem',
              lineHeight: 1.7,
              fontFamily: 'var(--font-body)',
            }}
          >
            I'm a computer science student focused on building real-world
            projects - from full-stack apps to system-level tools. I enjoy
            turning complex problems into simple, functional solutions.
          </p>

          <Link
            to="/projects"
            id="hero-cta-explore"
            className="liquid-glass animate-fade-rise-delay-2 hero-cta-link"
            style={{
              borderRadius: '9999px',
              paddingLeft: '3.5rem',
              paddingRight: '3.5rem',
              paddingTop: '1.25rem',
              paddingBottom: '1.25rem',
              fontSize: '1rem',
              color: 'hsl(var(--foreground))',
              background: 'none',
              marginTop: '3rem',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
            }}
          >
            Explore Projects
          </Link>
        </section>
      </div>

      <style>{`
        .hero-cta-link {
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .hero-cta-link:hover {
          transform: translateY(-1px) scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Home;
