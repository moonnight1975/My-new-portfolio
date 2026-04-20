import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Certificates', to: '/certificates' },
  { label: 'About', to: '/about' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <nav
      className="relative z-10"
      aria-label="Primary"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="nav-shell">
        <Link
          to="/"
          aria-label="Litto.dev home"
          className="nav-brand"
        >
          Litto.dev
          <sup style={{ fontSize: '0.75rem', verticalAlign: 'super' }}>®</sup>
        </Link>

        <ul className="nav-links-desktop">
          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `velorah-nav-link${isActive ? ' is-active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link
            to="/projects"
            id="nav-cta-view-work"
            className="liquid-glass nav-cta nav-interactive"
          >
            View Work
          </Link>
        </div>

        <button
          type="button"
          className="liquid-glass nav-menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen(open => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={`nav-mobile-panel${isMenuOpen ? ' is-open' : ''}`}
      >
        <div className="nav-mobile-panel-inner">
          <ul className="nav-mobile-list">
            {navLinks.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `nav-mobile-link${isActive ? ' is-active' : ''}`
                  }
                  onClick={handleMenuClose}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <a
            href="mailto:pappachanlitto@gmail.com"
            className="liquid-glass nav-mobile-contact nav-interactive"
            onClick={handleMenuClose}
          >
            Contact Me
          </a>
        </div>
      </div>

      <style>{`
        .nav-shell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.5rem 2rem;
          max-width: 80rem;
          margin: 0 auto;
        }

        .nav-brand {
          font-family: 'Instrument Serif', serif;
          font-size: 1.875rem;
          letter-spacing: -0.02em;
          color: hsl(var(--foreground));
          text-decoration: none;
          line-height: 1;
          flex-shrink: 0;
        }

        .nav-links-desktop {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          align-items: center;
        }

        .velorah-nav-link {
          font-size: 0.875rem;
          text-decoration: none;
          color: hsl(var(--muted-foreground));
          transition: color 0.2s ease;
        }

        .velorah-nav-link:hover,
        .velorah-nav-link.is-active {
          color: hsl(var(--foreground));
        }

        .nav-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          min-width: 9rem;
        }

        .nav-cta,
        .nav-mobile-contact {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          padding: 0.875rem 1.5rem;
          font-size: 0.875rem;
          color: hsl(var(--foreground));
          text-decoration: none;
          background: none;
        }

        .nav-interactive {
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .nav-interactive:hover {
          transform: translateY(-1px) scale(1.02);
        }

        .nav-menu-toggle {
          display: none;
          width: 3rem;
          height: 3rem;
          border-radius: 9999px;
          align-items: center;
          justify-content: center;
          gap: 0.22rem;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
        }

        .nav-menu-toggle span {
          width: 1rem;
          height: 1.5px;
          background: hsl(var(--foreground));
          border-radius: 9999px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .nav-mobile-panel {
          display: none;
        }

        @media (max-width: 767px) {
          .nav-shell {
            padding: 1rem 1.25rem;
          }

          .nav-links-desktop,
          .nav-actions {
            display: none;
          }

          .nav-menu-toggle {
            display: inline-flex;
          }

          .nav-mobile-panel {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.25s ease, opacity 0.25s ease, margin 0.25s ease;
            opacity: 0;
            margin: 0 1.25rem;
          }

          .nav-mobile-panel.is-open {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-bottom: 1rem;
          }

          .nav-mobile-panel-inner {
            overflow: hidden;
            padding: 0 0.25rem;
          }

          .nav-mobile-list {
            list-style: none;
            display: grid;
            gap: 0.5rem;
            padding: 0.35rem 0 0.75rem;
          }

          .nav-mobile-link,
          .nav-mobile-contact {
            display: block;
            width: 100%;
            padding: 0.95rem 1rem;
            border-radius: 1rem;
            text-decoration: none;
            color: hsl(var(--muted-foreground));
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          }

          .nav-mobile-link.is-active,
          .nav-mobile-link:hover,
          .nav-mobile-contact:hover {
            color: hsl(var(--foreground));
            border-color: rgba(255, 255, 255, 0.18);
            background: rgba(255, 255, 255, 0.08);
          }

          .nav-mobile-contact {
            text-align: center;
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
