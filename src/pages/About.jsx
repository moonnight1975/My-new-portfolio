import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useMediaQuery, { ENHANCED_UI_QUERY } from '../hooks/useMediaQuery';

const About = () => {
    const heroContentRef = useRef(null);
    const canUseDesktopEffects = useMediaQuery(ENHANCED_UI_QUERY);

    useEffect(() => {
        if (!canUseDesktopEffects) {
            return undefined;
        }

        let removeMouseListener = () => {};

        const context = gsap.context(() => {
            const timeline = gsap.timeline();

            timeline
                .from(".hero-content-about", {
                    opacity: 0,
                    scale: 0.94,
                    y: 20,
                    duration: 0.8,
                    ease: "power3.out"
                })
                .from(".headline-about", {
                    opacity: 0,
                    y: 18,
                    duration: 0.55,
                    ease: "power2.out"
                }, "-=0.45")
                .from(".about-text", {
                    opacity: 0,
                    y: 18,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35")
                .from(".skill-category", {
                    opacity: 0,
                    x: -18,
                    duration: 0.45,
                    stagger: 0.08,
                    ease: "power2.out"
                }, "-=0.25")
                .from(".social-icon", {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.35,
                    stagger: 0.06,
                    ease: "back.out(1.5)"
                }, "-=0.15");

            const rotateX = gsap.quickTo(heroContentRef.current, "rotationX", {
                duration: 0.3,
                ease: "power1.out"
            });
            const rotateY = gsap.quickTo(heroContentRef.current, "rotationY", {
                duration: 0.3,
                ease: "power1.out"
            });

            const onMouseMove = (event) => {
                if (!heroContentRef.current) return;

                const xPos = (event.clientX / window.innerWidth - 0.5) * 2;
                const yPos = (event.clientY / window.innerHeight - 0.5) * 2;

                rotateY(xPos * 4);
                rotateX(-yPos * 4);
            };

            window.addEventListener("mousemove", onMouseMove);
            removeMouseListener = () => {
                window.removeEventListener("mousemove", onMouseMove);
            };
        }, heroContentRef);

        return () => {
            removeMouseListener();
            context.revert();
        };
    }, [canUseDesktopEffects]);

    return (
        <>
            <style>{`
                .hero-about {
                    min-height: 100svh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 132px 5% 64px;
                    position: relative;
                    z-index: 1;
                }
                .hero-content-about {
                    max-width: 860px;
                    width: 100%;
                    padding: clamp(28px, 5vw, 50px);
                    background: rgba(255, 255, 255, 0.04);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 28px;
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                    text-align: center;
                    transform-style: preserve-3d;
                    perspective: 1000px;
                }
                .headline-about {
                    font-size: clamp(2.4rem, 5vw, 3.2rem);
                    font-weight: 700;
                    line-height: 1.1;
                    margin-bottom: 24px;
                    background: linear-gradient(90deg, #fff, #a5a5a5);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .about-text {
                    font-size: clamp(1rem, 2vw, 1.1rem);
                    color: var(--text-muted);
                    line-height: 1.8;
                    margin-bottom: 36px;
                }
                .about-text b {
                    color: var(--primary);
                    font-weight: 600;
                }
                .social-links {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .social-icon {
                    color: var(--text-muted);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }
                .social-icon:hover {
                    color: #fff;
                    background: rgba(255, 255, 255, 0.15);
                    transform: translateY(-3px) scale(1.1);
                    border-color: var(--primary);
                    box-shadow: 0 0 15px rgba(79, 172, 254, 0.5);
                }
                .skills-container {
                    margin-bottom: 36px;
                    text-align: left;
                }
                .skill-category {
                    margin-bottom: 25px;
                }
                .skill-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: var(--primary);
                    margin-bottom: 15px;
                    display: block;
                }
                .skill-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .skill-tag {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    color: var(--text-main);
                    transition: all 0.3s ease;
                    cursor: default;
                }
                .skill-tag:hover {
                    background: rgba(255, 255, 255, 0.2);
                    border-color: var(--primary);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(79, 172, 254, 0.2);
                }
                @media (max-width: 768px) {
                    .hero-about {
                        padding: 112px 5% 48px;
                    }
                    .hero-content-about {
                        padding: 28px 20px;
                        text-align: left;
                    }
                    .social-links {
                        justify-content: flex-start;
                    }
                }
            `}</style>
            <section className="hero-about">
                <div className="hero-content-about" ref={heroContentRef}>
                    <h1 className="headline-about">About Me</h1>
                    <div className="about-text">
                        <p>
                            I am <b>Litto Biju Pappachan</b>, a motivated Computer Science
                            Engineering student with strong problem-solving skills and a passion for
                            software development and UI design. Skilled in programming, data
                            structures, and database management. Interested in building efficient,
                            user-friendly applications and contributing to innovative tech projects.
                        </p>
                    </div>

                    <div className="skills-container">
                        <div className="skill-category">
                            <span className="skill-title">Languages</span>
                            <div className="skill-tags">
                                <span className="skill-tag">C</span>
                                <span className="skill-tag">C++</span>
                                <span className="skill-tag">Python</span>
                                <span className="skill-tag">Java</span>
                                <span className="skill-tag">JavaScript</span>
                                <span className="skill-tag">Swift</span>
                                <span className="skill-tag">Kotlin</span>
                                <span className="skill-tag">SQL</span>
                            </div>
                        </div>

                        <div className="skill-category">
                            <span className="skill-title">Web & Databases</span>
                            <div className="skill-tags">
                                <span className="skill-tag">HTML5</span>
                                <span className="skill-tag">CSS3</span>
                                <span className="skill-tag">MySQL</span>
                                <span className="skill-tag">SQLite</span>
                                <span className="skill-tag">PostgreSQL</span>
                            </div>
                        </div>

                        <div className="skill-category">
                            <span className="skill-title">Tools & IDEs</span>
                            <div className="skill-tags">
                                <span className="skill-tag">Git</span>
                                <span className="skill-tag">GitHub</span>
                                <span className="skill-tag">Android Studio</span>
                                <span className="skill-tag">VS Code</span>
                                <span className="skill-tag">Xcode</span>
                                <span className="skill-tag">Unity</span>
                                <span className="skill-tag">AutoCAD</span>
                            </div>
                        </div>
                    </div>

                    <div className="social-links">
                        {/* GitHub */}
                        <a href="https://github.com/moonnight1975" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52 0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.64 7.64 0 018 4.69c.68 0 1.36.09 2 .26 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/in/litto-biju-pappachan-568015336/" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.6 19h-2.4v-9h2.4v9zm-1.2-10.29c-.77 0-1.4-.63-1.4-1.4 0-.77.63-1.4 1.4-1.4s1.4.63 1.4 1.4c0 .77-.63 1.4-1.4 1.4zm13.8 10.29h-2.4v-4.78c0-1.14-.02-2.61-1.59-2.61-1.6 0-1.85 1.25-1.85 2.53v4.86h-2.4v-9h2.31v1.23h.03c.32-.6 1.11-1.23 2.28-1.23 2.44 0 2.89 1.61 2.89 3.71v5.29z" />
                            </svg>
                        </a>
                        {/* X */}
                        <a href="https://x.com/Litto31102469" target="_blank" rel="noreferrer" className="social-icon" aria-label="X">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 512 512">
                                <path d="M389.2 48h70.6L305.7 224.2 480 464H343.5l-94.3-129.7L134 464H63.2L219.8 275.5 48 48h139.2l85.2 117.8L389.2 48zM366.4 421.8h39.1L151.1 90.3h-42L366.4 421.8z" />
                            </svg>
                        </a>
                        {/* Gmail */}
                        <a href="mailto:pappachanlitto@gmail.com" className="social-icon" aria-label="Email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 13.065 2 6.5V18h20V6.5zM12 11L2 4h20z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
