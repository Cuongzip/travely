"use client";
import { useState } from "react";
import { Reveal } from "@/components";

import styles from "./Features.module.css";

const FEATURES = [
    {
        title: "Khám phá tất cả",
        description:
            "Từ khách sạn địa phương đến các thương hiệu toàn cầu, khám phá hàng triệu phòng lưu trú trên khắp thế giới.",
    },
    {
        title: "So sánh ngay tại đây",
        description:
            "Không cần tìm kiếm ở nơi khác. Những thương hiệu du lịch hàng đầu đều có mặt tại đây để bạn dễ dàng so sánh.",
    },
    {
        title: "Nhận ưu đãi độc quyền",
        description:
            "Chúng tôi hợp tác cùng các khách sạn hàng đầu thế giới để mang đến cho bạn những mức giá ưu đãi đặc biệt.",
    },
];

export default function Features() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const canPrev = currentIndex > 0;
    const canNext = currentIndex < FEATURES.length - 1;

    const handlePrev = () => {
        if (!canPrev) return;
        setCurrentIndex((i) => Math.max(0, i - 1));
    };

    const handleNext = () => {
        if (!canNext) return;
        setCurrentIndex((i) => Math.min(FEATURES.length - 1, i + 1));
    };

    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <Reveal>
                    <h2 className={styles.heading}>
                        Tại Sao Nên Chọn Travely?
                    </h2>
                </Reveal>

                <div className={styles.desktopRow}>
                    {FEATURES.map((feature, index) => (
                        <Reveal key={feature.title} delay={100 * index}>
                            <article className={styles.card}>
                                <h3 className={styles.title}>
                                    {feature.title}
                                </h3>
                                <p className={styles.description}>
                                    {feature.description}
                                </p>
                            </article>
                        </Reveal>
                    ))}
                </div>

                <div className={styles.slider}>
                    <button
                        type="button"
                        className={styles.navButton}
                        onClick={handlePrev}
                        disabled={!canPrev}
                        aria-label="Trước"
                    >
                        ❮
                    </button>

                    <div className={styles.slideWrapper}>
                        <article className={styles.card}>
                            <h3 className={styles.title}>
                                {FEATURES[currentIndex].title}
                            </h3>
                            <p className={styles.description}>
                                {FEATURES[currentIndex].description}
                            </p>
                        </article>
                    </div>

                    <button
                        type="button"
                        className={styles.navButton}
                        onClick={handleNext}
                        disabled={!canNext}
                        aria-label="Sau"
                    >
                        ❯
                    </button>
                </div>

                <div className={styles.dots}>
                    {FEATURES.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={
                                index === currentIndex
                                    ? `${styles.dot} ${styles.dotActive}`
                                    : styles.dot
                            }
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Chuyển tới mục ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
