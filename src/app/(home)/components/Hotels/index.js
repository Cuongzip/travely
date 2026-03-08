"use client";

import { useEffect, useState, useCallback, useLayoutEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "./Hotels.module.css";

const getPositionClass = (diff) => {
  if (diff === -2) return styles.smallLeft;
  if (diff === -1) return styles.normalLeft;
  if (diff === 0) return styles.big;
  if (diff === 1) return styles.normalRight;
  if (diff === 2) return styles.smallRight;
  return styles.far;
};

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const viewportRef = useRef(null);
  const [trackOffset, setTrackOffset] = useState(0);

  useEffect(() => {
    const fetchHotels = async () => {
      const res = await fetch("/api/hotels");
      const data = await res.json();
      const list = data.hotels || [];
      setHotels(list);
      // Nếu ít hơn 5 khách sạn, center = giữa danh sách
      if (list.length > 0 && list.length < 5) {
        setCurrentIndex(Math.min(2, Math.max(0, list.length - 1)));
      }
    };

    fetchHotels();
  }, []);

  useLayoutEffect(() => {
    const updateOffset = () => {
      if (!viewportRef.current || hotels.length === 0) return;
      const viewportWidth = viewportRef.current.offsetWidth;
      const computed = getComputedStyle(viewportRef.current);
      const cardWidth = parseFloat(computed.getPropertyValue("--card-width")) || 260;
      const cardGap = parseFloat(computed.getPropertyValue("--card-gap")) || 24;
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
        <h1 className={styles.title}>Khách Sạn Gần Bạn</h1>
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
              style={{ transform: `translate3d(${trackOffset}px, 0, 0)` }}
            >
              {hotels.map((hotel, index) => {
                const diff = index - currentIndex;
                const position = getPositionClass(diff);
                return (
                  <div key={hotel._id ?? index} className={`${styles.card} ${position}`}>
                    <div className={styles.imgWrapper}>
                      <img
                        src={`/images/hotels/hotel${index === 0 ? "" : index}.webp`}
                        alt={hotel.name}
                        className={styles.img}
                      />
                      <div className={styles.ratingBadge}>
                        <FontAwesomeIcon icon={faStar} />
                        {hotel.rate?.toFixed(2) ?? "—"}
                      </div>
                      <button type="button" className={styles.wishlistBtn}>
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    </div>
                    <div className={styles.info}>
                      <h3 className={styles.name}>{hotel.name}</h3>
                      <p className={styles.price}>{hotel.price}</p>
                      <div className={styles.details}>
                        <span>
                          <FontAwesomeIcon icon={faBed} />
                          {hotel.bedroomCount}
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faHouse} />
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