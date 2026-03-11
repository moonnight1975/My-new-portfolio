import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Certificate from './pages/Certificate';
import './index.css';

const App = () => {
    return (
        <Router>
            <Cursor />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/certificates" element={<Certificate />} />
            </Routes>
        </Router>
    );
};

export default App;
