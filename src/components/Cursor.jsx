import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        if (!cursor || !cursorDot) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
        gsap.set(cursorDot, { xPercent: -50, yPercent: -50, opacity: 0 });

        let isVisible = false;

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
            if (!isVisible) {
                gsap.to([cursor, cursorDot], { opacity: 1, duration: 0.2 });
                isVisible = true;
            }
            moveDotX(e.clientX);
            moveDotY(e.clientY);
            moveCursorX(e.clientX);
            moveCursorY(e.clientY);
        };

        const onMouseLeaveWindow = () => {
            gsap.to([cursor, cursorDot], { opacity: 0, duration: 0.2 });
            isVisible = false;
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeaveWindow);

        // Hover effects - we use event delegation on document body
        const onMouseEnter = (e) => {
            const target = e.target.closest("a, button, .btn, .feature-card, .glass-card, .card");
            if (target) {
                gsap.to(cursor, { scale: 1.8, backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.8)", duration: 0.25, overwrite: "auto" });
                gsap.to(cursorDot, { scale: 0.3, opacity: 0.5, duration: 0.25, overwrite: "auto" });
            }
        };

        const onMouseLeave = (e) => {
            const target = e.target.closest("a, button, .btn, .feature-card, .glass-card, .card");
            if (target) {
                gsap.to(cursor, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(79, 172, 254, 0.7)", duration: 0.25, overwrite: "auto" });
                gsap.to(cursorDot, { scale: 1, opacity: 1, duration: 0.25, overwrite: "auto" });
            }
        };

        document.addEventListener("mouseover", onMouseEnter, true);
        document.addEventListener("mouseout", onMouseLeave, true);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeaveWindow);
            document.removeEventListener("mouseover", onMouseEnter, true);
            document.removeEventListener("mouseout", onMouseLeave, true);
        };
    }, []);

    return (
        <>
            <style>{`
        /* Custom Cursor */
        .cursor {
          width: 28px;
          height: 28px;
          border: 1.5px solid rgba(79, 172, 254, 0.7);
          box-shadow: 0 0 12px rgba(79, 172, 254, 0.3);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          display: block;
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(1px);
        }
        .cursor-dot {
          width: 6px;
          height: 6px;
          background: #4facfe;
          box-shadow: 0 0 8px #4facfe;
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
        
        /* Fallback for iframes */
        iframe {
          cursor: auto;
        }
      `}</style>
            <div className="cursor" ref={cursorRef}></div>
            <div className="cursor-dot" ref={cursorDotRef}></div>
        </>
    );
};

export default Cursor;
