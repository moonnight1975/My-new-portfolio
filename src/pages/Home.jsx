import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const counterRef = useRef(null);
    const heroContentRef = useRef(null);
    const sectionsRef = useRef([]);
    // preloader container
    const preloaderRef = useRef(null);

    useEffect(() => {
        // Basic counter animation
        let count = { val: 0 };
        if (counterRef.current) {
            gsap.to(count, {
                val: 100,
                duration: 2.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.textContent = Math.floor(count.val);
                    }
                },
                onComplete: () => {
                    if (preloaderRef.current) {
                        gsap.to(preloaderRef.current, {
                            yPercent: -100,
                            duration: 1,
                            ease: "power4.inOut"
                        });
                    }
                    if (heroContentRef.current) {
                        gsap.from(heroContentRef.current, {
                            y: 100,
                            opacity: 0,
                            duration: 1.2,
                            delay: 0.5,
                            ease: "power3.out"
                        });
                    }
                }
            });
        }

        // Hero parallax
        if (heroContentRef.current) {
            gsap.to(heroContentRef.current, {
                y: 100,
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // Cards animation
        sectionsRef.current.forEach((section) => {
            if (!section) return;
            const title = section.querySelector(".section-title");
            const cards = section.querySelectorAll(".feature-card");

            if (title) {
                gsap.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    }
                });
            }

            if (cards.length > 0) {
                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <>
            <style>{`
        /* Preloader */
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 9999;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            padding: 50px;
        }
        .counter {
            font-size: 120px;
            font-weight: 700;
            color: var(--primary);
            line-height: 1;
            font-variant-numeric: tabular-nums;
        }
        .hero {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 5%;
            position: relative;
            z-index: 1;
            text-align: center;
        }
        .hero-content {
            max-width: 900px;
            width: 100%;
            padding: 40px;
            border-radius: 20px;
        }
        .greeting {
            font-size: 24px;
            color: var(--primary);
            font-weight: 600;
            margin-bottom: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .headline {
            font-size: 64px;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 20px;
            background: linear-gradient(90deg, #fff, #a5a5a5);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle {
            font-size: 24px;
            color: var(--text-muted);
            margin-bottom: 40px;
            font-weight: 300;
        }
        .cta-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
        }
        .btn {
            padding: 15px 35px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .btn-primary {
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            color: #000;
            border: none;
            box-shadow: 0 0 20px rgba(79, 172, 254, 0.4);
        }
        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 30px rgba(79, 172, 254, 0.6);
        }
        .btn-secondary {
            background: transparent;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: #fff;
        }
        section:not(.hero) {
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 80px 5%;
            position: relative;
        }
        .highlights-container {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            max-width: 1200px;
        }
        .feature-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
            width: 100%;
            max-width: 350px;
            text-align: left;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(50px);
        }
        .feature-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.08);
            border-color: var(--primary);
            box-shadow: 0 10px 30px rgba(79, 172, 254, 0.2);
        }
        .feature-icon {
            font-size: 32px;
            color: var(--primary);
            margin-bottom: 20px;
            display: block;
        }
        .feature-title {
            font-size: 20px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 10px;
        }
        .feature-desc {
            font-size: 14px;
            color: var(--text-muted);
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .read-more {
            color: var(--secondary);
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transition: gap 0.3s ease;
        }
        .read-more:hover {
            gap: 10px;
        }
        .about-highlight {
            max-width: 800px;
            text-align: center;
            background: rgba(0, 0, 0, 0.6);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        footer {
            padding: 40px;
            text-align: center;
            color: var(--text-muted);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            background: #000;
            position: relative;
            z-index: 2;
        }
        @media (max-width: 768px) {
            .headline { font-size: 42px; }
            .subtitle { font-size: 18px; }
            .cta-buttons { flex-direction: column; }
        }
      `}</style>

            {/* Preloader */}
            <div className="preloader" ref={preloaderRef}>
                <div className="counter" ref={counterRef}>0</div>
            </div>

            {/* Content */}
            <section className="hero">
                <div className="hero-content" ref={heroContentRef}>
                    <p className="greeting">Hello, I am</p>
                    <h1 className="headline">Litto Biju Pappachan</h1>
                    <h2 className="subtitle">Computer Science Engineer & Creative Developer</h2>

                    <div className="cta-buttons">
                        <Link to="/projects" className="btn btn-primary">View My Work</Link>
                        <Link to="/about" className="btn btn-secondary">About Me</Link>
                    </div>
                </div>
            </section>

            {/* Projects Highlight */}
            <section id="projects" ref={el => sectionsRef.current[0] = el}>
                <h2 className="section-title">Featured Projects</h2>
                <div className="highlights-container">
                    <div className="feature-card">
                        <span className="feature-icon">💻</span>
                        <h3 className="feature-title">Portfolio Platform</h3>
                        <p className="feature-desc">A modern, responsive portfolio built with best practices and smooth animations.</p>
                        <Link to="/projects" className="read-more">View Project →</Link>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">📒</span>
                        <h3 className="feature-title">Digital Contact Book</h3>
                        <p className="feature-desc">Efficient contact management system with advanced search capabilities.</p>
                        <Link to="/projects" className="read-more">View Project →</Link>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🚀</span>
                        <h3 className="feature-title">More Coming Soon</h3>
                        <p className="feature-desc">Constantly building and experimenting with new technologies.</p>
                        <Link to="/projects" className="read-more">See All →</Link>
                    </div>
                </div>
            </section>

            {/* Certificates Highlight */}
            <section id="certificates" ref={el => sectionsRef.current[1] = el}>
                <h2 className="section-title">Latest Certifications</h2>
                <div className="highlights-container">
                    <div className="feature-card">
                        <span className="feature-icon">🏆</span>
                        <h3 className="feature-title">Google AI Essentials</h3>
                        <p className="feature-desc">Professional certification in Artificial Intelligence fundamentals.</p>
                        <Link to="/certificates" className="read-more">Verify →</Link>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">📜</span>
                        <h3 className="feature-title">MESA Recognition</h3>
                        <p className="feature-desc">Mechanical Engineering Students Association active participation award.</p>
                        <Link to="/certificates" className="read-more">Verify →</Link>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🥇</span>
                        <h3 className="feature-title">Poster Competition</h3>
                        <p className="feature-desc">3rd Prize winner in creative design competition.</p>
                        <Link to="/certificates" className="read-more">Verify →</Link>
                    </div>
                </div>
            </section>

            {/* About Highlight */}
            <section id="about" ref={el => sectionsRef.current[2] = el}>
                <div className="about-highlight feature-card" style={{ width: "100%", maxWidth: "800px", padding: "50px" }}>
                    <h2 className="section-title" style={{ marginBottom: "20px" }}>Who Am I?</h2>
                    <p className="feature-desc" style={{ fontSize: "18px", color: "#ccc" }}>
                        I am <b>Litto Biju Pappachan</b>, a Computer Science Engineering student passionate about crafting digital experiences.
                        Whether it's building robust backends or designing fluid frontends, I love bringing ideas to life through code.
                    </p>
                    <div className="cta-buttons" style={{ marginTop: "30px" }}>
                        <Link to="/about" className="btn btn-primary">Read Full Bio</Link>
                        <a href="mailto:pappachanlitto@gmail.com" className="btn btn-secondary">Contact Me</a>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; 2026 Litto Biju Pappachan. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Home;
