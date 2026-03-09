"use client";
import Image from "next/image";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import styles from "./AccommodationTypes.module.css";
import { Reveal } from "@/components";

export default function AccommodationTypes({ data }) {
    const baseWidthRef = useRef(220);
    const gapRef = useRef(20);
    const viewportRef = useRef(null);
    const visibleCountRef = useRef(0);
    const [width, setWidth] = useState(baseWidthRef.current);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const viewportEl = viewportRef.current;
        const gap = gapRef.current;
        const resizeObserver = new ResizeObserver((entries) => {
            const viewportWidth = viewportEl.clientWidth;
            visibleCountRef.current = Math.floor(
                (viewportWidth + gap) / (baseWidthRef.current + gap),
            );
            const visibleCount = visibleCountRef.current;
            const newWidth =
                (viewportWidth - gap * (visibleCount - 1)) / visibleCount;

            setWidth(newWidth);

            const maxIndex = data.length - visibleCount;
            setActiveIndex((prev) => Math.min(prev, maxIndex));
        });
        resizeObserver.observe(viewportEl);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const handleNext = () => {
        if (activeIndex >= data.length - visibleCountRef.current) return;
        setActiveIndex((prev) => prev + 1);
    };
    const handlePrev = () => {
        if (activeIndex <= 0) return;
        setActiveIndex((prev) => prev - 1);
    };

    const clientXRef = useRef(0);
    const isPressRef = useRef(false);
    const dragRef = useRef(0);

    const handlePointerDown = (e) => {
        clientXRef.current = e.clientX;
        isPressRef.current = true;
    };
    const handlePointerMove = (e) => {
        if (!isPressRef) return;
        const diff = e.clientX - clientXRef.current;
        if (Math.abs(diff) > 8) dragRef.current = diff < 0 ? "next" : "prev";
    };
    const handlePointerUp = () => {
        isPressRef.current = false;

        if (dragRef.current === "prev") handlePrev();
        if (dragRef.current === "next") handleNext();

        dragRef.current = "";
    };

    return (
        <section className={clsx(styles.section, "container")}>
            <div className={styles.header}>
                <Reveal>
                    <h2>Tìm kiếm theo loại hình lưu trú</h2>

                    <p>
                        Bạn có thể dễ dàng tìm kiếm và lọc kết quả theo loại
                        hình lưu trú. Tính năng này cho phép bạn lựa chọn khách
                        sạn hoặc các phương án khác như nhà nghỉ, căn hộ du lịch
                        hay homestay, phù hợp với sở thích và nhu cầu của mình.
                    </p>
                </Reveal>
            </div>

            <div
                className={styles.slider}
                onPointerDown={(e) => handlePointerDown(e)}
                onPointerMove={(e) => handlePointerMove(e)}
                onPointerUp={(e) => handlePointerUp(e)}
            >
                <button
                    onClick={handlePrev}
                    className={clsx(styles.arrow, styles.arrowLeft, {
                        [styles.disable]: activeIndex <= 0,
                    })}
                >
                    <i className="fi fi-sr-angle-small-left"></i>
                </button>

                <div ref={viewportRef} className={styles.viewport}>
                    <div
                        className={styles.track}
                        style={{
                            transform: `translateX(-${activeIndex * (width + gapRef.current)}px)`,
                        }}
                    >
                        {data.map((item, index) => {
                            let content = (
                                <div className={styles.card}>
                                    <span>{item.name}</span>

                                    <div
                                        className={styles.image}
                                        style={{ width }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={600}
                                            height={900}
                                        />
                                    </div>
                                </div>
                            );
                            if (index < visibleCountRef.current)
                                content = (
                                    <Reveal delay={100 * index}>
                                        {content}
                                    </Reveal>
                                );

                            return <div key={index}>{content}</div>;
                        })}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    className={clsx(styles.arrow, styles.arrowRight, {
                        [styles.disable]:
                            activeIndex >=
                            data.length - visibleCountRef.current,
                    })}
                >
                    <i className="fi fi-sr-angle-small-right"></i>
                </button>
            </div>
        </section>
    );
}
