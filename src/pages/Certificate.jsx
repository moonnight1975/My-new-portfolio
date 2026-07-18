import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useMediaQuery, { ENHANCED_UI_QUERY } from '../hooks/useMediaQuery';
import Navbar from '../components/Navbar'; // Added Navbar for consistency if it's missing, wait, Certificate didn't have Navbar in the snippet but Home did. The user didn't request a Navbar here, but let's just stick to the original structure (no Navbar in Certificate.jsx in the original code).

const certificates = [
    {
        image: '/googlecerti.png',
        alt: 'Google AI Essentials',
        title: 'Google AI Essentials',
        description:
            "Earned the Google AI Essentials certificate by mastering core AI concepts, prompt engineering, and responsible AI practices through Google's professional training program.",
    },
    {
        image: '/DLLE.jpg',
        alt: 'DLLE Certificate',
        title: 'DLLE Certificate',
        description:
            'Recognized by the Department of Lifelong Learning & Extension for active participation in outreach and community engagement programs organized by the college.',
    },
    {
        image: '/MESA.jpeg',
        alt: 'MESA Certificate',
        title: 'MESA Certificate',
        description:
            'Awarded by the Mechanical Engineering Students Association for active involvement and contributions to technical events, workshops, and departmental activities.',
    },
    {
        image: '/POSTER.jpg',
        alt: 'Poster Competition',
        title: 'Poster Making – 3rd Prize',
        description:
            'Secured 3rd place in an inter-collegiate poster making competition, showcasing creativity, design thinking, and the ability to communicate ideas visually.',
    },
    {
        image: '/SIP.jpg',
        alt: 'SIP Certificate',
        title: 'SIP Certificate',
        description:
            'Successfully completed the Student Internship Program (SIP), gaining hands-on industry experience and applying academic knowledge to real-world projects.',
    },
    {
        image: '/anveshnam.jpeg',
        alt: 'Anveshnam Certificate',
        title: 'Anveshnam Certificate',
        description:
            'Participated in Anveshnam — a national-level event featuring an advanced research writing workshop and an inter-collegiate technical paper presentation competition.',
    },
    {
        image: '/bis.jpg',
        alt: 'BIS Certificate',
        title: 'BIS Certificate',
        description:
            'Certified by the Bureau of Indian Standards (BIS) for participation in quality and standards awareness programs, promoting standardization practices in engineering.',
    },
    {
        image: '/cgc.jpg',
        alt: 'Coding Genuis C Certificate',
        title: 'Coding Genuis C Certificate',
        description:
            "Awarded by Coding Genuis C for outstanding dedication and performance, recognizing consistent effort and achievement throughout the program's activities and assessments.",
    },
    {
        image: '/cgjava.jpg',
        alt: 'Coding Genuis Java Certificate',
        title: 'Coding Genuis Java Certificate',
        description:
            'Completed a structured Java programming course covering object-oriented principles, data structures, and application development, demonstrated through hands-on projects.',
    },
    {
        image: '/ioft.jpg',
        alt: 'IOFT Certificate',
        title: 'IOFT Certificate',
        description:
            'Recognized for participation and achievement in the IOFT program, reflecting a commitment to excellence and continuous growth in the domain.',
    },
    {
        image: '/mso_fixed.jpg',
        alt: 'MSO Certificate',
        title: 'MSO Certificate',
        description:
            'Validated proficiency in the Microsoft Office Suite including Word, Excel, and PowerPoint, completing a comprehensive training program focused on productivity and professional documentation.',
    },
    {
        image: '/Certificatemeta_fixed.jpg',
        alt: 'Meta Certificate',
        title: 'Meta Certificate',
        description:
            "Earned a professional certificate from Meta, gaining industry-recognized skills and practical knowledge in the domain covered by Meta's learning program.",
    },
    {
        image: '/sql_fixed.jpg',
        alt: 'SQL Certificate',
        title: 'SQL Certificate',
        description:
            'Demonstrated expertise in SQL by completing a structured database course covering queries, joins, aggregations, and data management using relational databases.',
    },
];

