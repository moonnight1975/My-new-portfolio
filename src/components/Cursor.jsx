import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        if (!cursor || !cursorDot) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

        const moveCursorX = gsap.quickTo(cursor, 'x', {
            duration: 0.35,
            ease: 'power3.out',
        });
        const moveCursorY = gsap.quickTo(cursor, 'y', {
            duration: 0.35,
            ease: 'power3.out',
        });
        const moveDotX = gsap.quickTo(cursorDot, 'x', {
            duration: 0.12,
            ease: 'power2.out',
        });
        const moveDotY = gsap.quickTo(cursorDot, 'y', {
            duration: 0.12,
            ease: 'power2.out',
        });

        const onMouseMove = (e) => {
            moveDotX(e.clientX);
            moveDotY(e.clientY);
            moveCursorX(e.clientX);
            moveCursorY(e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);

        // Hover effects - we use event delegation on document body
        const onMouseEnter = (e) => {
            const target = e.target.closest("a, button, .btn, .feature-card, .glass-card, .card");
            if (target) {
                gsap.to(cursor, { scale: 2, borderColor: "#fff", duration: 0.25, overwrite: true });
                gsap.to(cursorDot, { scale: 0.5, background: "transparent", duration: 0.25, overwrite: true });
            }
        };

        const onMouseLeave = (e) => {
            const target = e.target.closest("a, button, .btn, .feature-card, .glass-card, .card");
            if (target) {
                gsap.to(cursor, { scale: 1, borderColor: "#4facfe", duration: 0.25, overwrite: true });
                gsap.to(cursorDot, { scale: 1, background: "#ffffff", duration: 0.25, overwrite: true });
            }
        };

        document.addEventListener("mouseover", onMouseEnter, true);
        document.addEventListener("mouseout", onMouseLeave, true);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseEnter, true);
            document.removeEventListener("mouseout", onMouseLeave, true);
        };
    }, []);

    return (
        <>
            <style>{`
        /* Custom Cursor */
        .cursor {
          width: 20px;
          height: 20px;
          border: 1.5px solid var(--primary);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          display: block;
        }
        .cursor-dot {
          width: 6px;
          height: 6px;
          background: var(--text-main);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 10001;
          transform: translate(-50%, -50%);
          display: block;
        }
        body {
          cursor: none;
        }
        .btn, a, button, .feature-card, .glass-card, .card {
          cursor: none;
        }
      `}</style>
            <div className="cursor" ref={cursorRef}></div>
            <div className="cursor-dot" ref={cursorDotRef}></div>
        </>
    );
};

export default Cursor;
