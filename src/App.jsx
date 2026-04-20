import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import useMediaQuery, { ENHANCED_UI_QUERY } from './hooks/useMediaQuery';
import './index.css';

const About = lazy(() => import('./pages/About'));
const Project = lazy(() => import('./pages/Project'));
const Certificate = lazy(() => import('./pages/Certificate'));
const Cursor = lazy(() => import('./components/Cursor'));
const BackgroundScene = lazy(() => import('./components/BackgroundScene'));

const App = () => {
    const canUseDesktopEffects = useMediaQuery(ENHANCED_UI_QUERY);

    return (
        <Router>
            {canUseDesktopEffects ? (
                <Suspense fallback={null}>
                    <BackgroundScene />
                    <Cursor />
                </Suspense>
            ) : null}
            <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Project />} />
                    <Route path="/certificates" element={<Certificate />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
