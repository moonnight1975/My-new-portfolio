import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Certificate = () => {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Clone children to create a seamless loop
        const originalCards = Array.from(track.children);

        // Append two sets of clones to ensure the track never runs out visually
        originalCards.forEach(card => track.appendChild(card.cloneNode(true)));
        originalCards.forEach(card => track.appendChild(card.cloneNode(true)));

        const cardWidth = 400;
        const gap = 40;
        const totalSingleSetWidth = (cardWidth + gap) * originalCards.length;

        const anim = gsap.to(track, {
            x: -totalSingleSetWidth,
            duration: 120, // Adjust speed (seconds)
            ease: "none",
            repeat: -1
        });

        const cards = document.querySelectorAll('.glass-card');
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
        };
    }, []);

    return (
        <>
            <style>{`
                .certificates-section {
                    padding: 120px 5% 50px;
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
                    gap: 40px;
                    width: max-content;
                }
                .glass-card {
                    width: 400px;
                    flex-shrink: 0;
                    position: relative;
                    border-radius: 20px;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255, 255, 255, 0.5);
                    border-left: 1px solid rgba(255, 255, 255, 0.5);
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                    overflow: hidden;
                    transition: all 0.4s ease;
                    display: flex;
                    flex-direction: column;
                    animation: fadeInUp 1s ease-out;
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
                    height: 220px;
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
                    padding: 25px;
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
                        padding-top: 140px;
                    }
                }
            `}</style>

            <section className="certificates-section">
                <h1 className="page-title">My Certificates</h1>

                <div className="certificates-wrapper">
                    <div className="cards-track" ref={trackRef}>
                        {/* Card 1 */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/googlecerti.png" alt="Google AI Essentials" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">Google AI Essentials</h3>
                                <p className="text-body">Earned the Google AI Essentials certificate by mastering core AI concepts, prompt engineering, and responsible AI practices through Google's professional training program.</p>
                                <a href="/googlecerti.png" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/DLLE.jpg" alt="DLLE Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">DLLE Certificate</h3>
                                <p className="text-body">Recognized by the Department of Lifelong Learning & Extension for active participation in outreach and community engagement programs organized by the college.</p>
                                <a href="/DLLE.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/MESA.jpeg" alt="MESA Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">MESA Certificate</h3>
                                <p className="text-body">Awarded by the Mechanical Engineering Students Association for active involvement and contributions to technical events, workshops, and departmental activities.</p>
                                <a href="/MESA.jpeg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/POSTER.jpg" alt="Poster Competition" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">Poster Making – 3rd Prize</h3>
                                <p className="text-body">Secured 3rd place in an inter-collegiate poster making competition, showcasing creativity, design thinking, and the ability to communicate ideas visually.</p>
                                <a href="/POSTER.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 5 */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/SIP.jpg" alt="SIP Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">SIP Certificate</h3>
                                <p className="text-body">Successfully completed the Student Internship Program (SIP), gaining hands-on industry experience and applying academic knowledge to real-world projects.</p>
                                <a href="/SIP.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 6 */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/anveshnam.jpeg" alt="Anveshnam Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">Anveshnam Certificate</h3>
                                <p className="text-body">Participated in Anveshnam — a national-level event featuring an advanced research writing workshop and an inter-collegiate technical paper presentation competition.</p>
                                <a href="/anveshnam.jpeg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 7 - BIS */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/bis.jpg" alt="BIS Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">BIS Certificate</h3>
                                <p className="text-body">Certified by the Bureau of Indian Standards (BIS) for participation in quality and standards awareness programs, promoting standardization practices in engineering.</p>
                                <a href="/bis.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 8 - CGC */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/cgc.jpg" alt="Coding Genuis C Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">Coding Genuis C Certificate</h3>
                                <p className="text-body">Awarded by Coding Genuis C for outstanding dedication and performance, recognizing consistent effort and achievement throughout the program's activities and assessments.</p>
                                <a href="/cgc.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 9 - CG Java */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/cgjava.jpg" alt="Coding Genuis Java Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">Coding Genuis Java Certificate</h3>
                                <p className="text-body">Completed a structured Java programming course covering object-oriented principles, data structures, and application development, demonstrated through hands-on projects.</p>
                                <a href="/cgjava.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 11 - IOFT */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/ioft.jpg" alt="IOFT Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">IOFT Certificate</h3>
                                <p className="text-body">Recognized for participation and achievement in the IOFT program, reflecting a commitment to excellence and continuous growth in the domain.</p>
                                <a href="/ioft.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 12 - MSO */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/mso_fixed.jpg" alt="MSO Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">MSO Certificate</h3>
                                <p className="text-body">Validated proficiency in the Microsoft Office Suite including Word, Excel, and PowerPoint, completing a comprehensive training program focused on productivity and professional documentation.</p>
                                <a href="/mso_fixed.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 13 - Certificatemeta */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/Certificatemeta_fixed.jpg" alt="Meta Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">Meta Certificate</h3>
                                <p className="text-body">Earned a professional certificate from Meta, gaining industry-recognized skills and practical knowledge in the domain covered by Meta's learning program.</p>
                                <a href="/Certificatemeta_fixed.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>

                        {/* Card 14 - SQL */}
                        <div className="glass-card">
                            <div className="card-image-container">
                                <img src="/sql_fixed.jpg" alt="SQL Certificate" className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="text-title">SQL Certificate</h3>
                                <p className="text-body">Demonstrated expertise in SQL by completing a structured database course covering queries, joins, aggregations, and data management using relational databases.</p>
                                <a href="/sql_fixed.jpg" target="_blank" rel="noreferrer" className="card-button">View Certificate</a>
                            </div>
                        </div>




                    </div>
                </div>
            </section>
        </>
    );
};

export default Certificate;
