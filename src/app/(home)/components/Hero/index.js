"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import { Card, Sidebar } from "./components";
import styles from "./Hero.module.css";

// action = -1 is prev action
// action = 1 is next action
// action = 0 is none action
const SLIDE_WIDTH = 270;

export default function Hero({ data }) {
    const [items, setItems] = useState(data);

    const [action, setAction] = useState(0);

    const [activeIndex, setActiveIndex] = useState(0);

    const trackRef = useRef(null);

    const handlePrev = () => {
        if (action != 0) return;

        setAction(-1);

        setActiveIndex((prev) => {
            if (prev <= 0) return items.length - 1;
            return prev - 1;
        });
        resetAutoSlide();
    };

    const handleNext = () => {
        if (action != 0) return;

        setAction(1);

        setActiveIndex((prev) => {
            if (prev >= items.length - 1) return 0;
            return prev + 1;
        });
        resetAutoSlide();
    };

    const handleTransitionend = (e) => {
        if (e.target != trackRef.current) return;
        const newItems = [...items];
        if (action === 1) {
            const firstItem = newItems.shift();
            newItems.push(firstItem);
        } else if (action === -1) {
            const lastItem = newItems.pop();
            newItems.unshift(lastItem);
        }
        setItems(newItems);

        setAction(0);
    };

    const intervalId = useRef(0);

    const startAutoSlide = () => {
        intervalId.current = setInterval(() => {
            handleNext();
        }, 5000);
    };
    const stopAutoSlide = () => {
        clearInterval(intervalId.current);
    };
    const resetAutoSlide = () => {
        clearInterval(intervalId.current);
        startAutoSlide();
    };

    useEffect(() => {
        startAutoSlide();

        return () => clearInterval(intervalId.current);
    }, []);

    const isPointerDown = useRef(false);
    const clientX = useRef(0);
    const isDrag = useRef("");
    const viewportRef = useRef(null);

    const handlePointerDown = (e) => {
        isPointerDown.current = true;
        clientX.current = e.clientX;
    };
    const handlePointerMove = (e) => {
        if (!isPointerDown.current) return;
        const diff = e.clientX - clientX.current;
        if (Math.abs(diff) > 8) isDrag.current = diff < 0 ? "left" : "right";
    };
    const handlePointerUp = (e) => {
        isPointerDown.current = false;

        if (isDrag.current === "right") handlePrev();
        if (isDrag.current === "left") handleNext();

        isDrag.current = "";
    };

    return (
        <section className={styles.hero}>
            <div className={clsx(styles.background)}>
                <Image
                    src={items[action + 1].backgroundImg}
                    alt="background"
                    width={600}
                    height={400}
                />
                <div className={clsx(styles.modal)}></div>
            </div>
            <div className={clsx("container", styles.wrap)}>
                <div className={styles.main}>
                    <div className={styles.group}>
                        <Sidebar
                            itemCount={items.length}
                            activeIndex={activeIndex}
                        />
                        <div className={styles.info}>
                            <div className={styles.viewportName}>
                                <div
                                    key={activeIndex}
                                    className={styles.trackName}
                                >
                                    <h3 className={styles.infoName}>
                                        {items[1].name}
                                    </h3>
                                    <h3 className={styles.infoName}>
                                        {items[action + 1].name}
                                    </h3>
                                </div>
                            </div>
                            <div className={styles.viewportDescription}>
                                <div
                                    key={activeIndex}
                                    className={styles.trackDescription}
                                >
                                    <p className={styles.infoDescription}>
                                        {items[1].description}
                                    </p>
                                    <p className={styles.infoDescription}>
                                        {items[action + 1].description}
                                    </p>
                                </div>
                            </div>

                            <Link href="/" className="button">
                                <span> Khám phá</span>
                                <i className="fi fi-rr-arrow-small-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div
                        ref={viewportRef}
                        className={styles.viewport}
                        onPointerDown={(e) => handlePointerDown(e)}
                        onPointerMove={(e) => handlePointerMove(e)}
                        onPointerUp={(e) => handlePointerUp(e)}
                        onPointerEnter={stopAutoSlide}
                        onMouseLeave={startAutoSlide}
                    >
                        <div
                            ref={trackRef}
                            className={styles.track}
                            onTransitionEnd={(e) => handleTransitionend(e)}
                            style={{
                                transform: `translateX(${-(action + 1) * SLIDE_WIDTH}px)`,
                                transition:
                                    action != 0
                                        ? "transform 0.6s ease"
                                        : "none",
                            }}
                        >
                            {items.map((value, index) => {
                                return (
                                    <Card
                                        key={value.name}
                                        data={value.locations}
                                        isActive={action + 1 === index}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={styles.tail}>
                    <div className={styles.actions}>
                        <button onClick={handlePrev}>
                            <i className="fi fi-br-angle-small-left"></i>
                        </button>
                        <button onClick={handleNext}>
                            <i className="fi fi-br-angle-small-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
