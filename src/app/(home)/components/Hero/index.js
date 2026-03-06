"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, use } from "react";
import clsx from "clsx";

import { Card } from "./components";
import styles from "./Hero.module.css";

// action = -1 is prev action
// action = 1 is next action
// action = 0 is none action

export default function Hero({ data }) {
    const [items, setItems] = useState(data);
    const [action, setAction] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [isTransition, setIsTransition] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const trackRef = useRef(null);

    const handlePrev = () => {
        if (action != 0) return;

        const newItems = [...items];
        const lastItem = newItems.pop();
        newItems.unshift(lastItem);
        setItems(newItems);
        setAction(-1);
        setTranslateX(-270);
        setIsTransition(false);

        if (activeIndex <= 0) return setActiveIndex(items.length - 1);
        setActiveIndex(activeIndex - 1);
    };

    const handleNext = () => {
        if (action != 0) return;
        setAction(1);
        setTranslateX(-270);
        setIsTransition(true);
        if (activeIndex >= items.length - 1) return setActiveIndex(0);
        setActiveIndex(activeIndex + 1);
    };

    const handleTransitionend = (e) => {
        if (e.target != trackRef.current) return;

        if (action === 1) {
            const newItems = [...items];
            const firstItem = newItems.shift();
            newItems.push(firstItem);
            setItems(newItems);
            setIsTransition(false);
        } else if (action === -1) {
            setIsTransition(true);
        }
        setTranslateX(0);
        setAction(0);
    };

    const isPointerDown = useRef(false);
    const clientX = useRef(0);
    const isDrag = useRef("");
    const viewportRef = useRef(null);

    const handlePointerDown = (e) => {
        isPointerDown.current = true;
        clientX.current = e.clientX;
        viewportRef.current.setPointerCapture(e.pointerId);
    };
    const handlePointerMove = (e) => {
        if (!isPointerDown.current) return;
        const diff = e.clientX - clientX.current;
        if (Math.abs(diff) > 8) isDrag.current = diff < 0 ? "left" : "right";
    };
    const handlePointerUp = (e) => {
        isPointerDown.current = false;
        viewportRef.current.releasePointerCapture(e.pointerId);

        if (isDrag.current === "right") handlePrev();
        if (isDrag.current === "left") handleNext();
    };

    return (
        <section className={styles.hero}>
            <div className={clsx(styles.background)}>
                <Image
                    src={items.at(action).backgroundImg}
                    alt="background"
                    width={600}
                    height={400}
                />
                <div className={clsx(styles.modal)}></div>
            </div>
            <div className={clsx("container", styles.wrap)}>
                <div className={styles.main}>
                    <div className={styles.group}>
                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarLine}></div>
                            <ul className={styles.sidebarList}>
                                {items.map((value, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={clsx(
                                                styles.sidebarItem,
                                                {
                                                    [styles.sidebarItemActive]:
                                                        index === activeIndex,
                                                },
                                            )}
                                        >
                                            {index + 1}
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>

                        <div className={styles.info}>
                            <div className={styles.viewportName}>
                                <div
                                    key={
                                        items.at(action == -1 ? 0 : action).name
                                    }
                                    className={styles.trackName}
                                >
                                    <h3 className={styles.infoName}>
                                        {
                                            items[
                                                action === -1 || action === 0
                                                    ? 1
                                                    : 0
                                            ].name
                                        }
                                    </h3>
                                    <h3 className={styles.infoName}>
                                        {items.at(action).name}
                                    </h3>
                                </div>
                            </div>
                            <div className={styles.viewportDescription}>
                                <div
                                    key={
                                        items.at(action == -1 ? 0 : action)
                                            .description
                                    }
                                    className={styles.trackDescription}
                                >
                                    <p className={styles.infoDescription}>
                                        {
                                            items[
                                                action === -1 || action === 0
                                                    ? 1
                                                    : 0
                                            ].description
                                        }
                                    </p>
                                    <p className={styles.infoDescription}>
                                        {items.at(action).description}
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
                    >
                        <div
                            ref={trackRef}
                            className={styles.track}
                            onTransitionEnd={(e) => handleTransitionend(e)}
                            style={{
                                transform: `translateX(${translateX}px)`,
                                transition: isTransition
                                    ? "all 0.6s ease"
                                    : "all 0.00000000000001s ease",
                            }}
                        >
                            {items.map((value, index) => {
                                return (
                                    <Card
                                        key={value.name}
                                        data={value.locations}
                                        isActive={0 === index}
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
