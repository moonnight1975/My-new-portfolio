import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const navLinkClassName = ({ isActive }) =>
    `nav-link${isActive ? ' active' : ''}`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <style>{`
        .navbar-shell {
            position: fixed;
            top: 18px;
            left: 0;
            right: 0;
            padding: 0 16px;
            z-index: 120;
            pointer-events: none;
        }
        .navbar {
            width: min(1200px, 100%);
            margin: 0 auto;
            padding: 14px 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 18px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            background: rgba(8, 13, 25, 0.78);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            box-shadow: 0 14px 38px rgba(0, 0, 0, 0.28);
            pointer-events: auto;
        }
        .logo {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-main);
            text-decoration: none;
            letter-spacing: 0.08em;
            white-space: nowrap;
        }
        .nav-panel {
            display: flex;
            align-items: center;
        }
        .menu-toggle {
            display: none;
            width: 48px;
            height: 48px;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            background: rgba(255, 255, 255, 0.06);
            color: var(--text-main);
        }
        .nav-links {
            display: flex;
            gap: 10px;
            list-style: none;
            align-items: center;
        }
        .nav-link {
            color: var(--text-main);
            text-decoration: none;
            font-weight: 500;
            font-size: 15px;
            position: relative;
            padding: 10px 16px;
            border-radius: 999px;
            transition: color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        .nav-link.active {
            color: #03111f;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
        }
        .nav-link::after {
            content: '';
            position: absolute;
            inset-inline: 16px;
            bottom: 6px;
            width: calc(100% - 32px);
            height: 2px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            opacity: 0;
            transform: scaleX(0.4);
            transition: width 0.3s ease;
        }
        .nav-link:hover:not(.active) {
            color: var(--primary);
            background: rgba(255, 255, 255, 0.05);
        }
        .nav-link:hover:not(.active)::after {
            opacity: 1;
            transform: scaleX(1);
        }
        .menu-icon {
            display: block;
            width: 18px;
            height: 2px;
            background: currentColor;
            border-radius: 999px;
            position: relative;
            transition: transform 0.3s ease, background 0.3s ease;
        }
        .menu-icon::before,
        .menu-icon::after {
            content: '';
            position: absolute;
            left: 0;
            width: 18px;
            height: 2px;
            border-radius: 999px;
            background: currentColor;
            transition: transform 0.3s ease, top 0.3s ease;
        }
        .menu-icon::before {
            top: -6px;
        }
        .menu-icon::after {
            top: 6px;
        }
        .menu-toggle.open .menu-icon {
            background: transparent;
        }
        .menu-toggle.open .menu-icon::before {
            top: 0;
            transform: rotate(45deg);
        }
        .menu-toggle.open .menu-icon::after {
            top: 0;
            transform: rotate(-45deg);
        }
        @media (max-width: 840px) {
            .navbar-shell {
                top: 14px;
            }
            .navbar {
                border-radius: 28px;
                padding: 14px 16px;
            }
            .menu-toggle {
                display: inline-flex;
            }
            .nav-panel {
                position: absolute;
                top: calc(100% + 12px);
                left: 0;
                right: 0;
                padding: 0 16px;
                opacity: 0;
                transform: translateY(-12px);
                pointer-events: none;
                transition: opacity 0.28s ease, transform 0.28s ease;
            }
            .nav-panel.open {
                opacity: 1;
                transform: translateY(0);
                pointer-events: auto;
            }
            .nav-links {
                width: 100%;
                padding: 14px;
                border-radius: 24px;
                flex-direction: column;
                align-items: stretch;
                gap: 8px;
                background: rgba(8, 13, 25, 0.94);
                border: 1px solid rgba(255, 255, 255, 0.12);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                box-shadow: 0 14px 40px rgba(0, 0, 0, 0.34);
            }
            .nav-link {
                display: block;
                padding: 14px 16px;
            }
            .nav-link::after {
                display: none;
            }
        }
        @media (max-width: 480px) {
            .logo {
                font-size: 22px;
            }
        }
      `}</style>
      <div className="navbar-shell">
        <nav className="navbar" aria-label="Primary">
          <Link to="/" className="logo" onClick={closeMenu}>Litto.</Link>

          <button
            type="button"
            className={`menu-toggle${isMenuOpen ? ' open' : ''}`}
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="menu-icon" />
          </button>

          <div className={`nav-panel${isMenuOpen ? ' open' : ''}`}>
            <ul id="site-navigation" className="nav-links">
              <li><NavLink to="/about" className={navLinkClassName} onClick={closeMenu}>About</NavLink></li>
              <li><NavLink to="/projects" className={navLinkClassName} onClick={closeMenu}>Projects</NavLink></li>
              <li><NavLink to="/certificates" className={navLinkClassName} onClick={closeMenu}>Certificates</NavLink></li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
