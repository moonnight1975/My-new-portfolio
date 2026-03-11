import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <style>{`
        .navbar {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 1200px;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
            background: transparent;
            transition: all 0.3s ease;
        }
        .logo {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-main);
            text-decoration: none;
            letter-spacing: 1px;
            text-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
        }
        .nav-links {
            display: flex;
            gap: 30px;
            list-style: none;
        }
        .nav-link {
            color: var(--text-main);
            text-decoration: none;
            font-weight: 500;
            font-size: 16px;
            position: relative;
            padding: 5px 0;
            transition: color 0.3s ease;
        }
        .nav-link.active {
            color: var(--primary);
        }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            transition: width 0.3s ease;
        }
        .nav-link:hover {
            color: var(--primary);
        }
        .nav-link:hover::after {
            width: 100%;
        }
        @media (max-width: 768px) {
            .navbar {
                width: 95%;
                padding: 15px;
                flex-direction: column;
                gap: 15px;
            }
            .nav-links {
                gap: 20px;
                font-size: 14px;
            }
        }
      `}</style>
      <nav className="navbar">
        <Link to="/" className="logo">Litto.</Link>
        <ul className="nav-links">
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          <li><NavLink to="/projects" className="nav-link">Projects</NavLink></li>
          <li><NavLink to="/certificates" className="nav-link">Certificates</NavLink></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
