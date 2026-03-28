import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMediaQuery, { ENHANCED_UI_QUERY } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const counterRef = useRef(null);
    const heroContentRef = useRef(null);
    const sectionsRef = useRef([]);
    const preloaderRef = useRef(null);
    const canUseDesktopEffects = useMediaQuery(ENHANCED_UI_QUERY);

    useEffect(() => {
        if (!canUseDesktopEffects) {
            return undefined;
        }

        const context = gsap.context(() => {
            let count = { val: 0 };

            if (counterRef.current) {
                gsap.to(count, {
                    val: 100,
                    duration: 1.1,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (counterRef.current) {
                            counterRef.current.textContent = Math.floor(count.val);
                        }
                    },
                    onComplete: () => {
                        if (preloaderRef.current) {
                            gsap.to(preloaderRef.current, {
                                yPercent: -100,
                                duration: 0.7,
                                ease: "power4.inOut"
                            });
                        }
                        if (heroContentRef.current) {
                            gsap.from(heroContentRef.current, {
                                y: 48,
                                opacity: 0,
                                duration: 0.9,
                                delay: 0.15,
                                ease: "power3.out"
                            });
                        }
                    }
                });
            }

            if (heroContentRef.current) {
                gsap.to(heroContentRef.current, {
                    y: 70,
                    scrollTrigger: {
                        trigger: ".hero",
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }

            sectionsRef.current.forEach((section) => {
                if (!section) return;

                const title = section.querySelector(".section-title");
                const cards = section.querySelectorAll(".feature-card");

                if (title) {
                    gsap.from(title, {
                        opacity: 0,
                        y: 28,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 76%",
                        }
                    });
                }

                if (cards.length > 0) {
                    gsap.from(cards, {
                        opacity: 0,
                        y: 40,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 76%",
                        }
                    });
                }
            });
        });

        return () => context.revert();
    }, [canUseDesktopEffects]);

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
            pointer-events: none;
        }
        .counter {
            font-size: clamp(4rem, 10vw, 7.5rem);
            font-weight: 700;
            color: var(--primary);
            line-height: 1;
            font-variant-numeric: tabular-nums;
        }
        .hero {
            min-height: 100svh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: clamp(110px, 16vw, 150px) 5% 72px;
            position: relative;
            z-index: 1;
            text-align: center;
        }
        .hero-content {
            max-width: 920px;
            width: 100%;
            padding: clamp(20px, 4vw, 40px);
            border-radius: 28px;
            background: linear-gradient(180deg, rgba(8, 13, 25, 0.6), rgba(8, 13, 25, 0.18));
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22);
        }
        .greeting {
            font-size: clamp(0.95rem, 2vw, 1.4rem);
            color: var(--primary);
            font-weight: 600;
            margin-bottom: 14px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
        }
        .headline {
            font-size: clamp(2.85rem, 8vw, 4.4rem);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 18px;
            background: linear-gradient(90deg, #fff, #a5a5a5);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle {
            font-size: clamp(1rem, 2.4vw, 1.55rem);
            color: var(--text-muted);
            margin-bottom: 34px;
            font-weight: 300;
        }
        .cta-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn {
            padding: 15px 28px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
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
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 72px 5%;
            position: relative;
        }
        .highlights-container {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
            width: 100%;
            max-width: 1200px;
        }
        .feature-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 28px;
            width: 100%;
            text-align: left;
            transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
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
            max-width: 880px;
            text-align: left;
            background: rgba(0, 0, 0, 0.6);
        }
        .about-highlight-card {
            max-width: 880px;
            padding: clamp(28px, 5vw, 50px);
        }
        .about-highlight-title {
            margin-bottom: 18px;
        }
        .about-highlight-text {
            font-size: 18px;
            color: var(--text-muted);
            line-height: 1.75;
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
        @media (max-width: 1024px) {
            .highlights-container {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
        @media (max-width: 768px) {
            .hero {
                align-items: flex-start;
                text-align: left;
            }
            .hero-content {
                padding: 22px;
            }
            .cta-buttons {
                flex-direction: column;
                align-items: stretch;
            }
            .btn {
                width: 100%;
                text-align: center;
            }
            section:not(.hero) {
                padding: 56px 5%;
            }
            .highlights-container {
                grid-template-columns: 1fr;
            }
            .feature-card {
                padding: 24px;
            }
            .about-highlight-text {
                font-size: 16px;
            }
            footer {
                padding: 28px 20px 40px;
            }
        }
      `}</style>

            {canUseDesktopEffects ? (
                <div className="preloader" ref={preloaderRef}>
                    <div className="counter" ref={counterRef}>0</div>
                </div>
            ) : null}

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

            <section id="about" ref={el => sectionsRef.current[2] = el}>
                <div className="about-highlight about-highlight-card feature-card">
                    <h2 className="section-title about-highlight-title">Who Am I?</h2>
                    <p className="about-highlight-text">
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
