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

  // Directly derive if we should render video (no more artificial timeout delays)
  const shouldRenderVideo = canStreamHeroVideo && !prefersLowDataMode;

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

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at top center, rgba(79, 172, 254, 0.4) 0%, transparent 55%), linear-gradient(180deg, #051624 0%, #020810 100%)',
      }}
    >
      {shouldRenderVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
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
            'linear-gradient(180deg, rgba(2, 8, 16, 0.25) 0%, rgba(2, 8, 16, 0.8) 100%)',
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
            paddingTop: 'clamp(6rem, 15vh, 10rem)',
            paddingBottom: '10rem',
          }}
        >
          <div className="hero-text-glow"></div>
          <h1
            className="animate-fade-rise"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              maxWidth: '85rem',
              color: 'hsl(var(--foreground))',
              margin: 0,
              position: 'relative',
              zIndex: 2,
              textShadow: '0 4px 24px rgba(0,0,0,0.5)',
            }}
          >
            I build systems that turn{' '}
            <em
              className="not-italic hero-gradient-text"
            >
              ideas
            </em>{' '}
            into{' '}
            <em
              className="not-italic hero-gradient-text"
            >
              working reality.
            </em>
          </h1>

          <p
            className="animate-fade-rise-delay"
            style={{
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              maxWidth: '46rem',
              marginTop: '2.5rem',
              lineHeight: 1.75,
              fontFamily: 'var(--font-body)',
              position: 'relative',
              zIndex: 2,
              fontWeight: 400,
            }}
          >
            I'm a computer science student focused on building real-world
            projects - from full-stack apps to system-level tools. I enjoy
            turning complex problems into simple, functional solutions.
          </p>

          <Link
            to="/projects"
            id="hero-cta-explore"
            className="animate-fade-rise-delay-2 hero-cta-btn"
          >
            <span className="hero-cta-inner">
              Explore Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <div className="hero-cta-bg"></div>
          </Link>
        </section>
      </div>

      <style>{`
        .hero-gradient-text {
          background: linear-gradient(135deg, #fff 20%, #4facfe 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-style: italic;
        }

        .hero-text-glow {
          position: absolute;
          width: 60%;
          height: 400px;
          background: radial-gradient(circle, rgba(79,172,254,0.15) 0%, transparent 60%);
          filter: blur(40px);
          z-index: 1;
          pointer-events: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .hero-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 3.5rem;
          padding: 1.25rem 3.5rem;
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 500;
          color: hsl(var(--foreground));
          text-decoration: none;
          border-radius: 9999px;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 2;
        }

        .hero-cta-inner {
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .hero-cta-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(79, 172, 254, 0.8), rgba(0, 242, 254, 0.8));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .hero-cta-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 30px rgba(79, 172, 254, 0.3);
          border-color: rgba(79, 172, 254, 0.5);
        }

        .hero-cta-btn:hover .hero-cta-bg {
          opacity: 1;
        }

        .hero-cta-btn:hover .hero-cta-inner {
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default Home;
