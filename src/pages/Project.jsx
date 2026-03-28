import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMediaQuery, { ENHANCED_UI_QUERY } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        emoji: '🏦',
        title: 'Fraud Disk Scheduling (FDS)',
        description: 'A disk scheduling simulation system that compares FCFS and Optimized algorithms to detect fraud bursts in financial transaction logs. Includes logical disk block simulation, seek distance analysis, and performance visualization dashboard.',
        tags: [
            { label: 'Python', color: '#3776AB', bg: '#1a3a5c' },
            { label: 'Streamlit', color: '#FF4B4B', bg: '#3d1a1a' },
            { label: 'Plotly', color: '#636efa', bg: '#1c1a3d' },
        ],
        tagCategories: ['Language', 'UI', 'Charts'],
        github: 'https://github.com/moonnight1975',
        live: null,
    },
    {
        emoji: '📱',
        title: 'AR Book',
        description: 'Interactive AR experience where printed pages trigger 3D models and animations using image tracking.',
        tags: [
            { label: 'AR Foundation', color: '#ffffff', bg: '#2a2a2a' },
            { label: 'Android', color: '#3DDC84', bg: '#1a3d2a' },
        ],
        tagCategories: ['Unity', 'Platform'],
        github: 'https://github.com/moonnight1975',
        live: null,
    },
    {
        emoji: '🎢',
        title: 'VR Roller Coaster',
        description: 'An immersive VR physics simulation optimized for the Meta Quest 3, featuring scene optimization and XR interactions.',
        tags: [
            { label: 'XR Interaction', color: '#ffffff', bg: '#2a2a2a' },
            { label: 'Meta Quest 3', color: '#00b4d8', bg: '#1a2a3d' },
        ],
        tagCategories: ['Unity', 'Device'],
        github: 'https://github.com/moonnight1975',
        live: null,
    },
    {
        emoji: '🖥️',
        title: 'Digital Contact Book',
        description: 'Desktop CRUD application with a user-friendly GUI. Features secure database connectivity and contact management.',
        tags: [
            { label: 'Tkinter', color: '#FFD43B', bg: '#3d3a1a' },
            { label: 'PostgreSQL', color: '#336791', bg: '#1a2a3d' },
        ],
        tagCategories: ['Python', 'DB'],
        github: 'https://github.com/moonnight1975/Digital-contact-Book',
        live: null,
    },
    {
        emoji: '🎵',
        title: 'Music Player',
        description: 'Native Android audio player with playlist management, song retrieval, and background playback support.',
        tags: [
            { label: 'Java', color: '#f89820', bg: '#3d2a1a' },
            { label: 'SQLite', color: '#003B57', bg: '#1a2a3d' },
        ],
        tagCategories: ['Language', 'DB'],
        github: 'https://github.com/moonnight1975',
        live: null,
    },
    {
        emoji: '🍎',
        title: 'Apple Clone',
        description: 'A responsive, pixel-perfect clone of the Apple homepage focusing on smooth animations and front-end design.',
        tags: [
            { label: 'HTML/CSS', color: '#e34c26', bg: '#3d1a1a' },
            { label: 'JavaScript', color: '#f0db4f', bg: '#3d3a1a' },
        ],
        tagCategories: ['Web', 'Code'],
        github: 'https://github.com/moonnight1975',
        live: null,
    },
    {
        emoji: '🌐',
        title: 'Portfolio Website',
        description: 'Personal showcase website featuring projects and skills. Fully responsive and deployed for global access.',
        tags: [
            { label: 'HTML/CSS', color: '#e34c26', bg: '#3d1a1a' },
            { label: 'Vercel', color: '#ffffff', bg: '#2a2a2a' },
        ],
        tagCategories: ['Stack', 'Deploy'],
        github: 'https://github.com/moonnight1975',
        live: 'https://litto.vercel.app/',
    },
    {
        emoji: '🌿',
        title: 'Health Assist Avatar',
        description: 'Health Assist Avatar is designed to be your daily wellness companion. It tracks your steps, water intake, sleep, and mood while providing medication reminders—all supported by an interactive Health Assistant Chatbot. The project emphasizes a "Glassmorphic" aesthetic, fluid Framer Motion animations, and a developer-friendly architecture.',
        tags: [
            { label: 'Gemma', color: '#4285F4', bg: '#1a2a3d' },
            { label: 'Vercel', color: '#ffffff', bg: '#2a2a2a' },
        ],
        tagCategories: ['AI', 'Deploy'],
        github: 'https://github.com/moonnight1975',
        live: null,
    },
];

