import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useMediaQuery, { ENHANCED_UI_QUERY } from '../hooks/useMediaQuery';

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
    const trackRef = useRef(null);
    const canUseDesktopEffects = useMediaQuery(ENHANCED_UI_QUERY);
    const visibleCertificates = canUseDesktopEffects
        ? [...certificates, ...certificates]
        : certificates;

    useEffect(() => {
        const track = trackRef.current;
        if (!track || !canUseDesktopEffects) return undefined;

        const anim = gsap.to(track, {
            x: () => -(track.scrollWidth / 2),
            duration: 80,
            ease: "none",
            repeat: -1,
            repeatRefresh: true
        });

        const cards = track.querySelectorAll('.glass-card');
        const pauseAnim = () => anim.pause();
        const playAnim = () => anim.resume();

        cards.forEach(card => {
            card.addEventListener("mouseenter", pauseAnim);
            card.addEventListener("mouseleave", playAnim);
        });

        return () => {
            cards.forEach(card => {
                card.removeEventListener("mouseenter", pauseAnim);
                card.removeEventListener("mouseleave", playAnim);
            });
            anim.kill();
            gsap.set(track, { clearProps: 'transform' });
        };
    }, [canUseDesktopEffects]);

    return (
        <>
            <style>{`
                .certificates-section {
                    padding: 132px 5% 56px;
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }
                .certificates-wrapper {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    padding: 20px 0;
                }
                .cards-track {
                    display: flex;
                    gap: 28px;
                    width: max-content;
                }
                .cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 22px;
                }
                .glass-card {
                    width: min(360px, 82vw);
                    flex-shrink: 0;
                    position: relative;
                    border-radius: 22px;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255, 255, 255, 0.5);
                    border-left: 1px solid rgba(255, 255, 255, 0.5);
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                    overflow: hidden;
                    transition: transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease;
                    display: flex;
                    flex-direction: column;
                }
                .glass-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
                    border-color: rgba(255, 255, 255, 0.6);
                }
                .glass-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                    transition: 0.5s;
                    pointer-events: none;
                }
                .glass-card:hover::before {
                    left: 100%;
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
                    transform: scale(1.1);
                }
                .card-content {
                    padding: 24px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
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
                    position: relative;
                    overflow: hidden;
                }
                .card-button:hover {
                    background: linear-gradient(90deg, #ff00cc, #3333ff, #00ffcc);
                    background-size: 200% 200%;
                    animation: gradientMove 3s ease infinite;
                    border-color: transparent;
                    box-shadow: 0 0 20px rgba(51, 51, 255, 0.6);
                }
                @media (max-width: 768px) {
                    .certificates-section {
                        padding-top: 112px;
                    }
                    .certificates-wrapper {
                        overflow: visible;
                        padding-top: 0;
                    }
                    .glass-card {
                        width: 100%;
                    }
                    .card-content {
                        padding: 22px;
                    }
                }
            `}</style>

            <section className="certificates-section">
                <h1 className="page-title">My Certificates</h1>

                <div className="certificates-wrapper">
                    <div
                        className={canUseDesktopEffects ? 'cards-track' : 'cards-grid'}
                        ref={trackRef}
                    >
                        {visibleCertificates.map((certificate, index) => {
                            const isClone = canUseDesktopEffects && index >= certificates.length;

                            return (
                                <article
                                    key={`${certificate.title}-${index}`}
                                    className="glass-card"
                                    aria-hidden={isClone ? true : undefined}
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
                                            tabIndex={isClone ? -1 : undefined}
                                        >
                                            View Certificate
                                        </a>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Certificate;
