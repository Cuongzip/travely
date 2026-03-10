"use client";

import {
    useEffect,
    useState,
    useCallback,
    useLayoutEffect,
    useRef,
} from "react";

import styles from "./Hotels.module.css";
import { Reveal } from "@/components";

const getPositionClass = (diff) => {
    if (diff === -2) return styles.smallLeft;
    if (diff === -1) return styles.normalLeft;
    if (diff === 0) return styles.big;
    if (diff === 1) return styles.normalRight;
    if (diff === 2) return styles.smallRight;
    return styles.far;
};

export default function Hotels({ data }) {
    const hotels = data ?? [];
    const [currentIndex, setCurrentIndex] = useState(2);
    const viewportRef = useRef(null);
    const [trackOffset, setTrackOffset] = useState(0);

    useLayoutEffect(() => {
        const updateOffset = () => {
            if (!viewportRef.current || hotels.length === 0) return;
            const viewportWidth = viewportRef.current.offsetWidth;
            const computed = getComputedStyle(viewportRef.current);
            const cardWidth =
                parseFloat(computed.getPropertyValue("--card-width")) || 260;
            const cardGap =
                parseFloat(computed.getPropertyValue("--card-gap")) || 24;
            const cardStep = cardWidth + cardGap;
            const center = viewportWidth / 2;
            const cardCenter = currentIndex * cardStep + cardWidth / 2;
            setTrackOffset(center - cardCenter);
        };

        updateOffset();
        window.addEventListener("resize", updateOffset);
        return () => window.removeEventListener("resize", updateOffset);
    }, [currentIndex, hotels.length]);

    const canPrev = hotels.length >= 5 && currentIndex > 2;
    const canNext = hotels.length >= 5 && currentIndex < hotels.length - 3;

    const nextSlide = useCallback(() => {
        if (canNext) setCurrentIndex((i) => i + 1);
    }, [canNext]);

    const prevSlide = useCallback(() => {
        if (canPrev) setCurrentIndex((i) => i - 1);
    }, [canPrev]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "ArrowRight") nextSlide();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [prevSlide, nextSlide]);

    return (
        <section className={styles.hotels}>
            <div className={styles.container}>
                <Reveal>
                    <h1 className={styles.title}>Khách Sạn Gần Bạn</h1>
                </Reveal>
                <div className={styles.sliderWrapper}>
                    <button
                        type="button"
                        className={styles.prevBtn}
                        onClick={prevSlide}
                        disabled={!canPrev}
                        aria-label="Trước"
                    >
                        ❮
                    </button>
                    <div ref={viewportRef} className={styles.sliderViewport}>
                        <div
                            className={styles.sliderTrack}
                            style={{
                                transform: `translate3d(${trackOffset}px, 0, 0)`,
                            }}
                        >
                            {hotels.map((hotel, index) => {
                                const diff = index - currentIndex;
                                const position = getPositionClass(diff);
                                return (
                                    <div
                                        key={hotel._id ?? index}
                                        className={`${styles.card} ${position}`}
                                    >
                                        <div className={styles.imgWrapper}>
                                            <img
                                                src={`/images/hotels/hotel${index === 0 ? "" : index}.webp`}
                                                alt={hotel.name}
                                                className={styles.img}
                                            />
                                            <div className={styles.ratingBadge}>
                                                <i
                                                    className="fi-br-star"
                                                    aria-hidden="true"
                                                />
                                                {hotel.rate?.toFixed(2) ?? "—"}
                                            </div>
                                            <button
                                                type="button"
                                                className={styles.wishlistBtn}
                                                aria-label="Thêm vào yêu thích"
                                            >
                                                <i
                                                    className="fi-br-heart"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                        <div className={styles.info}>
                                            <h3 className={styles.name}>
                                                {hotel.name}
                                            </h3>
                                            <p className={styles.price}>
                                                {hotel.price}
                                            </p>
                                            <div className={styles.details}>
                                                <span>
                                                    <i
                                                        className="fi-br-bed"
                                                        aria-hidden="true"
                                                    />
                                                    {hotel.bedroomCount}
                                                    <span
                                                        className={styles.label}
                                                    >
                                                        Phòng ngủ
                                                    </span>
                                                </span>
                                                <span>
                                                    <i
                                                        className="fi-br-home"
                                                        aria-hidden="true"
                                                    />
                                                    {hotel.area}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button
                        type="button"
                        className={styles.nextBtn}
                        onClick={nextSlide}
                        disabled={!canNext}
                        aria-label="Sau"
                    >
                        ❯
                    </button>
                </div>
            </div>
        </section>
    );
}
