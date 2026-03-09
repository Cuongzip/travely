"use client";

import { useEffect, useRef } from "react";

import styles from "./Reveal.module.css";

export default function Reveal({ children, delay = 0 }) {
    const revealRef = useRef(null);
    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry.isIntersecting) return;

                const el = entry.target;

                el.style.transitionDelay = delay + "ms";

                el.classList.add(styles.revealShow);

                intersectionObserver.disconnect();
            },
            { threshold: 0.2 },
        );
        intersectionObserver.observe(revealRef.current);
        return () => {
            intersectionObserver.disconnect();
        };
    }, []);
    return (
        <div ref={revealRef} className={styles.reveal}>
            {children}
        </div>
    );
}
