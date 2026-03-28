# Litto Portfolio

A personal portfolio website built with React and Vite to showcase projects, certifications, skills, and contact links in a polished single-page-style experience with routed sections.

Live site: [litto.vercel.app](https://litto.vercel.app/)

## Overview

This project is a modern portfolio for Litto Biju Pappachan. It highlights:

- a landing page with featured work and quick navigation
- an about page with skills and social links
- a projects page with project cards and external links
- a certificates page with certificate previews and direct access to the full images

The app was recently improved to be more mobile-friendly and faster by reducing heavy desktop-only effects on smaller devices, lazy-loading non-home routes, and simplifying the certificate experience on phones.

## Tech Stack

- React 19
- Vite 7
- React Router 7
- GSAP
- Tailwind CSS 4

## Features

- Responsive layout optimized for mobile, tablet, and desktop
- Mobile navigation menu for smaller screens
- Lazy-loaded routes for secondary pages
- Desktop-only enhanced effects such as custom cursor and Spline background
- Project cards with GitHub and live demo links
- Certificate gallery with lazy-loaded images
- Smooth page and section animations using GSAP

## Pages

- `/` home page with hero section, featured projects, certifications, and about preview
- `/about` profile summary, skills, and social/contact links
- `/projects` project showcase grid
- `/certificates` certificate gallery

## Getting Started

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Available Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Project Structure

```text
src/
  components/
    BackgroundScene.jsx
    Cursor.jsx
    Navbar.jsx
  hooks/
    useMediaQuery.js
  pages/
    About.jsx
    Certificate.jsx
    Home.jsx
    Project.jsx
  App.jsx
  index.css
  main.jsx
public/
  ...certificate and image assets
```

## Performance Notes

Recent optimizations include:

- route-level code splitting for non-home pages
- deferred loading of the Spline background
- disabling expensive desktop motion effects on mobile and reduced-motion contexts
- lighter cursor animation handling
- lazy-loaded certificate images

## Build Status

The project currently passes:

- `npm run build`
- `npm run lint`

## Author

Litto Biju Pappachan

- GitHub: [moonnight1975](https://github.com/moonnight1975)
- LinkedIn: [litto-biju-pappachan-568015336](https://www.linkedin.com/in/litto-biju-pappachan-568015336/)