const Certificate = () => {
    const cardsRef = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const canUseDesktopEffects = useMediaQuery(ENHANCED_UI_QUERY);
    const total = certificates.length;

    useEffect(() => {
        if (!canUseDesktopEffects) {
            // Reset transforms if toggled to mobile view
            cardsRef.current.forEach(card => {
                if (card) gsap.set(card, { clearProps: "all" });
            });
            return;
        }

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            // Calculate shortest distance in a circular array
            let diff = i - currentIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const absDiff = Math.abs(diff);

            // Hide cards that are far away
            if (absDiff > 3) {
                gsap.to(card, {
                    opacity: 0,
                    scale: 0.5,
                    xPercent: diff > 0 ? 300 : -300,
                    zIndex: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    pointerEvents: "none",
                });
                return;
            }

            // 3D positioning logic
            const scale = isCenter ? 1 : 1 - (absDiff * 0.15);
            // Move items horizontally out from center
            const xPercent = diff * 125; 
            const opacity = isCenter ? 1 : 1 - (absDiff * 0.25);
            const zIndex = 100 - absDiff;

            gsap.to(card, {
                xPercent: xPercent,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                duration: 0.7,
                ease: "power3.out",
                pointerEvents: isCenter ? "auto" : "none"
            });
        });
    }, [currentIndex, canUseDesktopEffects, total]);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % total);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

    return (
        <div className="certificate-page-bg">
            <style>{`
                .certificate-page-bg {
                    background: radial-gradient(circle at center, #0d2847 0%, #020c1b 100%);
                    min-height: 100vh;
                    overflow: hidden;
                    position: relative;
                }
                .certificates-section {
                    padding: 132px 5% 56px;
                    max-width: 1400px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }
                .page-title {
                    font-size: clamp(2.5rem, 5vw, 3.5rem);
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 50px;
                    background: linear-gradient(90deg, #fff, #a5a5a5);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .certificates-wrapper {
                    width: 100%;
                    position: relative;
                    padding: 20px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                /* Desktop 3D Slider Container */
                .slider-container {
                    position: relative;
                    width: 100%;
                    height: 520px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    perspective: 1200px;
                }

                .glass-card {
                    width: min(380px, 85vw);
                    position: absolute;
                    border-radius: 22px;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255, 255, 255, 0.5);
                    border-left: 1px solid rgba(255, 255, 255, 0.5);
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 15px 35px 0 rgba(0, 0, 0, 0.4);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transform-origin: center center;
                }
                
                /* Keep simple hover effect only for the active center card */
                .glass-card:hover {
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                    border-color: rgba(255, 255, 255, 0.6);
                }

                .card-image-container {
                    width: 100%;
                    aspect-ratio: 16 / 10;
                    overflow: hidden;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                .glass-card:hover .card-image {
                    transform: scale(1.08);
                }
                .card-content {
                    padding: 24px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    background: rgba(0,0,0,0.2);
                }
                .text-title {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    color: var(--text-main);
                    letter-spacing: 0.5px;
                }
                .text-body {
                    font-size: 14px;
                    color: var(--text-muted);
                    margin-bottom: 25px;
                    line-height: 1.6;
                    flex-grow: 1;
                }
                .card-button {
                    display: inline-block;
                    padding: 12px 0;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #fff;
                    text-decoration: none;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    text-align: center;
                }
                .card-button:hover {
                    background: linear-gradient(90deg, #4facfe, #00f2fe);
                    border-color: transparent;
                    color: #000;
                    box-shadow: 0 0 20px rgba(79, 172, 254, 0.6);
                }

                /* Controls */
                .slider-controls {
                    display: flex;
                    gap: 20px;
                    margin-top: 40px;
                    z-index: 100;
                }
                .slider-btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: #fff;
                    padding: 12px 28px;
                    border-radius: 30px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                .slider-btn:hover {
                    background: #fff;
                    color: #020c1b;
                    transform: translateY(-2px);
                }

                /* Mobile Grid Fallback */
                .cards-grid-mobile {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 28px;
                    width: 100%;
                }
                .cards-grid-mobile .glass-card {
                    position: relative;
                    width: 100%;
                }

                @media (max-width: 991px) {
                    .slider-container, .slider-controls {
                        display: none;
                    }
                    .certificates-section {
                        padding-top: 112px;
                    }
                }
                @media (min-width: 992px) {
                    .cards-grid-mobile {
                        display: none;
                    }
                }
            `}</style>

            <section className="certificates-section">
                <h1 className="page-title">My Certificates</h1>

                <div className="certificates-wrapper">
                    
                    {/* Desktop 3D Slider */}
                    <div className="slider-container">
                        {certificates.map((certificate, index) => (
                            <article
                                key={`desktop-${certificate.title}-${index}`}
                                className="glass-card"
                                ref={el => cardsRef.current[index] = el}
                            >
                                <div className="card-image-container">
                                    <img
                                        src={certificate.image}
                                        alt={certificate.alt}
                                        className="card-image"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="card-content">
                                    <h3 className="text-title">{certificate.title}</h3>
                                    <p className="text-body">{certificate.description}</p>
                                    <a
                                        href={certificate.image}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="card-button"
                                        tabIndex={index === currentIndex ? 0 : -1}
                                    >
                                        View Certificate
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="slider-controls">
                        <button className="slider-btn" onClick={handlePrev}>Prev</button>
                        <button className="slider-btn" onClick={handleNext}>Next</button>
                    </div>

                    {/* Mobile Grid Fallback */}
                    <div className="cards-grid-mobile">
                        {certificates.map((certificate, index) => (
                            <article key={`mobile-${certificate.title}-${index}`} className="glass-card">
                                <div className="card-image-container">
                                    <img
                                        src={certificate.image}
                                        alt={certificate.alt}
                                        className="card-image"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="card-content">
                                    <h3 className="text-title">{certificate.title}</h3>
                                    <p className="text-body">{certificate.description}</p>
                                    <a
                                        href={certificate.image}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="card-button"
                                    >
                                        View Certificate
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Certificate;