const Project = () => {
    const cardsRef = useRef([]);
    const canUseDesktopEffects = useMediaQuery(ENHANCED_UI_QUERY);

    useEffect(() => {
        if (!canUseDesktopEffects) {
            return undefined;
        }

        const context = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                gsap.from(card, {
                    opacity: 0,
                    y: 52,
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: (i % 2) * 0.12,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    }
                });
            });
        });

        return () => context.revert();
    }, [canUseDesktopEffects]);

    return (
        <>
            <style>{`
                .projects-section {
                    padding: 132px 5% 80px;
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }
                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 28px;
                }
                .project-card {
                    background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-top: 1px solid rgba(255,255,255,0.45);
                    border-left: 1px solid rgba(255,255,255,0.45);
                    border-right: 1px solid rgba(255,255,255,0.08);
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    border-radius: 24px;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
                    position: relative;
                    overflow: hidden;
                }
                .project-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(79,172,254,0.06), rgba(0,242,254,0.03));
                    opacity: 0;
                    transition: opacity 0.35s ease;
                    pointer-events: none;
                    border-radius: inherit;
                }
                .project-card:hover::before {
                    opacity: 1;
                }
                .project-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(79,172,254,0.2);
                    border-color: rgba(79,172,254,0.35);
                }
                .project-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                .project-emoji {
                    font-size: 36px;
                    line-height: 1;
                    flex-shrink: 0;
                }
                .project-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--text-main);
                    letter-spacing: 0.3px;
                    line-height: 1.3;
                }
                .project-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .tag-group {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .tag-category {
                    font-size: 11px;
                    color: rgba(255,255,255,0.45);
                    font-weight: 500;
                    letter-spacing: 0.3px;
                }
                .tag-pill {
                    display: inline-block;
                    padding: 3px 10px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.2px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .project-description {
                    font-size: 14px;
                    color: var(--text-muted);
                    line-height: 1.7;
                    flex-grow: 1;
                }
                .project-links {
                    display: flex;
                    gap: 12px;
                    margin-top: 4px;
                    flex-wrap: wrap;
                }
                .proj-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-size: 13px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .proj-btn-github {
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #fff;
                }
                .proj-btn-github:hover {
                    background: rgba(255,255,255,0.18);
                    border-color: rgba(255,255,255,0.4);
                    transform: translateY(-1px);
                }
                .proj-btn-live {
                    background: linear-gradient(135deg, #4facfe, #00f2fe);
                    border: none;
                    color: #000;
                }
                .proj-btn-live:hover {
                    opacity: 0.88;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(79,172,254,0.4);
                }
                .divider {
                    width: 100%;
                    height: 1px;
                    background: rgba(255,255,255,0.07);
                }
                @media (max-width: 768px) {
                    .projects-section {
                        padding-top: 112px;
                    }
                    .project-card {
                        padding: 24px;
                    }
                    .project-links {
                        flex-direction: column;
                    }
                    .proj-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>

            <section className="projects-section">
                <h1 className="page-title">My Projects</h1>

                <div className="projects-grid">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className="project-card"
                            ref={el => cardsRef.current[i] = el}
                        >
                            <div className="project-header">
                                <span className="project-emoji">{project.emoji}</span>
                                <h2 className="project-title">{project.title}</h2>
                            </div>

                            <div className="divider" />

                            <div className="project-tags">
                                {project.tags.map((tag, j) => (
                                    <div className="tag-group" key={j}>
                                        <span className="tag-category">{project.tagCategories[j]}</span>
                                        <span
                                            className="tag-pill"
                                            style={{
                                                color: tag.color,
                                                background: tag.bg,
                                                borderColor: tag.color + '44',
                                            }}
                                        >
                                            {tag.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <p className="project-description">{project.description}</p>

                            <div className="project-links">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="proj-btn proj-btn-github"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    GitHub
                                </a>
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="proj-btn proj-btn-live"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                                            <polyline points="15 3 21 3 21 9"/>
                                            <line x1="10" y1="14" x2="21" y2="3"/>
                                        </svg>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Project;
